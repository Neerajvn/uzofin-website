import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  // Label shown on the button.
  readonly text = input.required<string>();
  // Native button type. Defaults to button.
  readonly type = input<'button' | 'submit'>('button');
  // Filled or outline treatment. Defaults to filled.
  readonly variant = input<'primary' | 'outline'>('primary');
  // Three copies of the arrow so the icon can slide on hover.
  protected readonly arrows = [1, 2, 3];
}
