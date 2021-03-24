import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authSlice } from "./authSlice";
import { subredditSlice } from "./subredditSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    subreddits: subredditSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
