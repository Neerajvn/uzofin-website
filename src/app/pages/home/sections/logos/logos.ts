import { Component } from '@angular/core';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.html',
  styleUrl: './logos.scss',
})
export class Logos {
  // Partner logos shown under the hero.
  protected readonly logos = [
    { src: '/assets/companies-logo/company-1.svg', alt: 'Brave' },
    { src: '/assets/companies-logo/company-2.svg', alt: 'Circle' },
    { src: '/assets/companies-logo/company-3.svg', alt: 'Discord' },
    { src: '/assets/companies-logo/company-4.svg', alt: 'Google' },
    { src: '/assets/companies-logo/company-5.svg', alt: 'Jump_' },
    { src: '/assets/companies-logo/company-6.svg', alt: 'Lollapalooza' },
    { src: '/assets/companies-logo/company-7.svg', alt: 'Magic Eden' },
  ];
}
