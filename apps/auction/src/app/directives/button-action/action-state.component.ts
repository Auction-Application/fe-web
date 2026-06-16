import { Component, inject } from '@angular/core';
import { ButtonActionDirective } from './button-action.directive';

@Component({
  selector: 'app-action-state',
  template: `
    @if (currentActionState()) {
      {{ currentActionState() }}
    } @else {
      <ng-content></ng-content>
    }
  `,
})
export class ActionStateComponent {
  protected readonly currentActionState = inject(ButtonActionDirective)
    .currentState;
}
