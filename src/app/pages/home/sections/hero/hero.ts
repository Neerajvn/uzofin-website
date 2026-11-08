import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import gsap from 'gsap';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Show the finished layout when motion is reduced.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.hero__bg', { x: 0, y: 0, scale: 1 });
        gsap.set(['h1', 'p', '.hero__actions'], { opacity: 1, y: 0 });
        return;
      }

      const context = gsap.context(() => {
        const timeline = gsap.timeline();
        const splitBg = window.matchMedia('(min-width: 769px)').matches;

        // Desktop: slide both background images in from the sides.
        if (splitBg) {
          timeline.fromTo(
            '.hero__bg--l',
            { xPercent: -12, yPercent: 0, scale: 0.94 },
            { xPercent: 0, yPercent: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
            0,
          );
          timeline.fromTo(
            '.hero__bg--r',
            { xPercent: 12, yPercent: 0, scale: 0.94 },
            { xPercent: 0, yPercent: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
            0,
          );
        } else {
          // Phone: fade and scale the single background.
          timeline.fromTo(
            '.hero__bg--l',
            { scale: 0.96, opacity: 0.35 },
            { scale: 1, opacity: 0.55, duration: 0.85, ease: 'power3.out' },
            0,
          );
        }
        // Headline and intro rise in.
        timeline.fromTo(
          ['h1', 'p'],
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.12 },
          1.15,
        );
        // Action buttons follow the copy.
        timeline.fromTo(
          '.hero__actions',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          '>',
        );
      }, this.host.nativeElement);

      this.destroyRef.onDestroy(() => context.revert());
    });
  }
}
