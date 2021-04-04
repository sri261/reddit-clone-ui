import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { api } from "../api/api";
import { extractStandardResponseData } from "../api/api";
import { RootState } from "./store";
import { Subreddit } from "../interfaces/Subreddit";

interface UpdateSubreddit {
  user_id: string;
  subreddit_id: string;
  subreddit_name: string;
  description: string;
  image_location: string;
}

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
  async (input: Partial<Subreddit>) => {
    console.log(input.id);
    const updateSub = await api.patch(
      `subreddits/${input.user_id}/${input.id}`,
      input
    );
    console.log(updateSub);
    return updateSub;
    // console.log(updateSub);
  }
);

export const subredditAdapter = createEntityAdapter<Subreddit>();

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: subredditAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubredditDetails.fulfilled, (state, { payload }) => {
      console.log(payload);
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
