import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthApi } from '../auth.api';
import { PostUserConfirmSignupPayload } from '../auth.api.types';

@Injectable()
export class SignupState {
  readonly #formBuilder = inject(FormBuilder);
  readonly #authApi = inject(AuthApi);

  readonly #showSignupPage = signal(true);
  readonly showSignupPage = computed(() => this.#showSignupPage());

  showEmailOtpForm() {
    this.#showSignupPage.set(false);
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
    //todo add toaster message
    //@ts-ignore
    return this.#authApi.signupUser(this.signupForm.value);
  }

  confirmUserSignup(userConfirmSignupDetails: PostUserConfirmSignupPayload) {
    //todo add toaster message
    return this.#authApi.confirmUserSignup(userConfirmSignupDetails);
  }
}
