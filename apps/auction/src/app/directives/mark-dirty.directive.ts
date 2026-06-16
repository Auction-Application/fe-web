import { Directive, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: 'button[type="submit"],button[markTouch]',
  host: {
    '(click)': 'markFormAsTouched()',
  },
})
export class MarkAllAsTouchedDirective {
  readonly #controlContainer = inject(ControlContainer);

  markFormAsTouched() {
    this.#controlContainer.control?.markAllAsTouched();
  }
}
