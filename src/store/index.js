import { configureStore } from "@reduxjs/toolkit";
import viewSlice from "./view-slice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import userSlice from "./user-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedViewReducer = persistReducer(persistConfig, viewSlice.reducer);
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

const store = configureStore({
  reducer: {
    view: persistedViewReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
