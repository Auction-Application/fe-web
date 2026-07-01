import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import {
  TuiButton,
  TuiCell,
  TuiIcon,
  TuiInput,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiAvatar, TuiSelect, TuiTextarea } from '@taiga-ui/kit';
import { TuiCard } from '@taiga-ui/layout';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  host: {
    class: 'background',
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
    TuiCell,
    TuiTitle,
    TuiAvatar,
    TuiCard,
  ],
})
export class ItemDetailsComponent {
  @Output() readonly cancelled = new EventEmitter<void>();
  @Output() readonly proceeded = new EventEmitter<void>();

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

  protected readonly form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
  });

  protected get descriptionLength(): number {
    return this.form.get('description')?.value?.length ?? 0;
  }

  protected onNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.proceeded.emit();
  }
}
