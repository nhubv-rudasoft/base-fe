/// <reference types="vite/client" />

export const envConfig = {
  mode: import.meta.env['VITE_ENV'],
  appName: import.meta.env['VITE_APP_NAME'],
  api: {
    apiUrl: import.meta.env['VITE_API_URL'],
    apiTimeout: import.meta.env['VITE_API_TIMEOUT'],
    commonApiUri: {
      auth: {
        signin: import.meta.env['VITE_AUTH_API_SIGNIN_URI'],
        signup: import.meta.env['VITE_AUTH_API_SIGNUP_URI'],
        forgotPassword: import.meta.env['VITE_AUTH_API_FORGOT_PASSWORD_URI'],
        resetPassword: import.meta.env['VITE_AUTH_API_RESET_PASSWORD_URI'],
      },
      user: {
        profile: import.meta.env['VITE_USER_API_URI'],
      },
      file: {
        file: import.meta.env['VITE_FILE_API_URI'],
        fileManagement: import.meta.env['VITE_FILE_MANAGEMENT_API_URI'],
      },
    },
  },
  oauth2: {
    google: import.meta.env['VITE_OAUTH2_GOOGLE_URL'],
    facebook: import.meta.env['VITE_OAUTH2_FACEBOOK_URL'],
    github: import.meta.env['VITE_OAUTH2_GITHUB_URL'],
  },
  file: {
    file: import.meta.env['VITE_FILE_API_URI'],
    fileManagement: import.meta.env['VITE_FILE_MANAGEMENT_API_URI'],
  },
} as const;
