import { Component } from '@angular/core';
import { UserEntry } from '../user-entry';
import { SignupForm } from '../signup-form/signup-form';
import { SignupState } from './signup.state';
import { VerifyEmail } from './verify-email/verify-email';

@Component({
  selector: 'app-signup-page',
  providers: [SignupState],
  template: `
    <app-user-entry>
      <!-- <app-signup-form /> -->
      <app-verify-email></app-verify-email>
    </app-user-entry>
  `,
  imports: [UserEntry, SignupForm, VerifyEmail],
})
export class SignupPage {}
