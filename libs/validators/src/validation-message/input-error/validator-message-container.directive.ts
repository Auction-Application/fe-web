import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libValidatorMessageContainer]',
  standalone: true,
  exportAs: 'libValidatorMessageContainer'
})
export class ValidatorMessageContainer {
  container = inject(ViewContainerRef);
}
