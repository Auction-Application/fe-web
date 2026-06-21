export type PostUserSignupPayload = {
  email: string;
  password: string;
  username: string;
};

export type PostUserSignupResponse = {
  message: string;
  user_sub: string;
  confirmed: boolean;
};

export type PostUserConfirmSignupPayload = {
  username: string;
  code: number;
};

export type PostUserConfirmSignupResponse = {
  message: string;
};

export type PostUserSigninPayload = {
  username: string;
  password: string;
};

// export type PostUserSigninResponse = {
//   access_token: string;
//   id_token: string;
//   refresh_token: string;
//   expires_in: string;
// };
