export class AppConstantsConfig {
  public static readonly PAGINATION = {
    PAGE_NUMBER: 1,
    PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  };

  public static readonly LOCALSTORAGE = {
    JWT_TOKEN: 'JWT',
    SETTINGS: 'SETTINGS',
  };

  public static readonly AUTH_PROVIDER = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
  };

  public static readonly DISPLAY_DATE_FORMAT = {
    DATE: 'MM/DD/YYYY',
    DATE_TIME: 'MM/DD/YYYY HH:mm',
  };

  public static readonly DATE_QUERY_FORMAT = {
    DATE: 'YYYY-MM-DD',
    DATE_TIME: 'YYYY-MM-DD HH:mm',
  };
}
