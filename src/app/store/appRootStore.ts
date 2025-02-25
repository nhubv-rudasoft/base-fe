import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/slices/userSlice';
import settingsReducer from '@/features/settings/slice/settingsSlice';

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});

export type AppRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
