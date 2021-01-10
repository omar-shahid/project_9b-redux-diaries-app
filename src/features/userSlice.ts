import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AuthResponse, LoginUserForm, RegisterUserForm } from "../types";

type User = {
  token: string;
  name: string;
  email: string;
  id: number;
};

const initialState: User = {
  token: "",
  name: "",
  email: "",
  id: NaN,
};

export const registerAction = createAsyncThunk(
  "user/registerAction",
  async (values: RegisterUserForm, api) =>
    axios
      .post<RegisterUserForm, AxiosResponse<AuthResponse>>("/api/register", {
        values,
      })
      .then((res) => res.data)
      .then(({ token, id }) => {
        const user = {
          token,
          name: values.name,
          email: values.email,
          id,
        };
        api.dispatch(login(user));
      })
      .catch((e) => ({
        haveErrors: true,
        errors: e.response.data as string[],
      }))
);

export const loginAction = createAsyncThunk(
  "user/loginAction",
  async (values: LoginUserForm, api) =>
    axios
      .post<LoginUserForm, AxiosResponse<AuthResponse>>("/api/login", {
        values,
      })
      .then((res) => res.data)
      .then((resUser) => {
        const user = {
          ...resUser,
          email: values.email,
        };
        api.dispatch(login(user));
      })
      .catch((e) => ({
        haveErrors: true,
        errors: e.response.data as string[],
      }))
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<User>) => action.payload,
    logout: (_) => initialState,
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
