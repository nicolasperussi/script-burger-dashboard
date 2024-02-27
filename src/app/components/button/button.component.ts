import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="py-2 px-4 bg-tint text-white font-medium rounded-lg hover:opacity-90"
      [class.w-full]="full"
      (click)="onClick()"
    >
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() text: string = '';
  @Output() btnClick = new EventEmitter();
  @Input() leftIcon?: string;
  @Input() full?: boolean = false;

  onClick() {
		this.btnClick.emit();
	}
}
