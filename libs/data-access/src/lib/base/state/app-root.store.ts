import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../user/user.slice';

export const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
