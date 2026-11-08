import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class Reveal {
  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      node.classList.add('reveal');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.classList.add('is-visible');
        return;
      }

      if (typeof IntersectionObserver === 'undefined') {
        node.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }
            node.classList.add('is-visible');
            observer.unobserve(node);
          }
        },
        { threshold: 0.16 },
      );

      observer.observe(node);
    });
  }
}
