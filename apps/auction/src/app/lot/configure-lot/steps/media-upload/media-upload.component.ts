import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar, TuiFiles } from '@taiga-ui/kit';
import { TuiChip } from '@taiga-ui/kit/components/chip';
import { ConfigureLotState } from '../../configure-lot.state';

@Component({
  selector: 'app-media-upload',
  imports: [
    ReactiveFormsModule,
    TuiFiles,
    TuiButton,
    TuiIcon,
    TuiAvatar,
    TuiChip,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './media-upload.component.html',
  styleUrl: './media-upload.component.scss',
  host: { class: 'bg-inherit' },
})
export class MediaUploadComponent {
  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly proceeded = new EventEmitter<void>();
  readonly #lotState = inject(ConfigureLotState);

  protected readonly mediaUploadControl = this.#lotState.mediaUploadForm;

  protected readonly acceptedFiles = this.#lotState.acceptedFiles;
  protected rejected: readonly File[] = [];

  protected onReject(files: readonly File[]): void {
    this.rejected = Array.from(new Set(this.rejected.concat(files)));
  }

  protected onRemove(file: File): void {
    this.rejected = this.rejected.filter((rejected) => rejected !== file);
    this.mediaUploadControl.setValue(
      (this.mediaUploadControl.value as File[] | null)?.filter(
        (current) => current !== file,
      ) ?? [],
    );
  }

  protected previousStep() {
    this.#lotState.previousStep();
  }

  protected nextStep(): void {
    if (this.mediaUploadControl.invalid) {
      return;
    }
    this.#lotState.nextStep();
  }
}
