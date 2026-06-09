import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon, TuiInput, TuiLabel } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  imports: [
    RouterLink,
    TuiButton,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    TuiInput,
    TuiLabel,
    TuiIcon,
    TuiPassword,
    ViewContainer,
  ],
})
export class LoginForm {
  protected readonly formBuilder = inject(FormBuilder);

  protected readonly loginForm = this.formBuilder.group({
    username: this.formBuilder.control(null, [Validators.required]),
    password: this.formBuilder.control(null, [Validators.required]),
  });

  protected loginUser() {
    console.log('user login');
  }
}
