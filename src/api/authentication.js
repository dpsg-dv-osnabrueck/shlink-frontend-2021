import axios from 'axios';
import ROUTE from '@/data/routes';

const apiClient = axios.create({
  baseURL: ROUTE.MATTERMOST.BASE,
});

export default {
  auth(payload) {
    const loginData = {
      login_id: payload.login_id,
      password: payload.password,
      token: payload.token,
    };
    return apiClient.post(ROUTE.MATTERMOST.LOGIN, loginData);
  },

  logout(token) {
    return apiClient.post(ROUTE.MATTERMOST.LOGOUT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  mfa(loginId) {
    return apiClient.post(ROUTE.MATTERMOST.MFA, {
      login_id: loginId,
    });
  },
};
