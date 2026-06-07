import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiIcon, TuiInput, TuiLabel } from '@taiga-ui/core';
import { DynamicValidatorMessage } from '@auction/validators';
import { TuiPassword } from '@taiga-ui/kit';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  imports: [
    RouterLink,
    TuiButton,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    TuiInput,
    TuiPassword,
    FormsModule,
    TuiLabel,
    TuiIcon,
  ],
})
export class SignupForm {
  protected readonly formBuilder = inject(FormBuilder);

  protected signupForm = this.formBuilder.group({
    fullName: this.formBuilder.control(null, [Validators.required]),
    email: this.formBuilder.control(null, [
      Validators.email,
      Validators.required,
    ]),
    password: this.formBuilder.control(null, [Validators.required]),
  });

  protected signupUser() {
    console.log('user sign up');
  }
}
