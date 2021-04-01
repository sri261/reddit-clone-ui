import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Console } from "node:console";
import { api } from "../api/api";
import { extractStandardResponseData } from "../api/api";
import { RootState } from "./store";

export const getCommentsForPost = createAsyncThunk(
  "comments/get",
  async (post_id: number) => {
    try {
      const Comments = await api
        .get(`posts/comment/${post_id}`)
        .then(extractStandardResponseData);
      return Comments;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComments = createAsyncThunk(
  "comments/add",
  async (comment: any) => {
    try {
      const Comments = await api
        .post("posts/comment", comment)
        .then(extractStandardResponseData);
      return Comments;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentsAdapter = createEntityAdapter<any>();

export const commentsSlice = createSlice({
  name: "hot",
  initialState: commentsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsForPost.fulfilled, (state, { payload }) => {
      commentsAdapter.setAll(state, payload);
    });
    builder.addCase(addComments.fulfilled, (state, { payload }) => {
      commentsAdapter.upsertOne(state, payload);
    });
  },
});

export const commentsSelector = {
  comments: (state: RootState) => state.comments.entities,
};
