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
 * The block is driven by `transform` and `height`, both measured from the live
 * DOM, so a list whose rows differ in height (a row with body copy under its
 * title) is handled without any per-row configuration.
 *
 * Contract for the caller:
 *   - the container must be `relative`, so it is the block's `offsetParent`;
 *   - the block must be `absolute` and carry `data-slide-indicator`;
 *   - the rows must sit above it (`relative z-10`), because a positioned
 *     element paints over the background AND the text of static siblings.
 */

export interface SlideIndicator {
  /** Move the block onto row `index`. Pass -1 to hide it. */
  moveTo(index: number): void;
  /** Re-measure without animating. Call after a reflow. */
  refresh(): void;
}

const NOOP: SlideIndicator = { moveTo() {}, refresh() {} };

/**
 * Fast out, long settle. A linear or symmetric ease reads as mechanical at this
 * distance; the selection should leave immediately and arrive gently.
 */
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DURATION = 340;

export function mountSlideIndicator(container: HTMLElement, rows: HTMLElement[]): SlideIndicator {
  const block = container.querySelector<HTMLElement>('[data-slide-indicator]');
  if (!block || !rows.length) return NOOP;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = -1;

  const place = () => {
    const row = rows[index];
    if (!row) {
      block.style.opacity = '0';
      return;
    }
    block.style.opacity = '1';
    block.style.height = `${row.offsetHeight}px`;
    block.style.transform = `translateY(${row.offsetTop}px)`;
  };

  /** Measure and paint with no transition, so nothing animates from nowhere. */
  const settle = () => {
    const previous = block.style.transition;
    block.style.transition = 'none';
    place();
    // Read forces the style flush, so the restored transition cannot pick this
    // frame's change up and animate it anyway.
    void block.offsetHeight;
    block.style.transition = previous;
  };

  const api: SlideIndicator = {
    moveTo(next) {
      if (next === index) return;
      index = next;
      place();
    },
    refresh: settle,
  };

  /**
   * The first placement must not animate — the block would otherwise slide down
   * from row 0 on every page load. The transition is therefore attached one
   * frame AFTER the initial position is set.
   */
  requestAnimationFrame(() => {
    if (reduced) return;
    block.style.transition = `transform ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}`;
  });

  /**
   * Rows are measured in pixels, so anything that reflows them invalidates the
   * block: a resize, and the web font swap, which changes line count and so row
   * height after first paint.
   */
  if ('ResizeObserver' in window) {
    new ResizeObserver(settle).observe(container);
  } else {
    window.addEventListener('resize', settle, { passive: true });
  }
  document.fonts?.ready.then(settle);

  return api;
}
