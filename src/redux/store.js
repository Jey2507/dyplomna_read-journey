import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice.js";
import { booksReducer } from "./books/slice.js";
import { filtersReducer } from "./filters/slice.js";
import { setupAxiosInterceptors } from "./auth/operation.js";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken"],
};

const filtersConfig = {
  key: "filters",
  storage,
};

const persistedAuthReducer = persistReducer(authConfig, authReducer);
const persistedFiltersReducer = persistReducer(filtersConfig, filtersReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    books: booksReducer,
    filters: persistedFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);
export const persistor = persistStore(store);