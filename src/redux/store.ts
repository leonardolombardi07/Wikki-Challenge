// Redux
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { productsReducer } from "./products";
import { ordersReducer } from "./orders";
import { modalsReducer } from "./UI";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    auth: authReducer,
    user: userReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});
