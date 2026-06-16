import {
  computed,
  DestroyRef,
  Directive,
  inject,
  input,
  InputSignal,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, Subject, takeUntil, tap } from 'rxjs';
import { createTokenFromFactory } from '../../create-token';
import { ButtonLoader } from '../button-loader.directive';
import { Action } from './action';

@Directive({
  selector: 'button[action]',
  hostDirectives: [
    {
      directive: ButtonLoader,
      inputs: ['processing', 'inheritColor'],
    },
  ],
  host: {
    '(click)': 'startAction()',
  },
})
export class ButtonActionDirective<T> implements OnChanges {
  metaDataInput = input<T | null>(null, { alias: 'metaData' });

  actionState = input<ActionState>(inject(ACTION_STATE));

  #currentState: WritableSignal<ActionState[keyof ActionState]> = signal('');
  currentState = computed(() => this.#currentState());

  readonly #destroySubj = new Subject<void>();
  readonly #destroyRef = inject(DestroyRef);

  action = input.required<Action<T>>();

  ngOnChanges(
    changes: SimpleChanges<{
      metaDataInput: InputSignal<T>;
      action: InputSignal<Action<T>>;
    }>,
  ): void {
    if (changes.action) {
      this.#destroySubj.next();
      this.#listenForAction();
    }
  }

  startAction() {
    const metaData = this.#assignMetaData();
    const replaceAction = this.action().replacedAction;
    const actionMode = replaceAction
      ? replaceAction
      : this.action().callback(metaData).mode;
    if (actionMode === 'ignore') {
      return;
    }
    if (actionMode === 'keep') {
      this.#isProcessing();
      this.action().initiateKeepAction();
    }

    if (actionMode == 'switch') {
      this.#isProcessing();
      this.action().initiateSwitchAction();
    }
  }

  #isProcessing() {
    this.#currentState.set(this.actionState().processingState);
    this.action()._setProcessing();
  }

  #reset() {
    this.#currentState.set('');
    this.action()._setIdle();
  }

  #listenForAction() {
    merge(this.action().keepAction$, this.action().switchAction$)
      .pipe(
        tap({
          next: () => {
            this.#reset();
          },
          error: () => {
            this.#reset();
          },
        }),
        takeUntil(this.#destroySubj),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  #assignMetaData() {
    let metaData: T | null = null;
    if (this.metaDataInput()) {
      metaData = this.metaDataInput();
    } else if (this.action().getMetaData()) {
      metaData = this.action().getMetaData();
    } else if (this.action().metaDataFn) {
      metaData = this.action().metaDataFn?.() || null;
    }

    return metaData;
  }
}

export type ActionState = {
  processingState: string;
};

export const ACTION_STATE = createTokenFromFactory<ActionState>(
  () => ({
    processingState: 'Processing...',
  }),
  'Button content from action config state',
);
