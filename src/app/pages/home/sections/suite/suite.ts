import { Component } from '@angular/core';

@Component({
  selector: 'app-suite',
  templateUrl: './suite.html',
  styleUrl: './suite.scss',
})
export class Suite {
  protected readonly columns = [
    [
      {
        title: 'AI Banking',
        body: 'Smart, automated digital banking for businesses. Instant onboarding, intelligent insights, and real-time account operations.',
        value: '3,969',
        label: 'Transactions per second',
        tone: 'blue',
      },
      {
        title: 'Payouts',
        body: 'Bulk, automated payouts built for high-volume businesses. Reliable, trackable, and lightning-fast disbursements.',
        value: '163,077,581,394',
        label: 'Total transactions',
        tone: 'purple',
      },
    ],
    [
      {
        title: 'Payments',
        body: 'Fast, secure, and scalable payment infrastructure. Send and receive money globally with ease.',
        value: '1,675',
        label: 'Validator nodes',
        tone: 'yellow',
      },
      {
        title: 'Merchant Onboarding',
        body: 'Frictionless onboarding for merchants at any scale. Automated KYC, verification, and risk assessments—done in minutes.',
        value: '100%',
        label: 'On-time merchant onboard',
        tone: 'green',
      },
    ],
  ];
}
