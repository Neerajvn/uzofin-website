import { Component } from '@angular/core';

// Label and destination for a footer navigation link.
type FooterLink = { label: string; href: string };
// Footer link that also carries a social logo asset.
type SocialLink = FooterLink & { logoSrc: string };

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  // Product column links.
  protected readonly productLinks: FooterLink[] = [
    { label: 'AI Banking', href: '#' },
    { label: 'Payment', href: '#' },
    { label: 'Payout', href: '#' },
    { label: 'Merchant Onboarding', href: '#' },
    { label: 'FRM', href: '#' },
  ];

  // Company column links.
  protected readonly companyLinks: FooterLink[] = [
    { label: 'About Us', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  // Legal column links.
  protected readonly legalLinks: FooterLink[] = [
    { label: 'Cookie Policy', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  // Social profiles shown with logo masks.
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
