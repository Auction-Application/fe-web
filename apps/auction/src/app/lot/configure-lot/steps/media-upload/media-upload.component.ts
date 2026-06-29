import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiFileLike, TuiFiles, tuiFilesAccepted } from '@taiga-ui/kit';
import { map } from 'rxjs';

@Component({
  selector: 'app-media-upload',
  imports: [ReactiveFormsModule, TuiFiles, AsyncPipe],
  templateUrl: './media-upload.component.html',
  styles: ``,
})
export class MediaUploadComponent {
  protected readonly control = new FormControl<TuiFileLike | null>(
    null,
    Validators.required,
  );

  protected readonly accepted$ = this.control.valueChanges.pipe(
    map(() => tuiFilesAccepted(this.control)),
  );
  protected rejected: readonly File[] = [];

  protected onReject(files: readonly File[]): void {
    this.rejected = Array.from(new Set(this.rejected.concat(files)));
  }

  protected onRemove(file: File): void {
    this.rejected = this.rejected.filter((rejected) => rejected !== file);
    this.control.setValue(
      //@ts-ignore
      this.control.value?.filter((current) => current !== file) ?? [],
    );
  }

  see() {
    console.log(this.control.value);
  }
}
