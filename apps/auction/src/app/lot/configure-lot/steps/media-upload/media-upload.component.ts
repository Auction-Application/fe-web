import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiFileLike,
  TuiFiles,
  tuiFilesAccepted,
} from '@taiga-ui/kit';
import { TuiChip } from '@taiga-ui/kit/components/chip';
import { map, shareReplay, tap } from 'rxjs';

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

  protected readonly control = new FormControl<TuiFileLike[] | null>(
    null,
    Validators.required,
  );

  protected readonly accepted$ = this.control.valueChanges.pipe(
    tap((data) => {
      console.log(data);
    }),
    map(() => tuiFilesAccepted(this.control)),
    tap((data) => {
      console.log(data);
    }),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  protected rejected: readonly File[] = [];

  protected onReject(files: readonly File[]): void {
    this.rejected = Array.from(new Set(this.rejected.concat(files)));
  }

  protected onRemove(file: File): void {
    this.rejected = this.rejected.filter((rejected) => rejected !== file);
    this.control.setValue(
      (this.control.value as File[] | null)?.filter(
        (current) => current !== file,
      ) ?? [],
    );
  }

  protected onNext(): void {
    if (this.control.invalid) {
      this.control.markAsTouched();
      return;
    }
    this.proceeded.emit();
  }
}
