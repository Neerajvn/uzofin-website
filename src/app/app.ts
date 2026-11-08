import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() {
    afterNextRender(() => this.smoothScroll.start());
  }
}
