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

  // Whether the mobile navigation is open.
  protected readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      let frame = 0;
      let observer: IntersectionObserver | undefined;

      const watch = () => {
        const section = document.querySelector('.logos');
        // The logos section may not be in the document on the first frame.
        if (!section || typeof IntersectionObserver === 'undefined') {
          if (!section) {
            frame = requestAnimationFrame(watch);
          }
          return;
        }

        observer = new IntersectionObserver(
          ([entry]) => {
            // Hide the header once the logos section reaches the top of the viewport.
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

  // Open or close the mobile menu.
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
