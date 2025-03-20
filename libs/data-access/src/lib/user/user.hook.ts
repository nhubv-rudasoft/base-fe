import { useAppDispatch, useAppSelector } from '../base/state';
import { useQueryBase } from '../base/hooks';
import { getUserProfile } from './user.service';
import { setProfile } from './user.slice';

/**
 * Get user profile
 * @returns query, profile, isLoading, isError, error
 */
export const useGetUserProfile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector(AppRootState => AppRootState.user.profile);

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
