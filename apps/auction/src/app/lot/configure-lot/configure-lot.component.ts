import { Component, inject } from '@angular/core';
import { TuiStepper } from '@taiga-ui/kit';
import { ConfigureLotState } from './configure-lot.state';
import { ItemDetailsComponent } from './steps/item-details/item-details.component';
import { MediaUploadComponent } from './steps/media-upload/media-upload.component';
import { PricingComponent } from './steps/pricing/pricing.component';

@Component({
  selector: 'app-configure-lot',
  imports: [
    TuiStepper,
    MediaUploadComponent,
    ItemDetailsComponent,
    PricingComponent,
  ],
  providers: [ConfigureLotState],
  host: {
    class: 'background',
  },
  templateUrl: './configure-lot.component.html',
  styles: ``,
})
export class ConfigureLotComponent {
  readonly #lotState = inject(ConfigureLotState);
  lotStateStep = this.#lotState.activeStep;
  protected readonly steps = ['Item Details', 'Images', 'Pricing', 'Shipping'];

  protected changeStep(stepIndex: number) {
    this.#lotState.changeStep(stepIndex);
  }
}
