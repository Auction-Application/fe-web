import { Component } from '@angular/core';
import { TuiStepper } from '@taiga-ui/kit';
import { ItemDetailsComponent } from './steps/item-details/item-details.component';
import { MediaUploadComponent } from './steps/media-upload/media-upload.component';

@Component({
  selector: 'app-configure-lot',
  imports: [TuiStepper, MediaUploadComponent, ItemDetailsComponent],
  host: {
    class: 'background',
  },
  templateUrl: './configure-lot.component.html',
  styles: ``,
})
export class ConfigureLotComponent {
  protected readonly steps = ['Item Details', 'Images', 'Pricing', 'Shipping'];
}
