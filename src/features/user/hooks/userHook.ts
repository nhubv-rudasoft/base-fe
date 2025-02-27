import { useMutationBase, useQueryBase } from '@/shared/hooks/queryBaseHook.ts';
import {
  getUserProfile,
  updateUserAvatar,
  updateUserProfile,
} from '@/features/user/services/userService.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/appStoreHook';
import { setProfile } from '@/features/user/slices/userSlice.ts';
import { UserUpdateAvatarRequest, UserUpdateProfileRequest } from '../types';

/**
 * Get user profile
 * @returns query, profile, isLoading, isError, error
 */
export const useGetUserProfile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((AppRootState) => AppRootState.user.profile);

  const query = useQueryBase(['useProfile'], async () => {
    const data = await getUserProfile();
    dispatch(setProfile(data.body));
    return data;
  });

  return {
    query,
    profile: profileState,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};

/**
 * Update user profile
 * @returns mutation, isLoading, isError, error
 */
export const useUpdateUserProfile = () => {
  const dispatch = useAppDispatch();
  const mutation = useMutationBase<any, { payload: UserUpdateProfileRequest }>(
    async ({ payload }) => {
      const data = await updateUserProfile(payload);
      dispatch(setProfile(data.body));
      return data;
    },
  );

  return {
    mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

/**
 * Update user avatar
 * @returns mutation, isLoading, isError, error
 */
export const useUpdateUserAvatar = () => {
  const mutation = useMutationBase<any, { payload: UserUpdateAvatarRequest }>(
    async ({ payload }) => {
      const data = await updateUserAvatar(payload);
      return data;
    },
  );

  return {
    mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
