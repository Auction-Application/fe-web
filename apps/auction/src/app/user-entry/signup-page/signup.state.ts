import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApi } from '../auth.api';
import { SignupConfirmForm, SignupForm } from '../auth.types';

@Injectable()
export class SignupState {
  readonly #formBuilder = inject(FormBuilder);
  readonly #authApi = inject(AuthApi);

  readonly #showSignupPage = signal(true);
  readonly showSignupPage = computed(() => this.#showSignupPage());

  showEmailOtpForm() {
    this.#showSignupPage.set(false);
  }
  hideEmailOtpForm() {
    this.#showSignupPage.set(true);
  }

  readonly signupForm = this.#formBuilder.nonNullable.group<SignupForm>({
    username: this.#formBuilder.nonNullable.control('', [Validators.required]),
    email: this.#formBuilder.nonNullable.control('', [
      Validators.email,
      Validators.required,
    ]),
    password: this.#formBuilder.nonNullable.control('', [Validators.required]),
  });

  signupUser() {
    return this.#authApi.signupUser(this.signupForm.getRawValue());
  }

  readonly emailVerifyPinCodeForm: FormGroup<SignupConfirmForm> =
    this.#formBuilder.nonNullable.group({
      code: ['', [Validators.minLength(6), Validators.required]],
    });

  confirmUserSignup() {
    const payload = {
      code: this.emailVerifyPinCodeForm.getRawValue().code,
      username: this.signupForm.getRawValue().username,
    };

    return this.#authApi.confirmUserSignup(payload);
  }
}
