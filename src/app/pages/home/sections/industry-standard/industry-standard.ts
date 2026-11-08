import { Component } from '@angular/core';

export type IndustryCard = {
  title: string;
};

const CARD_BODY =
  'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. Its purpose is to permit a page layout to be designed.';

const CARDS: IndustryCard[] = [
  { title: 'Scalability & Integration' },
  { title: 'Step-by-step guide' },
  { title: 'SaaS based solution' },
  { title: 'Modern & clean design' },
  { title: 'Easy to customize' },
];

@Component({
  selector: 'app-industry-standard',
  templateUrl: './industry-standard.html',
  styleUrl: './industry-standard.scss',
})
export class IndustryStandard {
  protected readonly body = CARD_BODY;
  protected readonly marqueeCards: IndustryCard[] = [...CARDS, ...CARDS];

  // Replay the border reflection from the top-left on every hover.
  protected restartBorderSheen(event: Event): void {
    const sheen = (event.currentTarget as HTMLElement | null)?.querySelector(
      '.industry__sheen',
    );

    if (!(sheen instanceof HTMLElement)) {
      return;
    }

    sheen.style.animation = 'none';
    void sheen.offsetWidth;
    sheen.style.animation = '';
  }
}
