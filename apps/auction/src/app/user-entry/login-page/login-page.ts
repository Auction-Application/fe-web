import { Component } from '@angular/core';
import { UserEntry } from '../user-entry';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login-page',
  template: `
    <app-user-entry>
      <app-login-form />
    </app-user-entry>
  `,
  imports: [UserEntry, LoginForm],
})
export class LoginPage {}
