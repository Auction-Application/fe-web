import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiAvatar, TuiSelect, TuiTextarea } from '@taiga-ui/kit';
import { TuiCard, TuiCardLarge } from '@taiga-ui/layout';
import {
  MarkAllAsDirtyDirective,
  MarkAllAsTouchedDirective,
} from 'apps/auction/src/app/directives';
import { ConfigureLotState } from '../../configure-lot.state';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  host: {
    class: 'bg-inherit',
  },
  imports: [
    ReactiveFormsModule,
    DynamicValidatorMessage,
    ViewContainer,
    TuiInput,
    TuiSelect,
    TuiTextarea,
    TuiButton,
    TuiIcon,
    TuiAvatar,
    TuiCard,
    MarkAllAsTouchedDirective,
    MarkAllAsDirtyDirective,
    TuiCardLarge,
  ],
})
export class ItemDetailsComponent {
  // @Output() readonly cancelled = new EventEmitter<void>();
  // @Output() readonly proceeded = new EventEmitter<void>();

  readonly #lotState = inject(ConfigureLotState);

  protected readonly categories = [
    'Paintings & Prints',
    'Sculpture',
    'Photography',
    'Jewelry & Watches',
    'Antiques & Collectibles',
    'Wine & Spirits',
    'Books & Manuscripts',
    'Asian Art',
  ];

  protected readonly itemDetailsForm = this.#lotState.itemDetailsForm;

  protected get descriptionLength(): number {
    return this.itemDetailsForm.get('description')?.value?.length ?? 0;
  }

  protected nextStep(): void {
    if (this.itemDetailsForm.invalid) {
      return;
    }
    this.#lotState.nextStep();
  }
}
