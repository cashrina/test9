import {configureStore} from '@reduxjs/toolkit';
import {categoriesReducer} from "../store/Category/categoriesSlice.ts";
import {transactionReducer} from "../store/Transaction/transactionSlice.ts";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transaction: transactionReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;