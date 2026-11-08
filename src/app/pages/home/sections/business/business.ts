import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-business',
  templateUrl: './business.html',
  styleUrl: './business.scss',
})
export class Business {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  // Headline figures: volume, uptime, and onboarding speed.
  protected readonly stats: {
    value: string;
    note?: string;
    label: string;
    tone: string;
  }[] = [
    {
      value: '11.5M+',
      label: 'Transactions processed monthly',
      tone: 'mix',
    },
    {
      value: '99.9%',
      label: 'Platform uptime and reliability',
      tone: 'blue',
    },
    {
      value: '70%',
      note: 'Faster',
      label: 'Merchant onboarding with AI automation',
      tone: 'teal',
    },
  ];

  constructor() {
    afterNextRender(() => {
      const section = this.host.nativeElement.querySelector('.business');
      const spiral = section?.querySelector('.business__spiral');

      // Leave the spiral still when motion is reduced or it is missing.
      if (!spiral || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      const context = gsap.context(() => {}, section);

      // Start the spin once the section is in view.
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }

          observer.disconnect();
          context.add(() => {
            // A short turn, then a continuous spin.
            gsap
              .timeline()
              .to(spiral, { rotation: 180, duration: 1.5, ease: 'power2.out' })
              .to(spiral, {
                rotation: '-=360',
                duration: 18,
                ease: 'none',
                repeat: -1,
              });
          });
        },
        { threshold: 0.4 },
      );

      observer.observe(section);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        context.revert();
      });
    });
  }
}
