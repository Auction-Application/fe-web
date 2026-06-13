import { Component, inject } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { UserEntry } from '../user-entry';
import { SignupState } from './signup.state';
import { VerifyEmail } from './verify-email/verify-email';

@Component({
  selector: 'app-signup-page',
  providers: [SignupState],
  template: `
    <app-user-entry>
      @if (showSignupPage()) {
        <app-signup-form />
      } @else {
        <app-verify-email />
      }
    </app-user-entry>
  `,
  imports: [UserEntry, SignupForm, VerifyEmail],
})
export class SignupPage {
  readonly #signupState = inject(SignupState);
  readonly showSignupPage = this.#signupState.showSignupPage;
}
