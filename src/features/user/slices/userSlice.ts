import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserProfileResponse } from '@/features/user/types';

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfileResponse>) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
