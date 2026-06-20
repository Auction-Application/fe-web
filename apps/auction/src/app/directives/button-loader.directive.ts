import {
  ComponentRef,
  DestroyRef,
  Directive,
  inject,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  Signal,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tuiInjectElement } from '@taiga-ui/cdk';
import { TuiLoader } from '@taiga-ui/core';
import { Subject, tap } from 'rxjs';

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

@Injectable()
export class ButtonLoadingService {
  readonly #buttonLoadingIndicator = new Subject<ButtonLoaderType>();
  readonly buttonLoadingIndicator$ =
    this.#buttonLoadingIndicator.asObservable();

  setButtonLoadingIndicator(indicator: OptionalButtonLoader) {
    this.#buttonLoadingIndicator.next({
      inheritColor: indicator.inheritColor ?? true,
      processing: indicator.processing,
    });
  }
}

type OptionalButtonLoader = MakeOptional<ButtonLoaderType, 'inheritColor'>;
type ButtonLoaderType = {
  processing: boolean;
  inheritColor: boolean;
};

type ButtonLoaderInput = {
  [Property in keyof ButtonLoaderType]: Signal<ButtonLoaderType[Property]>;
};

@Directive({
  selector: 'button[processing]',
  providers: [ButtonLoadingService],
})
export class ButtonLoader implements OnChanges, OnDestroy, OnInit {
  @Input()
  processing = false;

  @Input()
  inheritColor = true;

  renderer = inject(Renderer2);

  readonly #viewContainerRef = inject(ViewContainerRef);

  #loaderRef: ComponentRef<TuiLoader> | null = null;

  ngOnChanges(changes: SimpleChanges<ButtonLoaderInput>): void {
    this.#setUpSpinner(changes);
  }

  readonly #buttonLoadingService = inject(ButtonLoadingService);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#buttonLoadingService.buttonLoadingIndicator$
      .pipe(
        tap((buttonLoading) => {
          this.processing = buttonLoading.processing;
          this.inheritColor = buttonLoading.inheritColor;
          this.#setUpSpinner();
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  readonly #hostElement = tuiInjectElement();

  #setUpSpinner(changes?: SimpleChanges<ButtonLoaderInput>) {
    const isLoading = changes?.processing?.currentValue() || this.processing;

    if (
      (isLoading && !this.#loaderRef) ||
      (isLoading && this.#loaderRef?.hostView.destroyed)
    ) {
      this.#loaderRef = this.#viewContainerRef.createComponent(TuiLoader);
      this.#loaderRef.setInput('loading', this.processing);
      if (this.inheritColor) {
        this.#loaderRef.setInput('inheritColor', Boolean(this.inheritColor));
      }

      this.renderer.appendChild(
        this.#hostElement,
        this.#loaderRef.location.nativeElement,
      );
    } else if (!isLoading && this.#loaderRef) {
      this.renderer.removeChild(
        this.#hostElement,
        this.#loaderRef.location.nativeElement,
      );
      this.#loaderRef.destroy();
    }
  }

  ngOnDestroy(): void {
    this.#loaderRef?.destroy();
  }
}
