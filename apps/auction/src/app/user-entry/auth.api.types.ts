import { LoginForm, SignupForm } from './auth.types';
import { FormValue } from './form.types';

export type PostUserSignupPayload = FormValue<SignupForm>;

export type PostUserSignupResponse = {
  message: string;
  user_sub: string;
  confirmed: boolean;
};

export type PostUserConfirmSignupPayload = {
  username: string;
  code: string;
};

export type PostUserConfirmSignupResponse = {
  message: string;
};

export type PostUserSigninPayload = FormValue<LoginForm>;
