import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiInputPin } from '@taiga-ui/kit';

@Component({
  selector: 'app-verify-email',
  imports: [
    TuiInputPin,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    ViewContainer,
  ],
  templateUrl: './verify-email.html',
  styles: ``,
})
export class VerifyEmail {
  protected readonly emailVerifyPin = new FormControl(null, [
    Validators.minLength(6),
    Validators.required,
  ]);
}
