import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConstants } from '@/config/constants.ts';
import { Settings, SettingsState } from '../types/settings';

const initialState: SettingsState = {
  isOpenSidebar:
    JSON.parse(localStorage.getItem(AppConstants.USER_SETTINGS_PREFIX) || '{}')?.isOpenSidebar || false,
  isDarkMode:
    JSON.parse(localStorage.getItem(AppConstants.USER_SETTINGS_PREFIX) || '{}')?.isDarkMode || false,
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
