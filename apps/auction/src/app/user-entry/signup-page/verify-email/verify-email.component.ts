import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiInputPin } from '@taiga-ui/kit';
import { tap } from 'rxjs';
import {
  Action,
  ButtonActionDirective,
  MarkAllAsTouchedDirective,
} from '../../../directives';
import { PostUserConfirmSignupResponse } from '../../auth.api.types';
import { SignupState } from '../signup.state';

@Component({
  selector: 'app-verify-email',
  imports: [
    TuiInputPin,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    ViewContainer,
    TuiButton,
    TuiIcon,
    MarkAllAsTouchedDirective,
    ButtonActionDirective,
  ],
  templateUrl: './verify-email.html',
  styles: ``,
})
export class VerifyEmailComponent {
  readonly #signupState = inject(SignupState);
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);

  comfirm() {
    console.log('confirm');
  }

  protected readonly emailVerifyPinCodeForm =
    this.#signupState.emailVerifyPinCodeForm;

  protected readonly verifyPinCode = new Action<
    unknown,
    PostUserConfirmSignupResponse
  >(
    () => {
      return this.#signupState.confirmUserSignup().pipe(
        tap(() => {
          this.#router.navigate(['login'], {
            relativeTo: this.#activatedRoute.parent,
          });
        }),
      );
    },
    () => {
      if (!this.#signupState.emailVerifyPinCodeForm.valid) {
        return {
          mode: 'ignore',
        };
      } else {
        return {
          mode: 'keep',
        };
      }
    },
  );

  protected changeToSignup() {
    this.#signupState.emailVerifyPinCodeForm.reset();
    this.#signupState.hideEmailOtpForm();
  }

  protected resendCode() {
    //todo
    console.log('Resend Code');
  }
}
