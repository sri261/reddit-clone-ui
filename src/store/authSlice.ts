import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api, extractStandardResponseData } from "../api/api";
import { User } from "../interfaces/User";
import { RootState } from "./store";

export interface LoginI {
  username: string;
  password: string;
}

interface AuthState {
  id?: number;
  username?: string;
  token?: string;
}

const initialState = {
  id: undefined,
  username: undefined,
  token: undefined,
} as AuthState;
// export const userAdapter = createEntityAdapter<{}>();
// export const userAdapter = createEntityAdapter<InitialStateI>();

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: LoginI) => {
    console.log("inside login dispatch functon");
    const user: User = await api
      .post("/login", {
        username: username,
        password: password,
      })
      .then(extractStandardResponseData);

    return user;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, password }: LoginI) => {
    const user: User = await api
      .post("/signup", {
        username: username,
        password: password,
      })
      .then(extractStandardResponseData);
    return user;
  }
);

// export const checkToken = createAsyncThunk(
//   "auth/checkToken",
//   async (token: string) => {
//     // const user;
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      id: payload.id,
      username: payload.username,
      token: payload.token,
    }));
    builder.addCase(signup.fulfilled, (state, { payload }) => ({
      id: payload.id,
      username: payload.username,
      token: payload.token,
    }));
  },
});

export const authSelectors = {
  token: (state: RootState) => state.auth.token,
  user: (state: RootState) => state.auth.username,
  user_id: (state: RootState) => state.auth.id,
};
