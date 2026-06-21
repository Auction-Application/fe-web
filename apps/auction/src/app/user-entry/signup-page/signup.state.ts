import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthApi } from '../auth.api';

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

  //todo make strict form type
  readonly signupForm = this.#formBuilder.group({
    username: this.#formBuilder.control(null, [Validators.required]),
    email: this.#formBuilder.control(null, [
      Validators.email,
      Validators.required,
    ]),
    password: this.#formBuilder.control(null, [Validators.required]),
  });

  signupUser() {
    //@ts-ignore
    return this.#authApi.signupUser(this.signupForm.value);
  }

  readonly emailVerifyPinCodeForm = this.#formBuilder.group({
    code: this.#formBuilder.control(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  confirmUserSignup() {
    const payload = {
      ...this.emailVerifyPinCodeForm.getRawValue(),
      username: this.signupForm.getRawValue().username,
    };
    //@ts-ignore
    return this.#authApi.confirmUserSignup(payload);
  }
}
