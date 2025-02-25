import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings, SettingsState } from '@/auth/types';
import { AppConstants } from '@/config/constants.ts';

const initialState: SettingsState = {
  isOpenSidebar:
    JSON.parse(localStorage.getItem(AppConstants.USER_SETTINGS) || '{}')?.isOpenSidebar || false,
  isDarkMode:
    JSON.parse(localStorage.getItem(AppConstants.USER_SETTINGS) || '{}')?.isDarkMode || false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * Set the settings in the redux store
     * @param state The state
     * @param action The action
     */
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.isOpenSidebar = action.payload.isOpenSidebar;
      state.isDarkMode = action.payload.isDarkMode;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
