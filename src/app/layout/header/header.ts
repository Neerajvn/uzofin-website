import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-header',
  imports: [NgTemplateOutlet, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      let frame = 0;
      let observer: IntersectionObserver | undefined;

      const watch = () => {
        const section = document.querySelector('.logos');
        if (!section || typeof IntersectionObserver === 'undefined') {
          if (!section) {
            frame = requestAnimationFrame(watch);
          }
          return;
        }

        observer = new IntersectionObserver(
          ([entry]) => {
            const reached = entry.boundingClientRect.top <= 1;
            this.host.nativeElement.classList.toggle('is-hidden', reached);
            this.host.nativeElement.toggleAttribute('inert', reached);
            if (reached) {
              this.menuOpen.set(false);
            }
          },
          { rootMargin: '0px 0px -99.9% 0px', threshold: 0 },
        );
        observer.observe(section);
      };

      watch();
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        observer?.disconnect();
      });
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
