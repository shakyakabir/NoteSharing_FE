import { authApi } from "@/slices/Auth";
import { aiApi } from "@/slices/Ai";
import { communityApi } from "@/slices/Community";
import { NoteSlice } from "@/slices/Note";
import { rewardApi } from "@/slices/Reward";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [NoteSlice.reducerPath]: NoteSlice.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    [rewardApi.reducerPath]: rewardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      NoteSlice.middleware,
      aiApi.middleware,
      communityApi.middleware,
      rewardApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
