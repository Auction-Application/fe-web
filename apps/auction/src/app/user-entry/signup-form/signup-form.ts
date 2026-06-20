import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import {
  TuiButton,
  TuiIcon,
  TuiInput,
  TuiLabel,
  TuiLoader,
} from '@taiga-ui/core';
import { TuiButtonLoading, TuiPassword } from '@taiga-ui/kit';
import { tap } from 'rxjs';
import { ApiErrorToast, ErrorToast } from '../../api-error-toast';
import {
  Action,
  ButtonActionDirective,
  MarkAllAsTouchedDirective,
} from '../../directives';
import { ButtonLoader } from '../../directives/button-loader.directive';
import { PostUserSignupResponse } from '../auth.api.types';
import { SignupState } from '../signup-page/signup.state';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  imports: [
    RouterLink,
    TuiButton,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    TuiInput,
    TuiPassword,
    FormsModule,
    TuiLabel,
    TuiIcon,
    ViewContainer,
    ApiErrorToast,
    TuiButtonLoading,
    TuiLoader,
    ButtonLoader,
    MarkAllAsTouchedDirective,
    ButtonActionDirective,
  ],
})
export class SignupForm {
  readonly #signupState = inject(SignupState);

  protected signupForm = this.#signupState.signupForm;

  //demo
  errorToast = inject(ErrorToast);
  processFlag = false;
  protected signupUser() {
    // this.errorToast
    //   .showApiError({
    //     message:
    //       'This is error. La hai la error aayo toaster bata. This is error. La hai la error aayo toaster bata.',
    //     title: 'This is test1',
    //   })
    //   .subscribe();
    // this.#signupState.signupUser();
    this.processFlag = !this.processFlag;
  }

  protected readonly createAccount = new Action<
    unknown,
    PostUserSignupResponse
  >(
    () => {
      return this.#signupState.signupUser().pipe(
        tap(() => {
          this.#signupState.showEmailOtpForm();
        }),
      );
    },
    () => {
      if (!this.#signupState.signupForm.valid) {
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
}
