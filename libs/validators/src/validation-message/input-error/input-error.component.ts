import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, KeyValuePipe, KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagePipe } from '../error-message.pipe';

@Component({
  selector: 'lib-input-error',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ErrorMessagePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngFor="let error of errors | keyvalue; trackBy: trackByFn"
      class="input-error"
    >
      {{ error.key | errorMessage: error.value : name }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | undefined | null = null;

  @Input()
  name!: string;

  trackByFn(index: number, item: KeyValue<string, any>) {
    return item.key;
  }
}
