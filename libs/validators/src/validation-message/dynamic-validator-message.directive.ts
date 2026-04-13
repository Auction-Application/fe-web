import {
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  NgForm,
  NgModel,
  PristineChangeEvent,
} from '@angular/forms';
import {
  EMPTY,
  filter,
  fromEvent,
  iif,
  merge,
  skip,
  startWith,
  Subscription,
} from 'rxjs';
import { ErrorStateMatcher } from './input-error/error-state-matcher.service';
import { InputErrorComponent } from './input-error/input-error.component';

@Directive({
  selector: `[libValidationMessage]`,
  standalone: true,
})
export class DynamicValidatorMessage implements OnInit, OnDestroy {
  ngControl =
    inject(NgControl, { self: true, optional: true }) ||
    inject(ControlContainer, { self: true });
  elementRef = inject(ElementRef);
  get form() {
    return this.parentContainer?.formDirective as
      | NgForm
      | FormGroupDirective
      | null;
  }
  @Input()
  errorStateMatcher = inject(ErrorStateMatcher);

  @Input()
  container = inject(ViewContainerRef);

  @Input()
  controlName?: string;

  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private errorMessageTrigger!: Subscription;
  private parentContainer = inject(ControlContainer, { optional: true });

  ngOnInit() {
    queueMicrotask(() => {
      if (!this.ngControl.control)
        throw Error(`No control model for ${this.ngControl.name} control...`);
      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        this.ngControl.control.events.pipe(
          filter((event) => event instanceof PristineChangeEvent),
        ),
        fromEvent(this.elementRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY),
      )
        .pipe(
          startWith(this.ngControl.control.status),
          skip(this.ngControl instanceof NgModel ? 1 : 0),
        )
        .subscribe(() => {
          if (
            this.errorStateMatcher.isErrorVisible(
              this.ngControl.control,
              this.form,
            )
          ) {
            if (!this.componentRef) {
              this.componentRef =
                this.container.createComponent(InputErrorComponent);
              this.componentRef.changeDetectorRef.markForCheck();
            }
            this.componentRef.setInput('errors', this.ngControl.errors);
            this.componentRef.setInput(
              'name',
              this.controlName || this.ngControl.name,
            );
          } else {
            this.componentRef?.destroy();
            this.componentRef = null;
          }
        });
    });
  }
  ngOnDestroy() {
    this.errorMessageTrigger.unsubscribe();
  }
}
