export type RegisterUserForm = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};

export type AuthResponse = {
  token: string;
};

export type AuthErrorResponse = {
  errors: string[];
  haveErrors: boolean;
};
