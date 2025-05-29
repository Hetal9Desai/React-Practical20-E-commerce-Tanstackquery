import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../componennts/auth/authSlice";
import productsReducer from "../componennts/Product/productSlice";
import searchReducer from "../componennts/Search/searchSlice"; // import your search slice reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    search: searchReducer,
  },
  middleware: (getDefault) => getDefault().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
