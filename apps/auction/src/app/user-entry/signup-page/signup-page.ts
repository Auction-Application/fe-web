import { Component } from '@angular/core';
import { UserEntry } from '../user-entry';
import { SignupForm } from '../signup-form/signup-form';
import { SignupState } from './signup.state';

@Component({
  selector: 'app-signup-page',
  providers: [SignupState],
  template: `
    <app-user-entry>
      <app-signup-form />
    </app-user-entry>
  `,
  imports: [UserEntry, SignupForm],
})
export class SignupPage {}
