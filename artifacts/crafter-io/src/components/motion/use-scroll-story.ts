

import { useEffect, useRef, useState, type RefObject } from "react";

const clamp = (n: number, min = 0, max = 1) => Math.min(Math.max(n, min), max);

type ScrollStoryOptions = {
  /** The tall element whose scroll travel drives the story. */
  trackRef: RefObject<HTMLElement | null>;
  /** Copy blocks, one per product. */
  stageRefs: RefObject<(HTMLElement | null)[]>;
  /** Screens stacked inside the pinned device, in the same order. */
  screenRefs: RefObject<(HTMLElement | null)[]>;
  count: number;
  enabled: boolean;
};

/**
 * Drives the featured-products story from scroll position.
 *
 * Continuous rather than stepped: every frame each stage gets a fractional
 * opacity from its distance to the scroll head, so two neighbours cross-fade
 * through each other instead of one switching off and the next switching on.
 * Adjacent opacities sum to 1, which keeps the composition evenly weighted
 * mid-transition.
 *
 * Two rules make this cheap and safe:
 *
 * - **Scroll is read, never written.** No preventDefault, no scrollTo, no
 *   wheel handling. Native scrolling — wheel, trackpad, touch, keyboard,
 *   screen reader — is untouched. The story reports where you already are.
 * - **Per-frame work never touches React.** Opacities and transforms are
 *   written straight to the DOM inside one rAF. The only state is the nearest
 *   stage index, used for the device's status-bar tone and `aria-hidden`, so
 *   a full pass through the section costs `count - 1` renders.
 */
export function useScrollStory({
  trackRef,
  stageRefs,
  screenRefs,
  count,
  enabled,
}: ScrollStoryOptions): number {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    // Hands the elements back to CSS so the class-based fallback resumes.
    // Defined in the effect rather than memoised outside it: it only ever
    // runs from here, and reading refs during render is not allowed.
    const clearInlineState = () => {
      for (const list of [stageRefs.current, screenRefs.current]) {
        for (const el of list ?? []) {
          if (!el) continue;
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
        }
      }
      trackRef.current?.style.removeProperty("--story-p");
    };

    if (!enabled) {
      clearInlineState();
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      frame.current = null;

      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const progress = clamp(-rect.top / travel);
      // Published for the CSS-side depth layers in the pinned device.
      track.style.setProperty("--story-p", progress.toFixed(4));

      // Position of the scroll head in stage units: stage `i` is centred at
      // exactly `i`, so the first and last stages get full screen time.
      const head = progress * (count - 1);
      let nearest = 0;
      let nearestDistance = Infinity;

      for (let i = 0; i < count; i++) {
        const delta = head - i;
        const distance = Math.abs(delta);
        const opacity = clamp(1 - distance);

        const stage = stageRefs.current?.[i];
        if (stage) {
          stage.style.opacity = opacity.toFixed(3);
          // Drifts against the scroll direction: outgoing copy rises away,
          // incoming copy settles up into place.
          stage.style.transform = `translate3d(0, ${(delta * -28).toFixed(1)}px, 0)`;
        }

        const screen = screenRefs.current?.[i];
        if (screen) {
          screen.style.opacity = opacity.toFixed(3);
          screen.style.transform = `scale(${(1 + distance * 0.03).toFixed(4)})`;
        }

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      }

      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
      }
    };

    const schedule = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      clearInlineState();
    };
  }, [trackRef, stageRefs, screenRefs, count, enabled]);

  return enabled ? active : 0;
}
