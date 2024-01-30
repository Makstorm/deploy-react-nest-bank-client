import { createAsyncThunk } from "@reduxjs/toolkit";

import { check, login, registration } from "../../http/userAPI";

interface IUserLoginParams {
  email: string;
  password: string;
}

interface IUserRegistrationParams {
  email: string;
  password: string;
  username: string;
}

export const fetchUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: IUserLoginParams) => {
    return await login(email, password);
  }
);

export const fetchUserRegister = createAsyncThunk(
  "user/check",
  async ({ email, password, username }: IUserRegistrationParams) => {
    return await registration(email, password, username);
  }
);

export const fetchIsAuth = createAsyncThunk("user/registration", async () => {
  return await check();
});
