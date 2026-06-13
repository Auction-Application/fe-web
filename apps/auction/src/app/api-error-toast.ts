// api-error-toast.ts
import { Component, inject, Injectable } from '@angular/core';
import { TuiPortalContext } from '@taiga-ui/cdk';
import { TuiIcon } from '@taiga-ui/core';
import {
  TuiShrinkWrap,
  TuiToast,
  TuiToastOptions,
  TuiToastService,
} from '@taiga-ui/kit';
import { injectContext, PolymorpheusComponent } from '@taiga-ui/polymorpheus';

export interface ApiErrorData {
  readonly title: string;
  readonly message: string;
}

@Component({
  selector: 'app-toast',
  imports: [TuiIcon, TuiToast, TuiShrinkWrap],
  template: `
    <div
      tuiToast
      [attr.data-appearance]="'api-error'"
      class="gap-5"
      tuiShrinkWrap="min(20rem, 100%)"
    >
      <tui-icon
        class="text-4xl"
        icon="@tui.triangle-alert"
        [style.color]="'var(--tui-status-negative)'"
      />
      <tui-shrink-wrap class="no-before">
        <div class="d-grid gap-1">
          <strong class="text-lg">{{ data?.title }} </strong>
          <span>{{ data?.message }}</span>
        </div>
      </tui-shrink-wrap>
    </div>
  `,
  styles: `
    [data-appearance='api-error'] {
      background: var(--tui-background-base);
    }
  `,
})
export class ApiErrorToast {
  private readonly context =
    injectContext<TuiPortalContext<TuiToastOptions<ApiErrorData>>>();
  protected readonly appearance = this.context.appearance;
  protected readonly data = this.context.data;
}

@Injectable({ providedIn: 'root' })
export class ErrorToast {
  readonly toast = inject(TuiToastService);

  showApiError(data: ApiErrorData) {
    return this.toast.open(new PolymorpheusComponent(ApiErrorToast), {
      data,
      appearance: 'api-error',
      closable: true,
      autoClose: 4000000,
    });
  }
}
