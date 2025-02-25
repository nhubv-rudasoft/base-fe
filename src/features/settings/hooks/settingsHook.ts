import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setSettings } from '@/features/settings/slice/settingsSlice';
import { Settings } from '../../../auth/types';
import { useAppSelector } from '@/app/store/appStoreHook';
import { AppConstants } from '@/config/constants';

/**
 * Hook to update user settings in both Redux store and localStorage
 * @returns A memoized function to update settings
 */
export function useSetSettings() {
  const dispatch = useDispatch();

  return useCallback(
    (newSettings: Settings) => {
      try {
        // Update Redux store
        dispatch(setSettings(newSettings));

        // Persist to localStorage
        localStorage.setItem(AppConstants.USER_SETTINGS, JSON.stringify(newSettings));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    },
    [dispatch],
  );
}

/**
 * Hook to retrieve current user settings from Redux store
 * @returns Current settings object
 */
export function useGetSettings(): Settings {
  return useAppSelector((state) => state.settings);
}

/**
 * Combined hook for managing user settings
 * Similar to React's useState pattern
 * @returns [currentSettings, setSettingsFunction]
 * @example
 * const [settings, updateSettings] = useSettings();
 * updateSettings({ theme: 'dark' });
 */
export function useSettings(): [Settings, (newSettings: Settings) => void] {
  const currentSettings = useGetSettings();
  const updateSettings = useSetSettings();

  return [currentSettings, updateSettings];
}
