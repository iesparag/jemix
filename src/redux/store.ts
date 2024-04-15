import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slice/auth-slice";
import languageReducer from "./feature/language/languageSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
