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
import { authReducer } from "./auth/slice.js";
import { setupAxiosInterceptors } from "./auth/operation.js";
import storage from "redux-persist/lib/storage";

const authConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken'],
}
// const waterConfig = {
//     key: 'water',
//     storage,
//     whitelist: [
//         'selectedDate',
//         'selectedDateData',
//         'selectedMonth',
//         'monthData',
//         'toggleInfo'
//     ],
// }
const persistorAuthReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistorAuthReducer,
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