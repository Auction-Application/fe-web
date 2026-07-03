import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiBadge, TuiSwitch } from '@taiga-ui/kit';
import { TuiCard, TuiCardLarge } from '@taiga-ui/layout';
import {
  MarkAllAsDirtyDirective,
  MarkAllAsTouchedDirective,
} from 'apps/auction/src/app/directives';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  imports: [
    ReactiveFormsModule,
    DynamicValidatorMessage,
    ViewContainer,
    TuiInput,
    TuiButton,
    TuiIcon,
    TuiBadge,
    TuiSwitch,
    TuiAvatar,
    TuiCard,
    TuiCardLarge,
    MarkAllAsTouchedDirective,
    MarkAllAsDirtyDirective,
  ],
})
export class PricingComponent {
  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly proceeded = new EventEmitter<void>();

  protected readonly form = new FormGroup({
    openingBid: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    reserveEnabled: new FormControl(false),
    reservePrice: new FormControl<number | null>(null),
    buyItNowPrice: new FormControl<number | null>(null),
  });

  protected get showReservePrice(): boolean {
    return !!this.form.get('reserveEnabled')?.value;
  }

  protected onNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.proceeded.emit();
  }
}
