import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon, TuiInput, TuiLabel } from '@taiga-ui/core';
import { TuiButtonLoading, TuiPassword } from '@taiga-ui/kit';
import { ApiErrorToast, ErrorToast } from '../../api-error-toast';
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
  ],
})
export class SignupForm {
  readonly #signupState = inject(SignupState);

  protected signupForm = this.#signupState.signupForm;

  //demo
  errorToast = inject(ErrorToast);

  protected signupUser() {
    this.errorToast
      .showApiError({
        message:
          'This is error. La hai la error aayo toaster bata. This is error. La hai la error aayo toaster bata.',
        title: 'This is test1',
      })
      .subscribe();
    this.#signupState.signupUser();
  }
}
