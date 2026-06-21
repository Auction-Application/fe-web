import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserEntryComponent } from '../user-entry.component';

@Component({
  selector: 'app-login-page',
  template: `
    <app-user-entry>
      <app-login-form />
    </app-user-entry>
  `,
  imports: [UserEntryComponent, LoginFormComponent],
})
export class LoginPageComponent {}
