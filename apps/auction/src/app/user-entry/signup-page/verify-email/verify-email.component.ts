import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiInputPin } from '@taiga-ui/kit';

@Component({
  selector: 'app-verify-email',
  imports: [
    TuiInputPin,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    ViewContainer,
    TuiButton,
    TuiIcon,
    RouterLink,
  ],
  templateUrl: './verify-email.html',
  styles: ``,
})
export class VerifyEmailComponent {
  protected readonly emailVerifyPin = new FormControl(null, [
    Validators.minLength(6),
    Validators.required,
  ]);

  protected changeToSignup() {
    console.log('Changed to Signup');
  }

  protected resendCode() {
    console.log('Resend Code');
  }
}
