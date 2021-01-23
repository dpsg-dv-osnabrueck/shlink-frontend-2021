export default {
  SHLINK: {
    BASE: process.env.VUE_APP_URL_SHLINK,
    SHORT_URLS: '/short-urls',
  },
  MATTERMOST: {
    BASE: process.env.VUE_APP_URL_MATTERMOST,
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    MFA: '/users/mfa',
  },
};
