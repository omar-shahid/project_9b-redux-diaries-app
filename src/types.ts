export type RegisterUserForm = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};

export type LoginUserForm = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  name: string;
  id: number;
};

export type AuthErrorResponse = {
  errors: string[];
  haveErrors: boolean;
};
