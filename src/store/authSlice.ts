import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api, extractStandardResponseData } from "../api/api";
import { User } from "../interfaces/User";
import { RootState } from "./store";

export interface LoginI {
  username: string;
  password: string;
}

export interface Follow {
  user_id?: number;
  subreddit_id: number;
}

interface AuthState {
  id?: number;
  username?: string;
  token?: string;
  followed_subreddits?: number[];
}

const initialState = {
  id: undefined,
  username: undefined,
  token: undefined,
  followed_subreddits: undefined,
} as AuthState;

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: LoginI) => {
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

export const followSubreddit = createAsyncThunk(
  "auth/follow",
  async ({ user_id, subreddit_id }: Follow) => {
    const follow = await api.post("subreddit/follow", {
      user_id: user_id,
      subreddit_id: subreddit_id,
    });

    // console.log(follow.data.followed_subreddits, "follow");
    return { followed_subreddits: follow.data.followed_subreddits };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      id: payload.id,
      username: payload.username,
      token: payload.token,
      followed_subreddits: payload.followed_subreddits,
    }));
    builder.addCase(signup.fulfilled, (state, { payload }) => ({
      id: payload.id,
      username: payload.username,
      token: payload.token,
    }));
    builder.addCase(followSubreddit.fulfilled, (state, { payload }) => ({
      ...state,
      followed_subreddits: payload.followed_subreddits,
    }));
  },
});

export const authSelectors = {
  token: (state: RootState) => state.auth.token,
  user: (state: RootState) => state.auth.username,
  user_id: (state: RootState) => state.auth.id,
  followed_subreddits: (state: RootState) => state.auth.followed_subreddits,
};
