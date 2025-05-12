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
import { setupAxiosInterceptors } from "./auth/operation.js";

// Persist config for auth
const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'refreshToken'],
};

// Persist config for books (optional)
const booksConfig = {
  key: 'books',
  storage,
  // whitelist: ['someBookField'] // якщо треба зберігати певні поля
};

// Persist reducers
const persistedAuthReducer = persistReducer(authConfig, authReducer);
const persistedBooksReducer = persistReducer(booksConfig, booksReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    books: persistedBooksReducer, // або просто books: booksReducer, якщо не потрібно зберігати
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
