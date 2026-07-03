import { computed, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiFileLike, tuiFilesAccepted } from '@taiga-ui/kit';
import { map, shareReplay, tap } from 'rxjs';

@Injectable()
export class ConfigureLotState {
  readonly #activeStep = signal(0);
  readonly activeStep = computed(() => this.#activeStep());

  readonly itemDetailsForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
  });

  readonly mediaUploadForm = new FormControl<TuiFileLike[] | null>(
    null,
    Validators.required,
  );

  readonly lotPriceForm = new FormGroup({
    openingBid: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    reserveEnabled: new FormControl(false),
    reservePrice: new FormControl<number | null>(null),
    buyItNowPrice: new FormControl<number | null>(null),
  });

  readonly #accepted$ = this.mediaUploadForm.valueChanges.pipe(
    tap((data) => {
      console.log(data);
    }),
    map(() => tuiFilesAccepted(this.mediaUploadForm)),
    tap((data) => {
      console.log(data);
    }),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  acceptedFiles = toSignal(this.#accepted$);

  changeStep(stepIndex: number) {
    this.#activeStep.set(stepIndex);
  }

  nextStep() {
    const currentStep = this.activeStep();
    this.#activeStep.set(currentStep + 1);
  }

  previousStep() {
    const currentStep = this.activeStep();
    this.#activeStep.set(currentStep - 1);
  }
}
