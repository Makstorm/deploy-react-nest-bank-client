import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../models/IUser";
import { AxiosError } from "axios";

export interface ITokenRes {
  accessToken: string;
}

export const registration = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    await $host.post<void>("/auth/signUp", { email, username, password });
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await $host.post<ITokenRes>("/auth/sighIn", {
      email,
      password,
    });
    localStorage.setItem("token", data.accessToken);

    const decode = jwtDecode<IUser>(data.accessToken);

    return decode;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
};

export const check = async () => {
  try {
    const { data } = await $authHost.post<ITokenRes>("auth/check", {
      Headers: {},
    });
    localStorage.setItem("token", data.accessToken);

    return jwtDecode<IUser>(data.accessToken);
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
};
