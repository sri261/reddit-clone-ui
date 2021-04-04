import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { api } from "../api/api";
import { extractStandardResponseData } from "../api/api";
import { RootState } from "./store";
import { Subreddit } from "../interfaces/Subreddit";

export const searchSubreddit = createAsyncThunk(
  "subreddit/search",
  async (input: string) => {
    const subreddits = api
      .post("subreddits/search", { search: input })
      .then(extractStandardResponseData);
    return subreddits;
  }
);

export const createNewSubreddit = createAsyncThunk(
  "subreddit/create/new",
  async (subreddit: any) => {
    api.post("/subreddits", subreddit).then(extractStandardResponseData);
  }
);

export const getSubredditDetails = createAsyncThunk(
  "subreddit/create",
  async (subreddit_id: number) => {
    return await api
      .get(`subreddits/${subreddit_id}`)
      .then(extractStandardResponseData);
  }
);

export const updateSubreddit = createAsyncThunk(
  "subreddit/create",
  async () => {
    const updateSub = await api.post(`subreddits`);
  }
);

export const subredditAdapter = createEntityAdapter<Subreddit>();

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: subredditAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubredditDetails.fulfilled, (state, { payload }) => {
      subredditAdapter.upsertMany(state, payload);
    });
  },
});

export const subredditSelector = {
  subreddit: (state: RootState) => state.subreddits.entities,

  // subreddit: (state: any, subreddit_id: number) => {
  //   return state.subreddits.entities[subreddit_id];
  // },
};
