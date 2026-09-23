/* ════════════════════════════════════════════════════════════════════════
   LIVE ART RUNTIME — shared by every animated section illustration.
   Inlined into iframe srcdoc at build time by build_canvas.py (_inline_local_js),
   so a relative <script src> here is safe on the canvas as well as standalone.

   Two jobs:
     fitStage()  — scale the fixed design stage to whatever well it lands in
     Seq         — a restartable, pausable timeline for looping product demos
   ════════════════════════════════════════════════════════════════════════ */
(function (global) {
  // Default design stage. A component with a different aspect (the hero, say)
  // declares its own via data-w/data-h on .a-stage rather than forking the
  // runtime — the scale maths is identical, only the canonical size changes.
  var W = 700, H = 438;

  /* ── stage fit ──────────────────────────────────────────────────────── */
  function fitStage() {
    document.querySelectorAll('.a-field').forEach(function (field) {
      var stage = field.querySelector('.a-stage');
      if (!stage) return;
      var w = +stage.getAttribute('data-w') || W;
      var h = +stage.getAttribute('data-h') || H;
      var r = field.getBoundingClientRect();
      if (!r.width || !r.height) return;
      // CONTAIN, not cover. Cover crops the sides whenever the container's
      // aspect differs from the stage's — at a wide viewport it sliced the
      // timestamp column clean off. The tinted .a-field fills the container
      // regardless, so contain costs nothing and always shows the whole stage.
      /* `?zoom=` multiplies the contain scale. The stages carry internal
         margin around their content, so a modest zoom enlarges the panels
         without cutting them — the frame clips, so anything past the edge is
         that margin. Above ~1.35 the panels themselves start to crop. */
      var zoom = parseFloat((/[?&]zoom=([0-9.]+)/.exec(global.location.search) || [])[1]);
      if (!(zoom > 0)) zoom = 1;
      stage.style.setProperty('--s', Math.min(r.width / w, r.height / h) * zoom);
    });
  }

  /* ── timeline ───────────────────────────────────────────────────────────
     Seq([[ms, fn], …]) runs fn at each cumulative offset, then loops.
     - every timer is tracked so a restart can cancel cleanly (no ghost steps
       firing over the next cycle — the classic looping-demo bug)
     - pauses while the tab is hidden and when scrolled out of view, so a
       visitor always arrives at the start of the story rather than midway
     - honours prefers-reduced-motion: runs the timeline once to its final
       state and stops, which is also the correct static poster frame        */
  function Seq(steps, opts) {
    opts = opts || {};
    var timers = [], t = 0, running = false;
    /* `?speed=` scales every delay in the timeline. Embedded in a page the
       viewer is reading, the standalone pacing reads as hurried — the site
       passes a value above 1 to slow the story down without re-timing each
       component by hand. */
    var sm = parseFloat((/[?&]speed=([0-9.]+)/.exec(global.location.search) || [])[1]);
    if (!(sm > 0)) sm = 1;
    // `?end=1` jumps straight to the final frame. Two uses: it is the poster
    // state we ship for reduced motion, and it makes a looping component
    // verifiable with a plain screenshot instead of a GIF.
    var poster = /[?&]end=1/.test(global.location.search);
    var reduced = poster ||
      (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

    function clear() { timers.forEach(clearTimeout); timers = []; }

    function start() {
      if (running) return;
      running = true;
      clear();
      t = 0;
      if (opts.reset) opts.reset();
      if (reduced) { steps.forEach(function (s) { s[1](); }); running = false; return; }
      steps.forEach(function (s) {
        t += s[0] * sm;
        timers.push(setTimeout(s[1], t));
      });
      timers.push(setTimeout(function () { running = false; start(); }, t + (opts.hold || 1200) * sm));
    }

    function stop() { clear(); running = false; }

    return { start: start, stop: stop, restart: function () { stop(); start(); } };
  }

  /* ── typewriter ─────────────────────────────────────────────────────────
     Types `text` into `el` and resolves via cb. Speed is per-character with a
     small jitter — constant-rate typing reads as a progress bar, not a person. */
  function type(el, text, cb, speed) {
    speed = speed || 26;
    if (global.Live && global.Live.instant) { el.textContent = text; if (cb) cb(); return; }
    el.textContent = '';
    var i = 0;
    (function tick() {
      if (i > text.length) { if (cb) cb(); return; }
      el.textContent = text.slice(0, i++);
      setTimeout(tick, speed + Math.random() * speed * 0.6);
    })();
  }

  /* ── soon ───────────────────────────────────────────────────────────────
     setTimeout that collapses to an immediate call in poster/reduced-motion.
     Components use inner delays for the "…running → done" beat inside a single
     step; without this the static frame is stuck mid-beat (spinners still
     spinning, checkboxes still empty) even though the summary line says done. */
  function soon(fn, ms) {
    if (global.Live && global.Live.instant) { fn(); return 0; }
    return setTimeout(fn, ms);
  }

  /* ── count up ───────────────────────────────────────────────────────── */
  function countTo(el, to, ms, fmt) {
    var from = 0, t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / ms);
      var v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      el.textContent = fmt ? fmt(v) : v;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ── follow ─────────────────────────────────────────────────────────────
     Keep the newest item in view inside an .l-scroll viewport by translating
     the inner track. Called after an item is revealed; waits a frame so the
     item's own height transition has been laid out before measuring. */
  function follow(view) {
    var inner = view.querySelector('.l-scroll-inner');
    if (!inner) return;
    requestAnimationFrame(function () {
      var over = inner.scrollHeight - view.clientHeight;
      var y = Math.max(0, over);
      inner.style.transform = 'translateY(' + (-y) + 'px)';
      view.classList.toggle('is-scrolled', y > 2);
    });
  }

  /* ── autostart: only while visible ──────────────────────────────────── */
  function autoplay(seq) {
    var root = document.querySelector('.a-stage') || document.body;
    // Hysteresis matters: restart ONLY on a false→true edge. Firing restart()
    // on every observer callback truncated the loop mid-story, because a
    // viewport resize (or the component's own size animation) re-notifies while
    // the element is already visible — the collapse-to-notification beat was
    // being cut before it played.
    var inView = false;
    if (global.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !inView) { inView = true; seq.restart(); }
          else if (!e.isIntersecting && inView) { inView = false; seq.stop(); }
        });
      }, { threshold: 0.15 }).observe(root);
    } else { seq.start(); }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { seq.stop(); }
      else if (inView) { seq.restart(); }
    });
  }

  // In poster/reduced-motion, kill transitions too: otherwise the "final" frame
  // is caught mid-flight and a 100%-complete bar screenshots as empty.
  if (/[?&]end=1/.test(global.location.search)) {
    var s = document.createElement('style');
    s.textContent = '*,*::before,*::after{transition:none !important;animation:none !important}';
    document.head.appendChild(s);
  }

  fitStage();
  global.addEventListener('resize', fitStage);
  if (global.ResizeObserver) {
    document.querySelectorAll('.a-field').forEach(function (f) {
      new ResizeObserver(fitStage).observe(f);
    });
  }
  document.addEventListener('DOMContentLoaded', fitStage);

  // `instant` is true for the poster/reduced-motion frame. Components that
  // animate a value themselves (rAF climbs, typewriters) must check it and jump
  // to the end state rather than starting a motion nobody will see finish.
  var instant = /[?&]end=1/.test(global.location.search) ||
    (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  global.Live = { fit: fitStage, Seq: Seq, type: type, countTo: countTo, autoplay: autoplay, soon: soon, follow: follow, instant: instant };
})(window);

/* ════════════════════════════════════════════════════════════════════════
   THEME BRIDGE — added when these illustrations were embedded in the site.

   Each illustration is its own document inside an iframe, so it cannot inherit
   `data-theme` from the parent page. The parent passes the initial theme as
   `?theme=dark|light` and posts `{type:'eluu:theme'}` whenever the visitor
   flips the switch. Same-origin only.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  function apply(theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    document.documentElement.setAttribute('data-theme', theme);
  }

  var m = /[?&]theme=(dark|light)/.exec(window.location.search);
  apply(m ? m[1] : 'light');

  /* `?surface=` carries the CSS the embedding section wants behind the
     animation — always a token expression, never a literal colour, so it
     inverts with the theme like everything else. */
  var s = /[?&]surface=([^&]+)/.exec(window.location.search);
  if (s) {
    /* `+` is a space in form-encoding but decodeURIComponent leaves it alone,
       which would yield `linear-gradient(to+top,…)` — invalid CSS. */
    document.documentElement.style.setProperty(
      '--embed-surface', decodeURIComponent(s[1].replace(/\+/g, ' ')));
  }

  window.addEventListener('message', function (event) {
    if (event.origin !== window.location.origin) return;
    var data = event.data;
    if (data && data.type === 'eluu:theme') apply(data.theme);
  });
})();
