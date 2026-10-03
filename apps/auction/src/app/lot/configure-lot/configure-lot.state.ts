import {
  HttpBackend,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiFileLike, tuiFilesAccepted } from '@taiga-ui/kit';
import {
  catchError,
  concat,
  EMPTY,
  filter,
  first,
  from,
  map,
  mergeMap,
  Observable,
  shareReplay,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { Action } from '../../directives';
import { ConfigureLotApi } from './configure-lot.api';
import {
  PostCreateLotResponse,
  PostPresignedUrlsResponse,
} from './lot.api.types';
import {
  LotImage,
  MultiPresignedFile,
  PresignedFile,
  SignedHeaders,
  SinglePresignedFile,
} from './lot.types';
import { sha256FromBlob } from './lot.utils';

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

  readonly #configureLotApi = inject(ConfigureLotApi);

  readonly createAuctionLot = new Action<unknown, PostCreateLotResponse>(
    () => {
      return this.#configureLotApi.createAuctionLot().pipe(
        tap((res) => {
          console.log(res);
        }),
      );
    },
    () => {
      // if (!this.loginForm.valid) {
      //   return {
      //     mode: 'ignore',
      //   };
      // }

      return {
        mode: 'keep',
      };
    },
  );

  readonly uploadMedia = new Action<unknown, PostPresignedUrlsResponse>(
    () => {
      return this.createAuctionLot.actionResult$
        .pipe(
          tap((result) => {
            console.log(result);
          }),
          first(),
        )
        .pipe(
          switchMap((auctionCreated) => {
            const files = this.mediaUploadForm.getRawValue();
            if (files === null) {
              return EMPTY;
            }

            return from(
              Promise.all(
                files.map<Promise<LotImage>>(async (f, i) => {
                  if (!(f instanceof File)) {
                    throw new Error(`No Binary content for file: ${f}`);
                  }
                  const sha256 = await sha256FromBlob(f);
                  return {
                    clientFileId: i + 1,
                    fileName: f.name,
                    fileSize: f.size,
                    sha256: sha256,
                  };
                }),
              ),
            ).pipe(
              switchMap((lotImages) => {
                return this.#configureLotApi
                  .getPresignedUrls(auctionCreated.lotId, {
                    lotId: auctionCreated.lotId,
                    lotImages: lotImages,
                  })
                  .pipe(
                    tap((res) => {
                      console.log(res);
                    }),
                  );
              }),
            );
          }),
        );
    },
    () => {
      // if (!this.loginForm.valid) {
      //   return {
      //     mode: 'ignore',
      //   };
      // }

      return {
        mode: 'keep',
      };
    },
  );

  readonly #httpBackend = inject(HttpBackend);
  readonly #destroyRef = inject(DestroyRef);

  #getFileByClientId(clientFileId: number): File | undefined {
    const files = this.mediaUploadForm.getRawValue() ?? [];
    const file = files[clientFileId - 1];
    return file instanceof File ? file : undefined;
  }

  #uploadSingleFile(file: File, { single }: SinglePresignedFile) {
    const httpReq = new HttpRequest(
      single.request.method,
      single.request.url,
      file,
      {
        headers: new HttpHeaders(createHeaders(single.request.signedHeader)),
      },
    );
    return this.#httpBackend.handle(httpReq).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
    );
  }

  #uploadMultipartFile(
    file: File,
    { multi }: MultiPresignedFile,
  ): Observable<unknown> {
    const partSize = Number(multi.partSize);

    return concat(
      from(multi.multiParts).pipe(
        mergeMap(({ request, part }) => {
          const start = (part - 1) * partSize;
          const chunk = file.slice(start, start + partSize);
          const httpReq = new HttpRequest(request.method, request.url, chunk);

          return this.#httpBackend.handle(httpReq).pipe(
            catchError(() => EMPTY),
            filter(
              (e): e is HttpResponse<unknown> => e instanceof HttpResponse,
            ),
            map((r) => {
              const etag = r.headers.get('Etag');
              if (etag === null) {
                throw new Error(
                  'Part upload response does not include etag header',
                );
              }
              return { etag, part };
            }),
          );
        }),
        toArray(),
        mergeMap((parts) => {
          return this.#configureLotApi
            .completeMultiPartUpload(multi.multipartAttemptId, parts)
            .pipe(catchError(() => EMPTY));
        }),
      ),
    );
  }

  readonly presignedUrlSubs = this.uploadMedia.actionResult$
    .pipe(
      tap((data) => {
        console.log(data);
      }),
      switchMap((data) => from(data.presignResult.presignedFiles ?? [])),
      mergeMap((presignFile: PresignedFile) => {
        const file = this.#getFileByClientId(
          presignFile.uploadFile.clientFileId,
        );

        if (!file) {
          return EMPTY;
        }

        return isSingleFile(presignFile.presignedUploadUrl)
          ? this.#uploadSingleFile(file, presignFile.presignedUploadUrl)
          : this.#uploadMultipartFile(file, presignFile.presignedUploadUrl);
      }),
      takeUntilDestroyed(this.#destroyRef),
    )
    .subscribe();
}

function isSingleFile(
  file: SinglePresignedFile | MultiPresignedFile,
): file is SinglePresignedFile {
  return Boolean((file as SinglePresignedFile).single);
}

function createHeaders(signedHeaders: SignedHeaders): {
  [key: string]: string;
} {
  const headers: Record<string, string> = {};
  Object.entries(signedHeaders).map(([headerKey, headerValue]) => {
    if (headerKey.toLowerCase() !== 'host') {
      headers[headerKey] = headerValue.values[0];
    }
  });
  return headers;
}
