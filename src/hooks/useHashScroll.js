import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useHashScroll() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    let cancelled = false;

    const positionTarget = () => {
      if (cancelled) return null;
      const target = document.getElementById(id);
      if (!target) return null;
      const header = document.querySelector('[data-site-header]');
      const offset = (header?.getBoundingClientRect().height || 0) + 24;
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset, behavior: 'instant' });
      return target;
    };

    const frame = requestAnimationFrame(async () => {
      const target = positionTarget();
      if (!target) return;
      // Scrolling reveals fade-in sections. Reposition after their transforms settle.
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (cancelled) return;
      const animations = [];
      for (let node = target; node; node = node.parentElement) {
        animations.push(...(node.getAnimations?.() || []).filter(animation =>
          animation.effect?.getComputedTiming().iterations !== Infinity
        ));
      }
      await Promise.allSettled(animations.map(animation => animation.finished));
      positionTarget();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [hash, key]);
}
