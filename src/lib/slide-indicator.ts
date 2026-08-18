/**
 * A single filled block that SLIDES between the rows of a vertical list,
 * instead of one fill switching off and another switching on.
 *
 * WHY A SEPARATE ELEMENT.
 * Per-row `background-color` cannot travel. Even with a transition, the old row
 * fades out where it is and the new row fades in where it is, so the eye sees
 * two events in two places and reads the control as two lit lamps rather than
 * one moving selection. Moving ONE element gives the eye a single object to
 * follow, which is what makes the change read as a shift rather than a jump.
 *
 * WHY THIS ANIMATES IN JS RATHER THAN WITH A CSS TRANSITION.
 * A CSS transition needs its destination up front. That is fine only when the
 * list is rigid. It is wrong the moment the selected row CHANGES SIZE, the
 * private-cloud band reveals a body paragraph on the selected row, so the row
 * grows and every row under it moves WHILE the block is travelling. A CSS
 * transition aimed at the size measured on click would then arrive at a stale
 * position and correct itself with a visible snap.
 *
 * So each frame re-reads the live target and interpolates towards it. The
 * target may move for the whole flight; at progress 1 the block is exactly on
 * it either way. This also means a caller never has to tell this module that
 * its rows resize.
 *
 * Contract for the caller:
 *   - the container must be the block's `offsetParent`, i.e. positioned. Use
 *     `relative`, or nothing at all when it is already `sticky`/`absolute`,  *     adding `relative` next to `sticky` sets the same property twice and the
 *     two fight;
 *   - the block must be `absolute` and carry `data-slide-indicator`;
 *   - the rows must sit above it (`relative z-10`), because a positioned
 *     element paints over the background AND the text of static siblings.
 */

export interface SlideIndicator {
  /** Move the block onto row `index`. Pass -1 to hide it. */
  moveTo(index: number): void;
  /** Re-measure immediately, without animating. Call after a reflow. */
  refresh(): void;
}

const NOOP: SlideIndicator = { moveTo() {}, refresh() {} };

/**
 * Fast out, long settle, the selection should leave at once and arrive gently.
 * A symmetric ease reads mechanical over this distance.
 *
 * Keep `DURATION` equal to any content transition on the rows themselves (the
 * band's body reveal), so the block and the layout come to rest together.
 */
const DURATION = 340;
const ease = (t: number) => 1 - Math.pow(1 - t, 5);

interface Box {
  y: number;
  h: number;
}

export function mountSlideIndicator(container: HTMLElement, rows: HTMLElement[]): SlideIndicator {
  const block = container.querySelector<HTMLElement>('[data-slide-indicator]');
  if (!block || !rows.length) return NOOP;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = -1;
  let frame = 0;
  /** What is on screen right now, so a re-target mid-flight starts from it. */
  let painted: Box = { y: 0, h: 0 };

  const target = (): Box | null => {
    const row = rows[index];
    return row ? { y: row.offsetTop, h: row.offsetHeight } : null;
  };

  const paint = (box: Box) => {
    painted = box;
    block.style.transform = `translateY(${box.y}px)`;
    block.style.height = `${box.h}px`;
  };

  const snap = () => {
    const to = target();
    if (!to) {
      block.style.opacity = '0';
      return;
    }
    block.style.opacity = '1';
    paint(to);
  };

  const run = (from: Box) => {
    cancelAnimationFrame(frame);
    const start = performance.now();
    const step = (now: number) => {
      const to = target();
      if (!to) return;
      const progress = Math.min(1, (now - start) / DURATION);
      const e = ease(progress);
      paint({ y: from.y + (to.y - from.y) * e, h: from.h + (to.h - from.h) * e });
      if (progress < 1) frame = requestAnimationFrame(step);
      else frame = 0;
    };
    frame = requestAnimationFrame(step);
  };

  return {
    moveTo(next) {
      if (next === index) return;
      const first = index < 0;
      index = next;
      // The first placement must not animate, or the block slides down from
      // row 0 on every page load.
      if (first || reduced) {
        snap();
        return;
      }
      run(painted);
    },
    refresh() {
      // A reflow during a flight is expected, the rows are resizing under it,
      // and the loop already re-reads them. Snapping here would cancel that.
      if (frame) return;
      snap();
    },
  };
}

/**
 * Rows are measured in pixels, so anything that reflows them invalidates the
 * block: a resize, and the web-font swap, which changes line count and so row
 * height after first paint.
 */
export function watchLayout(container: HTMLElement, indicator: SlideIndicator): void {
  if ('ResizeObserver' in window) new ResizeObserver(() => indicator.refresh()).observe(container);
  else window.addEventListener('resize', () => indicator.refresh(), { passive: true });
  document.fonts?.ready.then(() => indicator.refresh());
}
