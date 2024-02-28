import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button
      class="py-2 px-4 text-white font-medium rounded-lg hover:opacity-90 flex flex-row justify-center items-center gap-2"
      [class.w-full]="full"
      [class.bg-tint]="color === 'tint'"
      [class.bg-red]="color === 'red'"
      [class.bg-green]="color === 'green'"
      (click)="onClick()"
    >
      @if(leftIcon) {
      <mat-icon
        aria-hidden="false"
        aria-label="Map Icon"
        [fontIcon]="leftIcon"
        class="material-icons-round grid place-content-center text-white"
      />
      }
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() color: string = 'tint';
  @Input() text: string = '';
  @Output() btnClick = new EventEmitter();
  @Input() leftIcon?: string;
  @Input() full?: boolean = false;

  onClick() {
    this.btnClick.emit();
  }
}
