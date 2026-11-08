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
      let fromUs = false;

      const limit = () =>
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey) {
          return;
        }

        event.preventDefault();
        const unit =
          event.deltaMode === WheelEvent.DOM_DELTA_LINE
            ? 32
            : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
              ? window.innerHeight
              : 1;
        target = gsap.utils.clamp(0, limit(), target + event.deltaY * unit);
      };

      const onScroll = () => {
        if (fromUs) {
          fromUs = false;
          return;
        }

        current = target = window.scrollY;
      };

      const tick = () => {
        const next = current + (target - current) * 0.14;
        current = Math.abs(target - next) < 0.5 ? target : next;

        if (Math.abs(current - window.scrollY) < 0.5) {
          return;
        }

        fromUs = true;
        window.scrollTo(0, current);
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('scroll', onScroll, { passive: true });
      gsap.ticker.add(tick);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('scroll', onScroll);
        gsap.ticker.remove(tick);
      });
    });
  }
}
