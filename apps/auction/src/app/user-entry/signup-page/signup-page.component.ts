import { Component, inject } from '@angular/core';
import { SignupFormComponent } from '../signup-form/signup-form.componentts';
import { UserEntryComponent } from '../user-entry.component';
import { SignupState } from './signup.state';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

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
  imports: [UserEntryComponent, SignupFormComponent, VerifyEmailComponent],
})
export class SignupPageComponent {
  readonly #signupState = inject(SignupState);
  readonly showSignupPage = this.#signupState.showSignupPage;
}
