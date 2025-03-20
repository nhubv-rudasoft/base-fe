import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConstantsConfig } from '@libs/config';
import { UserProfileType, UserSettingType, UserStateType } from './user.type';

const initialState: UserStateType = {
  profile: null,
  setting: {
    locale: 'en',
    timeZone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    numberFormat: '1,000.00',
    theme: 'light',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user profile
    setProfile: (state, action: PayloadAction<UserProfileType>) => {
      state.profile = action.payload;
    },

    // Set user setting
    setSetting: (state, action: PayloadAction<UserSettingType>) => {
      state.setting = action.payload;
      localStorage.setItem(AppConstantsConfig.LOCALSTORAGE.SETTINGS, JSON.stringify(state.setting));
    },
  },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
