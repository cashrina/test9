import {configureStore, Store} from '@reduxjs/toolkit';

export const store: Store= configureStore({
  reducer: {
    // cart: cartReducer,
    // dishes: dishesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;