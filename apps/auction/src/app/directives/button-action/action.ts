import { computed, signal } from '@angular/core';
import {
  catchError,
  defer,
  EMPTY,
  exhaustMap,
  filter,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

export class Action<T, K = unknown> {
  #metaData: T | null = null;

  readonly #resultSubj = new ReplaySubject(1);
  readonly actionResult$ = this.#resultSubj.asObservable();

  readonly #actionSubj = new Subject<ActionableConfig>();
  #replacedAction: AllAction | null = null;

  readonly #userAction$ = defer(() =>
    this.userActionFn(this.#metaData).pipe(
      tap((response: K) => {
        this.#resultSubj.next(response);
      }),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
    ),
  );

  constructor(
    private userActionFn: (metaData: T | null) => Observable<K>,
    readonly callback: (metaData: T | null) => { mode: AllAction },
    readonly metaDataFn?: () => T,
  ) {}

  readonly keepAction$ = this.#actionSubj.asObservable().pipe(
    filter((action) => action === 'keep'),
    exhaustMap(() => this.#userAction$),
  );

  readonly switchAction$ = this.#actionSubj.asObservable().pipe(
    filter((action) => action === 'switch'),
    switchMap(() => this.#userAction$),
  );

  get replacedAction() {
    return this.#replacedAction;
  }

  initiateSwitchAction() {
    this.#actionSubj.next('switch');
  }

  initiateKeepAction() {
    this.#actionSubj.next('keep');
  }

  setMetaData() {
    return this.#metaData;
  }

  getMetaData() {
    return this.#metaData;
  }

  replaceAction(action: AllAction) {
    this.#replacedAction = action;
  }

  resetReplaceAction() {
    this.#replacedAction = null;
  }

  readonly #isProcessing = signal(false);
  readonly isProcessing = computed(() => this.#isProcessing());

  _setProcessing() {
    this.#isProcessing.set(true);
  }

  _setIdle() {
    this.#isProcessing.set(false);
  }
}

export type AllAction = 'switch' | 'keep' | 'ignore';
export type ActionableConfig = Exclude<AllAction, 'ignore'>;
