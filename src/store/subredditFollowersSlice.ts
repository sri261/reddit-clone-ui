import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { api } from "../api/api";
import { extractStandardResponseData } from "../api/api";
import { RootState } from "./store";

export const getSubredditDetails = createAsyncThunk(
  "subreddits/get",
  async (subredditId: number) => {
    const subDetails = await api
      .get(`subreddits/${subredditId}`)
      .then(extractStandardResponseData);

    return subDetails;
  }
);
export const subredditFollowersAdapter = createEntityAdapter<any>();

export const subredditFollowersSlice = createSlice({
  name: "subredditFollowersSlice",
  initialState: subredditFollowersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubredditDetails.fulfilled, (state, { payload }) => {
      subredditFollowersAdapter.setAll(state, payload);
    });
  },
});

export const subredditFollowersSelector = {
  subredditFollowers: (state: RootState) => state.subredditFollowers.entities,
};
