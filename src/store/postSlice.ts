import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { api } from "../api/api";
import { extractStandardResponseData } from "../api/api";
import { RootState } from "./store";
import { PostI } from "../interfaces/Post";
import { Subreddit } from "../interfaces/Subreddit";
import { Comment } from "../interfaces/Comments";

interface Vote {
  user_id?: number;
  post_id: number;
  vote: string;
}

export const getNewPosts = createAsyncThunk("posts/get", async () => {
  const posts = await api.get("posts/new").then(extractStandardResponseData);

  return posts;
});

export const createNewPost = createAsyncThunk(
  "posts/create",
  async (post: any) => {
    console.log("create/post", post);
    return api.post("posts", post).then(extractStandardResponseData);
  }
);

// FIXME:should be removed
export const getLatestPostsForUser = createAsyncThunk(
  "posts/get/user",
  async (user_id: any) => {
    const posts = await api
      .post(`subreddit/follow/${user_id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // .then(extractStandardResponseData);
  }
);

export const getHotPosts = createAsyncThunk("posts/get/hot", async () => {
  return await api.get("posts/hot").then(extractStandardResponseData);
});

export const updateVote = createAsyncThunk(
  "posts/vote",

  async (input: Vote) => {
    console.log(input);
    return await api
      .post("posts/vote", input)
      .then(extractStandardResponseData);
  }
);

export const getSubredditPosts = createAsyncThunk(
  "posts/subreddit/get",
  async (subredditId: number) => {
    return await api
      .get(`/posts/${subredditId}`)
      .then(extractStandardResponseData);
  }
);
export const getBestPosts = createAsyncThunk(
  "posts/best",
  async (userId?: number) => {
    return await api
      .get(`/posts/best/${userId}`)
      .then(extractStandardResponseData);
  }
);

export const editPost = createAsyncThunk("post/update", async (post: any) => {
  console.log(post, "edit post");
  api.patch(`posts/${post.user_id}/${post.post_id}`, {
    post_title: post.post_title,
    post_description: post.post_description,
    image_location: post.image_location,
  });
});

export const emptyPostsSlice = createAsyncThunk("posts/empty", () => {});

export const postsAdapter = createEntityAdapter<any>();

export const postSlice = createSlice({
  name: "post",
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewPosts.fulfilled, (state, { payload }) => {
      postsAdapter.setAll(state, payload);
    });
    builder.addCase(getHotPosts.fulfilled, (state, { payload }) => {
      postsAdapter.upsertMany(state, payload);
    });
    builder.addCase(getBestPosts.fulfilled, (state, { payload }) => {
      postsAdapter.upsertMany(state, payload);
    });
    builder.addCase(emptyPostsSlice.fulfilled, (state, { payload }) => {
      return postsAdapter.getInitialState();
    });
    builder.addCase(getSubredditPosts.fulfilled, (state, { payload }) => {
      postsAdapter.upsertMany(state, payload);
    });
  },
});

export const postsSelector = {
  posts: (state: RootState) => state.posts.entities,
  // post: (state: RootState, id: any) =>( {
  //   state.posts.entities[id];
  // })
};
