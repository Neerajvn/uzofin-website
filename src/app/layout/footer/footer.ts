import { Component } from '@angular/core';

type FooterLink = { label: string; href: string };
type SocialLink = FooterLink & { logoSrc: string };

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly productLinks: FooterLink[] = [
    { label: 'AI Banking', href: '#' },
    { label: 'Payment', href: '#' },
    { label: 'Payout', href: '#' },
    { label: 'Merchant Onboarding', href: '#' },
    { label: 'FRM', href: '#' },
  ];

  protected readonly companyLinks: FooterLink[] = [
    { label: 'About Us', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  protected readonly legalLinks: FooterLink[] = [
    { label: 'Cookie Policy', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/uzofin',
      logoSrc: 'assets/social-media-logo/linkedin.svg',
    },
    { label: 'X', href: 'https://x.com/uzofin', logoSrc: 'assets/social-media-logo/twitter.svg' },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/uzofin',
      logoSrc: 'assets/social-media-logo/insta.svg',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/uzofin',
      logoSrc: 'assets/social-media-logo/fb.svg',
    },
  ];
}
