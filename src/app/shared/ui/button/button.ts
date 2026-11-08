import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly text = input.required<string>();
  readonly type = input<'button' | 'submit'>('button');
  readonly variant = input<'primary' | 'outline'>('primary');
  protected readonly arrows = [1, 2, 3];
}
