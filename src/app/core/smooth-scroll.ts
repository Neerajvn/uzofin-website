import { DestroyRef, Injectable, NgZone, inject } from '@angular/core';
import gsap from 'gsap';

@Injectable({ providedIn: 'root' })
export class SmoothScroll {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  start(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      let current = window.scrollY;
      let target = window.scrollY;
      let driving = false;
      const root = document.documentElement;
      const previousOverscroll = root.style.overscrollBehavior;

      const limit = () =>
        Math.max(0, root.scrollHeight - window.innerHeight);

      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey || !event.cancelable) {
          return;
        }

        event.preventDefault();
        driving = true;
        const unit =
          event.deltaMode === WheelEvent.DOM_DELTA_LINE
            ? 32
            : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
              ? window.innerHeight
              : 1;
        target = gsap.utils.clamp(0, limit(), target + event.deltaY * unit);
      };

      const onScroll = () => {
        if (driving) {
          return;
        }

        current = target = window.scrollY;
      };

      const tick = () => {
        const delta = target - current;
        current = Math.abs(delta) < 0.5 ? target : current + delta * 0.14;

        if (Math.abs(current - window.scrollY) >= 1) {
          window.scrollTo({ top: current, left: 0, behavior: 'instant' });
        }

        if (Math.abs(target - current) < 0.5 && Math.abs(target - window.scrollY) < 1) {
          driving = false;
        }
      };

      root.style.overscrollBehavior = 'none';
      window.addEventListener('wheel', onWheel, { passive: false, capture: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      gsap.ticker.add(tick);

      this.destroyRef.onDestroy(() => {
        root.style.overscrollBehavior = previousOverscroll;
        window.removeEventListener('wheel', onWheel, { capture: true });
        window.removeEventListener('scroll', onScroll);
        gsap.ticker.remove(tick);
      });
    });
  }
}
