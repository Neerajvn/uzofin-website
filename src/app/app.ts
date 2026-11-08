import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Preloader } from './core/preloader';
import { SmoothScroll } from './core/smooth-scroll';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly smoothScroll = inject(SmoothScroll);
  private readonly preloader = inject(Preloader);

  constructor() {
    afterNextRender(() => {
      void this.reveal();
    });
  }

  // Hold the opening screen until the first view and hero art are ready.
  private async reveal(): Promise<void> {
    try {
      await this.dismissPreloader();
    } finally {
      this.preloader.hidden();
      this.smoothScroll.start();
    }
  }

  private async dismissPreloader(): Promise<void> {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
      this.preloader.hidden();
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    await this.whenPageReady();

    const remaining = (reduced ? 0 : 900) - (performance.now() - started);
    if (remaining > 0) {
      await new Promise((resolve) => window.setTimeout(resolve, remaining));
    }

    preloader.classList.add('is-done');
    preloader.setAttribute('aria-busy', 'false');
    this.preloader.hidden();

    await new Promise<void>((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) {
          return;
        }

        settled = true;
        preloader.remove();
        document.documentElement.classList.remove('is-loading');
        resolve();
      };

      if (reduced) {
        finish();
        return;
      }

      preloader.addEventListener('transitionend', (event) => {
        if (event.target === preloader && event.propertyName === 'opacity') {
          finish();
        }
      });
      window.setTimeout(finish, 900);
    });
  }

  // Fonts and the hero artwork, capped so a slow asset cannot hold the screen.
  private whenPageReady(): Promise<void> {
    const fonts =
      document.fonts?.ready.then(() => undefined).catch(() => undefined) ?? Promise.resolve();
    const images = ['/assets/main-block-bg-l.png', '/assets/main-block-bg-r.png'].map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = src;
        }),
    );
    const ready = Promise.all([fonts, ...images]).then(() => undefined);
    const cap = new Promise<void>((resolve) => window.setTimeout(resolve, 2800));
    return Promise.race([ready, cap]);
  }
}
