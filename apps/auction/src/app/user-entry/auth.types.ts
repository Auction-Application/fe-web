import { FormControl } from '@angular/forms';

export type LoginForm = {
  username: FormControl<string>;
  password: FormControl<string>;
};

export type SignupForm = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
};

export type SignupConfirmForm = {
  code: FormControl<string>;
};
