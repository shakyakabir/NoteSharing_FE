import { authApi } from "@/slices/Auth";
import { aiApi } from "@/slices/Ai";
import { communityApi } from "@/slices/Community";
import { NoteSlice } from "@/slices/Note";
import { rewardApi } from "@/slices/Reward";
import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "@/slices/Quiz";
import { memeberApi } from "@/slices/GroupMember";
import { subscriptionApi } from "@/slices/Subscription";
import { adminApi } from "@/slices/Admin";
import { adsApi } from "@/slices/Ads";
import profileReducer from "@/slices/profileSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [NoteSlice.reducerPath]: NoteSlice.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    [memeberApi.reducerPath]: memeberApi.reducer,
    [rewardApi.reducerPath]: rewardApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      NoteSlice.middleware,
      aiApi.middleware,
      communityApi.middleware,
      quizApi.middleware,
      memeberApi.middleware,
      rewardApi.middleware,
      subscriptionApi.middleware,
      adminApi.middleware,
      adsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
