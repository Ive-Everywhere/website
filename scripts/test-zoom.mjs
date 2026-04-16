import { chromium } from "playwright";

const URL = "http://localhost:4322/";
const SCREENSHOT_DIR = "/tmp";
const VIEWPORTS = [
  { width: 1440, label: "100% zoom" },
  { width: 960, label: "150% zoom" },
  { width: 720, label: "200% zoom" },
  { width: 480, label: "300% zoom" },
  { width: 360, label: "400% zoom" },
  { width: 288, label: "500% zoom" },
];
const HEIGHT = 900;

async function checkViewport(browser, { width, label }) {
  const context = await browser.newContext({
    viewport: { width, height: HEIGHT },
  });
  const page = await context.newPage();

  console.log(`\n${"=".repeat(60)}`);
  console.log(`VIEWPORT: ${width}px (${label})`);
  console.log("=".repeat(60));

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  // Allow animations/lazy content to settle
  await page.waitForTimeout(2000);

  // Take full-page screenshot
  const screenshotPath = `${SCREENSHOT_DIR}/zoom-${width}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot saved: ${screenshotPath}`);

  // --- Check 1: Horizontal overflow on document ---
  const docOverflow = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const cw = document.documentElement.clientWidth;
    return { scrollWidth: sw, clientWidth: cw, overflows: sw > cw };
  });
  if (docOverflow.overflows) {
    console.log(
      `[ISSUE] HORIZONTAL OVERFLOW: scrollWidth=${docOverflow.scrollWidth} > clientWidth=${docOverflow.clientWidth} (${docOverflow.scrollWidth - docOverflow.clientWidth}px excess)`
    );
  } else {
    console.log(`[OK] No horizontal document overflow`);
  }

  // --- Check 2: Elements that overflow their container ---
  const overflowingElements = await page.evaluate(() => {
    const results = [];
    const allEls = document.querySelectorAll("*");
    for (const el of allEls) {
      if (el.scrollWidth > el.clientWidth + 2) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : "";
        const cls = el.className && typeof el.className === "string"
          ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}`
          : "";
        const rect = el.getBoundingClientRect();
        results.push({
          selector: `${tag}${id}${cls}`,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          excess: el.scrollWidth - el.clientWidth,
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          text: el.textContent?.substring(0, 60)?.trim() || "",
        });
      }
    }
    return results;
  });
  if (overflowingElements.length > 0) {
    console.log(
      `[ISSUE] ${overflowingElements.length} element(s) with horizontal overflow:`
    );
    for (const el of overflowingElements.slice(0, 15)) {
      console.log(
        `  - <${el.selector}> excess=${el.excess}px at (top:${el.top}, left:${el.left}) "${el.text.substring(0, 50)}"`
      );
    }
    if (overflowingElements.length > 15) {
      console.log(`  ... and ${overflowingElements.length - 15} more`);
    }
  } else {
    console.log(`[OK] No elements with horizontal overflow`);
  }

  // --- Check 3: Clipped text ---
  const clippedText = await page.evaluate(() => {
    const results = [];
    const allEls = document.querySelectorAll("*");
    for (const el of allEls) {
      const style = window.getComputedStyle(el);
      if (
        (style.overflow === "hidden" || style.overflowY === "hidden") &&
        el.scrollHeight > el.clientHeight + 50
      ) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : "";
        const cls = el.className && typeof el.className === "string"
          ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}`
          : "";
        const rect = el.getBoundingClientRect();
        results.push({
          selector: `${tag}${id}${cls}`,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          clipped: el.scrollHeight - el.clientHeight,
          top: Math.round(rect.top),
          text: el.textContent?.substring(0, 80)?.trim() || "",
        });
      }
    }
    return results;
  });
  if (clippedText.length > 0) {
    console.log(`[ISSUE] ${clippedText.length} element(s) with clipped text:`);
    for (const el of clippedText.slice(0, 10)) {
      console.log(
        `  - <${el.selector}> clipped=${el.clipped}px (scrollH=${el.scrollHeight}, clientH=${el.clientHeight}) at top:${el.top} "${el.text.substring(0, 50)}"`
      );
    }
    if (clippedText.length > 10) {
      console.log(`  ... and ${clippedText.length - 10} more`);
    }
  } else {
    console.log(`[OK] No clipped text detected`);
  }

  // --- Check 4: Navbar visibility ---
  const navbarCheck = await page.evaluate(() => {
    const nav =
      document.querySelector("nav") ||
      document.querySelector("header") ||
      document.querySelector('[role="navigation"]');
    if (!nav) return { found: false };
    const rect = nav.getBoundingClientRect();
    const style = window.getComputedStyle(nav);
    return {
      found: true,
      tag: nav.tagName.toLowerCase(),
      visible: style.display !== "none" && style.visibility !== "hidden",
      top: Math.round(rect.top),
      height: Math.round(rect.height),
      width: Math.round(rect.width),
      overflowsRight: rect.right > window.innerWidth,
    };
  });
  if (!navbarCheck.found) {
    console.log(`[WARN] No nav/header element found`);
  } else if (!navbarCheck.visible) {
    console.log(`[ISSUE] Navbar is hidden (display:none or visibility:hidden)`);
  } else if (navbarCheck.overflowsRight) {
    console.log(
      `[ISSUE] Navbar overflows right edge (width=${navbarCheck.width}px)`
    );
  } else {
    console.log(
      `[OK] Navbar visible at top:${navbarCheck.top}, height:${navbarCheck.height}px, width:${navbarCheck.width}px`
    );
  }

  // --- Check 5: Iframe container check ---
  const iframeCheck = await page.evaluate(() => {
    const iframes = document.querySelectorAll("iframe");
    if (iframes.length === 0) return { found: false };
    const results = [];
    for (const iframe of iframes) {
      const rect = iframe.getBoundingClientRect();
      const parent = iframe.parentElement;
      const parentRect = parent ? parent.getBoundingClientRect() : null;
      results.push({
        src: iframe.src?.substring(0, 80) || "(no src)",
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        overflowsRight: rect.right > window.innerWidth,
        overflowsLeft: rect.left < 0,
        parentWidth: parentRect ? Math.round(parentRect.width) : null,
        exceedsParent: parentRect ? rect.width > parentRect.width + 2 : null,
      });
    }
    return { found: true, iframes: results };
  });
  if (!iframeCheck.found) {
    console.log(`[INFO] No iframes found on page`);
  } else {
    for (const iframe of iframeCheck.iframes) {
      const issues = [];
      if (iframe.overflowsRight) issues.push("overflows right edge");
      if (iframe.overflowsLeft) issues.push("overflows left edge");
      if (iframe.exceedsParent)
        issues.push(`exceeds parent width (${iframe.parentWidth}px)`);
      if (issues.length > 0) {
        console.log(
          `[ISSUE] Iframe (${iframe.src}): ${issues.join(", ")} | iframe width=${iframe.width}px`
        );
      } else {
        console.log(
          `[OK] Iframe within bounds: width=${iframe.width}px, left=${iframe.left}, right=${iframe.right}`
        );
      }
    }
  }

  // --- Check 6: Elements extending beyond viewport ---
  const outOfBounds = await page.evaluate(() => {
    const results = [];
    const viewportWidth = window.innerWidth;
    // Check significant elements (not tiny inline elements)
    const importantTags = "div, section, article, main, aside, footer, header, form, table, ul, ol, img, video, iframe, button, a, h1, h2, h3, h4, h5, h6, p, span, nav";
    const els = document.querySelectorAll(importantTags);
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > viewportWidth + 5) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : "";
        const cls = el.className && typeof el.className === "string"
          ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}`
          : "";
        results.push({
          selector: `${tag}${id}${cls}`,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          excess: Math.round(rect.right - viewportWidth),
          top: Math.round(rect.top),
          text: el.textContent?.substring(0, 40)?.trim() || "",
        });
      }
    }
    return { viewportWidth, elements: results };
  });
  if (outOfBounds.elements.length > 0) {
    console.log(
      `[ISSUE] ${outOfBounds.elements.length} element(s) extend beyond viewport right edge (${outOfBounds.viewportWidth}px):`
    );
    for (const el of outOfBounds.elements.slice(0, 15)) {
      console.log(
        `  - <${el.selector}> width=${el.width}px, right=${el.right}px (+${el.excess}px) at top:${el.top} "${el.text.substring(0, 40)}"`
      );
    }
    if (outOfBounds.elements.length > 15) {
      console.log(`  ... and ${outOfBounds.elements.length - 15} more`);
    }
  } else {
    console.log(`[OK] All elements within viewport bounds`);
  }

  // --- Check 7: Very small / invisible text ---
  const tinyText = await page.evaluate(() => {
    const results = [];
    const textEls = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, a, li, label, button, td, th");
    for (const el of textEls) {
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      const rect = el.getBoundingClientRect();
      if (fontSize < 8 && rect.width > 0 && rect.height > 0 && el.textContent?.trim()) {
        results.push({
          tag: el.tagName.toLowerCase(),
          fontSize: Math.round(fontSize * 10) / 10,
          text: el.textContent.substring(0, 40).trim(),
          top: Math.round(rect.top),
        });
      }
    }
    return results;
  });
  if (tinyText.length > 0) {
    console.log(`[ISSUE] ${tinyText.length} element(s) with very small text (<8px):`);
    for (const el of tinyText.slice(0, 10)) {
      console.log(
        `  - <${el.tag}> fontSize=${el.fontSize}px at top:${el.top} "${el.text}"`
      );
    }
  } else {
    console.log(`[OK] No excessively small text found`);
  }

  // --- Check 8: Overlapping important elements ---
  const overlaps = await page.evaluate(() => {
    const results = [];
    const importantEls = document.querySelectorAll("h1, h2, h3, button, a, img, nav, iframe");
    const rects = [];
    for (const el of importantEls) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const tag = el.tagName.toLowerCase();
      const text = el.textContent?.substring(0, 30)?.trim() || "";
      rects.push({ el, tag, text, rect });
    }
    // Check pairwise for significant overlaps among buttons and headings
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i].rect;
        const b = rects[j].rect;
        // Check overlap
        const overlapX = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
        const overlapY = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        const overlapArea = overlapX * overlapY;
        const areaA = a.width * a.height;
        const areaB = b.width * b.height;
        const smallerArea = Math.min(areaA, areaB);
        // If overlap is more than 30% of the smaller element, flag it
        if (smallerArea > 0 && overlapArea / smallerArea > 0.3) {
          // Skip if one is a child of the other
          if (rects[i].el.contains(rects[j].el) || rects[j].el.contains(rects[i].el)) continue;
          results.push({
            elA: `${rects[i].tag} "${rects[i].text}"`,
            elB: `${rects[j].tag} "${rects[j].text}"`,
            overlapPct: Math.round((overlapArea / smallerArea) * 100),
          });
        }
      }
    }
    return results.slice(0, 10);
  });
  if (overlaps.length > 0) {
    console.log(`[ISSUE] Overlapping elements detected:`);
    for (const o of overlaps) {
      console.log(
        `  - <${o.elA}> overlaps <${o.elB}> by ${o.overlapPct}%`
      );
    }
  } else {
    console.log(`[OK] No significant element overlaps detected`);
  }

  await context.close();
}

async function main() {
  console.log("Launching browser for zoom-level visual testing...");
  console.log(`Target: ${URL}`);
  console.log(`Viewports: ${VIEWPORTS.map((v) => v.width + "px").join(", ")}`);

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    try {
      await checkViewport(browser, vp);
    } catch (err) {
      console.error(`\n[ERROR] Failed at ${vp.width}px: ${err.message}`);
    }
  }

  await browser.close();

  console.log(`\n${"=".repeat(60)}`);
  console.log("TESTING COMPLETE");
  console.log("=".repeat(60));
  console.log("Screenshots saved to /tmp/zoom-*.png");
}

main().catch(console.error);
