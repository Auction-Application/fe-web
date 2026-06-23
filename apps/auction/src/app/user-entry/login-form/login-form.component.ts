import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DynamicValidatorMessage, ViewContainer } from '@auction/validators';
import { TuiButton, TuiIcon, TuiInput, TuiLabel } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { tap } from 'rxjs';
import { AuthState } from '../../auth/auth.state';
import { AuthTokens } from '../../auth/auth.types';
import {
  Action,
  ButtonActionDirective,
  MarkAllAsTouchedDirective,
} from '../../directives';
import { AuthApi } from '../auth.api';
import { LoginForm } from '../auth.types';

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
    MarkAllAsTouchedDirective,
    ButtonActionDirective,
  ],
})
export class LoginFormComponent {
  protected readonly formBuilder = inject(FormBuilder);
  readonly #authApi = inject(AuthApi);

  protected readonly loginForm: FormGroup<LoginForm> =
    this.formBuilder.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  readonly #authState = inject(AuthState);

  protected readonly loginAction = new Action<unknown, AuthTokens>(
    () => {
      return this.#authApi.signinUser(this.loginForm.getRawValue()).pipe(
        tap((authData) => {
          this.#authState.setAuthTokens(authData);
        }),
      );
    },
    () => {
      if (!this.loginForm.valid) {
        return {
          mode: 'ignore',
        };
      }

      return {
        mode: 'keep',
      };
    },
  );
}
