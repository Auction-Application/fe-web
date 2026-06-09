import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiIcon, TuiInput, TuiLabel } from '@taiga-ui/core';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiPassword } from '@taiga-ui/kit';
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
  ],
})
export class SignupForm {
  readonly #signupState = inject(SignupState);

  protected signupForm = this.#signupState.signupForm;

  protected signupUser() {
    this.#signupState.signupUser();
  }
}
