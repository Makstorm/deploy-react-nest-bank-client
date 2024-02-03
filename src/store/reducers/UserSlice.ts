import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchIsAuth, fetchUser, fetchUserRegister } from "./ActionCreators";

interface UserState {
  user: IUser | null | undefined;
  isAuth: boolean;
  isRegistered: boolean;
  isCheckLoading: boolean;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isRegistered: false,
  isCheckLoading: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
    },

    toggleError: (state) => {
      state.error = null;
    },

    toggleIsRegistered: (state) => {
      state.isRegistered = false;
    },

    resetUser: (state) => {
      state.user = null;
      return state;
    },

    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message;
      })
      .addCase(fetchUserRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
        state.isRegistered = true;
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIsAuth.fulfilled, (state, action) => {
        state.isCheckLoading = false;
        state.error = "";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchIsAuth.pending, (state) => {
        state.isCheckLoading = true;
      })
      .addCase(fetchIsAuth.rejected, (state, action) => {
        state.isCheckLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  resetUser,
  setUserError,
  logOut,
  toggleIsRegistered,
  toggleError,
} = userSlice.actions;
export default userSlice.reducer;
