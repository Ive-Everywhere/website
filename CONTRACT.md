# Build contract — read before writing any component

This site is a transcription of Figma. Accuracy beats cleverness.

## Source of truth

Figma only. Never copy values from the old site repo or from `design-system/eluu.css`.
Specs live at `../specs/` and `../../website-v2/figma-1.1/`.

## Hard rules

1. **No raw colour values.** No hex, no `rgb()`, no `rgba()` in any `.astro` file.
   Use the Tailwind token classes generated in `src/styles/global.css`:
   `bg-bg-white-0` `bg-bg-weak-50` `bg-bg-soft-200` `bg-bg-sub-300` `bg-bg-surface-800`
   `bg-bg-strong-950` · `text-text-strong-950` `text-text-sub-600` `text-text-soft-400`
   `text-text-disabled-300` · `border-stroke-soft-200` `border-stroke-sub-300`
   · `text-icon-sub-600` `text-icon-soft-400` · `bg-maroon-*` `text-primary-*`
   · `bg-faded-light` `bg-faded-lighter`
   · provisional, only where Figma uses them: `bg-accent-peach-100/200`,
   `text-accent-peach-800`, `bg-success-light`.
   A raw hex is a review failure. If a colour has no token, stop and report it.

2. **Type comes from the `.t-*` classes**, never ad-hoc `text-[32px]`:
   `.t-landing-h1` (56/64) · `.t-landing-h3` (40/48) · `.t-h4` (32/40) · `.t-h6` (20/28)
   `.t-paragraph-lg` `.t-paragraph-md` `.t-paragraph-sm`
   `.t-label-md` `.t-label-sm` · `.t-subheading-md` `.t-subheading-sm` · `.t-mono-sm`
   Landing titles are Inter Variable 550 with ss11 OFF. Titles are Inter Display 500.
   Both are already handled by the classes — do not restate them.

3. **Icons are Remix Icon.** Figma names every icon after its Remix glyph, so
   `lock-2-line` becomes `<i class="ri-lock-2-line" aria-hidden="true"></i>`.
   Size with `text-[20px]` / `text-[24px]` / `text-[28px]` to match the Figma box.

4. **Reuse, do not re-implement.** `src/layouts/Base.astro` (nav + CTA + footer),
   `src/components/ui/Button.astro`, `src/components/site/*`.

5. **Placeholder copy must stay visible.** Where Figma holds lorem, duplicated or
   competitor-named text, render the real string wrapped in
   `<span class="copy-needed">…</span>` and add an HTML comment naming the Figma
   node. Never silently invent replacement copy. Never delete a placeholder section.

6. **Missing images.** Illustrations are being produced separately. Use a
   placeholder block with the correct aspect ratio and a `copy-needed`-style
   label naming the Figma node and intended dimensions. Do not use stock art.

7. **Responsive is ours to design.** Figma is desktop-1600 only. Build mobile
   first, then the 1600px composition at `lg:`. Fixed Figma widths (742, 840,
   1224, 706, 502, 272) become `max-w-[…]` with a fluid fallback, never fixed
   widths at small sizes.

8. **Accessibility.** Real heading levels (Figma's H1/H3 are style names, not
   tags), `alt` on meaningful images, `aria-hidden` on decorative icons, and a
   text equivalent wherever meaning is carried only by an icon or colour — the
   compare table's tick/cross especially.

## Verify before reporting

Run `NODE_ENV=production npm run build` and confirm it passes. Then run
`grep -rnE '#[0-9a-fA-F]{3,8}\b|rgba?\(' src --include=*.astro` and confirm the
only hits are inside comments. Report both results.
