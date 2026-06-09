import { inject, Injectable } from '@angular/core';
import {
  PostUserConfirmSignupPayload,
  PostUserSigninPayload,
  PostUserSigninResponse,
  PostUserSignupPayload,
  PostUserSignupResponse,
} from './auth.api.types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  readonly #httpClient = inject(HttpClient);

  signupUser(userSignupDetails: PostUserSignupPayload) {
    return this.#httpClient.post<PostUserSignupResponse>(
      `${environment.baseUrl}/signup`,
      userSignupDetails,
    );
  }

  signinUser(userSigninDetails: PostUserSigninPayload) {
    return this.#httpClient.post<PostUserSigninResponse>(
      `${environment.baseUrl}/signup`,
      userSigninDetails,
    );
  }

  confirmUserSignup(userConfirmSignupDetails: PostUserConfirmSignupPayload) {
    return this.#httpClient.post<unknown>(
      `${environment.baseUrl}/confirm`,
      userConfirmSignupDetails,
    );
  }
}
