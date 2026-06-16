import {
  ComponentRef,
  Directive,
  inject,
  input,
  OnChanges,
  OnDestroy,
  Renderer2,
  Signal,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { tuiInjectElement } from '@taiga-ui/cdk';
import { TuiLoader } from '@taiga-ui/core';

type ButtonLoaderInput = {
  loading: Signal<boolean>;
  inheritColor: Signal<boolean | undefined>;
};

@Directive({
  selector: 'button[processing]',
})
export class ButtonLoader implements OnChanges, OnDestroy {
  processing = input(false);
  inheritColor = input<boolean>(true);

  renderer = inject(Renderer2);

  //  public readonly size = input(this.options.size);
  // public readonly inheritColor = input(this.options.inheritColor);
  // public readonly overlay = input(this.options.overlay);
  // public readonly textContent = input<PolymorpheusContent>();
  // public readonly loading = input(true);
  readonly #viewContainerRef = inject(ViewContainerRef);

  #loaderRef: ComponentRef<TuiLoader> | null = null;

  //   ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges<ButtonLoaderInput>): void {
    this.#setUpSpinner(changes);
  }

  readonly #hostElement = tuiInjectElement();

  #setUpSpinner(changes: SimpleChanges<ButtonLoaderInput>) {
    const isLoading = changes.loading?.currentValue() || this.processing();

    if (
      (isLoading && !this.#loaderRef) ||
      (isLoading && this.#loaderRef?.hostView.destroyed)
    ) {
      this.#loaderRef = this.#viewContainerRef.createComponent(TuiLoader);
      this.#loaderRef.setInput('loading', this.processing());
      //   this.#loaderRef.setInput('textContent', 'Loading..');
      if (this.inheritColor()) {
        this.#loaderRef.setInput('inheritColor', Boolean(this.inheritColor()));
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
