import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libViewContainer]',
  standalone: true,
  exportAs: 'libViewContainer',
})
export class ViewContainer {
  container = inject(ViewContainerRef);
}
