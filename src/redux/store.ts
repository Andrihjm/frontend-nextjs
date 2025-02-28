import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/slice/api-slice";
import socketMiddleware from "@/app/middleware/socket-middleware";
import chatReducer from "./features/chat-slice";
import authReducer from "./features/user-feature-slice";
import messageReducer from "./features/message-feature-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(socketMiddleware),
  devTools: true,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
