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
      // .then((r) => {
      //   console.log(r);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      .then(extractStandardResponseData);
    // console.log(subreddits);
    return subreddits;
  }
);

export const createNewSubreddit = createAsyncThunk(
  "subreddit/create/new",
  async (subreddit: any) => {
    console.log(subreddit);
    api.post("/subreddits", subreddit).then(extractStandardResponseData);
  }
);
export const getSubreddits = createAsyncThunk("subreddit/create", async () => {
  const subreddits = await api
    .post("subreddit/get")
    .then(extractStandardResponseData);
  return subreddits;
});

export const subredditAdapter = createEntityAdapter<Subreddit>();

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: subredditAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubreddits.fulfilled, (state, { payload }) => {
      subredditAdapter.upsertMany(state, payload);
    });
  },
});

export const subredditSelector = {
  subreddits: (state: RootState) => state.subreddits.entities,
};
