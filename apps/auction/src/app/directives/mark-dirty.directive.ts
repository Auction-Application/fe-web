import { Directive, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: 'button[markDirty]',
  host: {
    '(click)': 'markFormAsDirty()',
  },
})
export class MarkAllAsDirtyDirective {
  readonly #controlContainer = inject(ControlContainer);

  markFormAsDirty() {
    this.#controlContainer.control?.markAllAsDirty();
  }
}
