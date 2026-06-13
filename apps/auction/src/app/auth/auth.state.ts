import { Injectable } from '@angular/core';
import { AuthTokens } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthState {
  readonly #ACCESS_TOKEN = 'access_token';
  readonly #REFRESH_TOKEN = 'refresh_token';
  readonly #ID_TOKEN = 'id_token';
  readonly #EXPIRES_TOKEN_IN = 'expires_in';

  getAccessToken(): string | null {
    return localStorage.getItem(this.#ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.#REFRESH_TOKEN);
  }

  getIdToken(): string | null {
    return localStorage.getItem(this.#ID_TOKEN);
  }

  //todo return TimeStamp instead of string
  getTokenExpiresInTime() {
    return localStorage.getItem(this.#EXPIRES_TOKEN_IN);
  }

  setAuthTokens(authTokens: AuthTokens) {
    localStorage.setItem(this.#ACCESS_TOKEN, authTokens.access_token);
    localStorage.setItem(this.#EXPIRES_TOKEN_IN, authTokens.expires_in);
    localStorage.setItem(this.#ID_TOKEN, authTokens.id_token);
    localStorage.setItem(this.#REFRESH_TOKEN, authTokens.refresh_token);
  }
}
