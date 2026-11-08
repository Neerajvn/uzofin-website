import { Injectable } from '@angular/core';

// Lets the hero entrance wait until the opening screen starts to leave.
@Injectable({ providedIn: 'root' })
export class Preloader {
  private done = false;
  private resolveReady: () => void = () => undefined;
  private readonly ready = new Promise<void>((resolve) => {
    this.resolveReady = resolve;
  });

  // Resolves immediately when this page has no preloader.
  whenHidden(): Promise<void> {
    if (this.done || typeof document === 'undefined' || !document.getElementById('preloader')) {
      return Promise.resolve();
    }

    return this.ready;
  }

  hidden(): void {
    if (this.done) {
      return;
    }

    this.done = true;
    this.resolveReady();
  }
}
