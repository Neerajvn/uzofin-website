import { Component } from '@angular/core';

export type WhyCard = {
  title: string;
  description: string;
};

export type WhyMarqueeRow = {
  direction: 'left' | 'right';
  cards: WhyCard[];
};

@Component({
  selector: 'app-why',
  templateUrl: './why.html',
  styleUrl: './why.scss',
})
export class Why {
  protected readonly rows: WhyMarqueeRow[] = [
    {
      direction: 'left',
      cards: [
        {
          title: 'Unified Dashboard',
          description: 'Manage banking, payments, and merchants in one place.',
        },
        {
          title: 'AI-Driven Decisions',
          description: 'Automate approvals, verification, and financial operations.',
        },
        {
          title: 'Unified Dashboard',
          description: 'Manage banking, payments, and merchants in one place.',
        },
        {
          title: 'AI-Driven Decisions',
          description: 'Automate approvals, verification, and financial operations.',
        },
      ],
    },
    {
      direction: 'right',
      cards: [
        {
          title: 'Multiple Payment Options',
          description: 'Accept payment options like cards, wallets, and more.',
        },
        {
          title: 'Developer-Friendly APIs',
          description: 'Build, integrate, and launch faster.',
        },
        {
          title: 'Enterprise-Grade Security',
          description: 'Bank-level encryption and compliance.',
        },
        {
          title: 'Developer-Friendly APIs',
          description: 'Build, integrate, and launch faster.',
        },
      ],
    },
    {
      direction: 'left',
      cards: [
        {
          title: 'AI-Driven Decisions',
          description: 'Automate approvals, verification, and financial operations.',
        },
        {
          title: 'Scalable Infrastructure',
          description: 'Designed for startups to enterprises.',
        },
        {
          title: 'Enterprise-Grade Security',
          description: 'Bank-level encryption and compliance.',
        },
        {
          title: 'Developer-Friendly APIs',
          description: 'Build, integrate, and launch faster.',
        },
      ],
    },
  ];
}
