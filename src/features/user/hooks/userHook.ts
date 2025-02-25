import { useQueryBase } from '@/shared/hooks/queryBaseHook.ts';
import { getUserProfile } from '@/features/user/services/userService.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/appStoreHook';
import { setProfile } from '@/features/user/slices/userSlice.ts';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((AppRootState) => AppRootState.user.profile);

  const query = useQueryBase(['useProfile'], async () => {
    const data = await getUserProfile();
    dispatch(setProfile(data));
    return data;
  });

  return {
    profile,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};
