import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiAvatar, TuiBadge, TuiSwitch } from '@taiga-ui/kit';
import { TuiCard, TuiCardLarge } from '@taiga-ui/layout';
import {
  MarkAllAsDirtyDirective,
  MarkAllAsTouchedDirective,
} from 'apps/auction/src/app/directives';
import { ConfigureLotState } from '../../configure-lot.state';

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
  // @Output() readonly back = new EventEmitter<void>();
  @Output() readonly proceeded = new EventEmitter<void>();

  readonly #lotState = inject(ConfigureLotState);

  protected readonly lotPriceForm = this.#lotState.lotPriceForm;

  protected get showReservePrice(): boolean {
    return !!this.lotPriceForm.get('reserveEnabled')?.value;
  }

  protected nextStep(): void {
    if (this.lotPriceForm.invalid) {
      return;
    }
  }

  protected previousStep() {
    this.#lotState.previousStep();
  }
}
