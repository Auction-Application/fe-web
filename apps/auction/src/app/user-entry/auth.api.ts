import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthTokens } from '../auth/auth.types';
import {
  PostUserConfirmSignupPayload,
  PostUserSigninPayload,
  PostUserSignupPayload,
  PostUserSignupResponse,
} from './auth.api.types';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  readonly #httpClient = inject(HttpClient);

  signupUser(userSignupDetails: PostUserSignupPayload) {
    return this.#httpClient.post<PostUserSignupResponse>(
      `signup`,
      userSignupDetails,
    );
  }

  signinUser(userSigninDetails: PostUserSigninPayload) {
    return this.#httpClient.post<AuthTokens>(`signup`, userSigninDetails);
  }

  confirmUserSignup(userConfirmSignupDetails: PostUserConfirmSignupPayload) {
    return this.#httpClient.post<unknown>(`confirm`, userConfirmSignupDetails);
  }
}
