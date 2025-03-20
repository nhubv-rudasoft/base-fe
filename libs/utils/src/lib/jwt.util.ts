import { AppConstantsConfig } from '@libs/config';

/**
 * @description get token from local storage
 * @returns token
 */
export const getJWT = (): string | null => {
  return localStorage.getItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN);
};
