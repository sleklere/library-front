import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import booksSlice from "./books-slice";

const reducers = combineReducers({
  view: viewSlice.reducer,
  user: userSlice.reducer,
  books: booksSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer({ key: "root", storage }, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
