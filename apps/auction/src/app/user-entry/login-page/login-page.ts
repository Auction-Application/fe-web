import { Component, inject } from '@angular/core';
import { UserEntry } from '../user-entry';
import { LoginForm } from '../login-form/login-form';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
