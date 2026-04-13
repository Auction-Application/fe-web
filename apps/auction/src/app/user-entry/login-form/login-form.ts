import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DynamicValidatorMessage } from '@auction/validators';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  imports: [
    RouterLink,
    TuiButton,
    ReactiveFormsModule,
    DynamicValidatorMessage,
  ],
})
export class LoginForm {
  protected readonly formBuilder = inject(FormBuilder);

  protected readonly loginForm = this.formBuilder.group({
    email: this.formBuilder.control(null, [
      Validators.email,
      Validators.required,
    ]),
    password: this.formBuilder.control(null, [Validators.required]),
  });

  protected loginUser() {
    console.log('user login');
  }
}
