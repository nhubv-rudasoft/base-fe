export class AppConstants {
  public static readonly SYSTEM_SETTINGS = {
    JWT_TOKEN: 'accessToken',
    AFTER_LOGIN_REDIRECT_PATH: '/dashboard',
  };

  public static readonly USER_SETTINGS = 'APP_SETTINGS';

  public static readonly PAGINATION = {
    PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 100],
  };

  public static readonly DATE_FORMAT = {
    DATE: 'MM/DD/YYYY',
    DATE_TIME: 'MM/DD/YYYY HH:mm',
  };

  public static readonly DATE_QUERY_FORMAT = {
    DATE: 'YYYY-MM-DD',
    DATE_TIME: 'YYYY-MM-DD HH:mm',
  };
}
