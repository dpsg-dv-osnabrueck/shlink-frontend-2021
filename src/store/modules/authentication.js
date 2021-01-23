/* eslint-disable no-shadow */
import authentication from '@/api/authentication';
import requestStatus from '@/data/requestStatus';
import MattermostStatus from '@/data/mmStatus';

export const namespaced = true;

export const state = {
  user: {},
  status: requestStatus.init,
  mattermostStatus: requestStatus.init,
  errorMessage: null,
  accessToken: null,
  mfa: false,
};

export const mutations = {
  ADD_USER_DATA(state, payload) {
    state.user = payload.user;
    state.accessToken = payload.token;
  },

  CHANGE_AUTH_STATUS(state, statusCode) {
    state.status = statusCode;
  },

  CHANGE_MATTERMOST_STATUS(state, statusCode) {
    state.mattermostStatus = statusCode;
  },

  CHANGE_ERROR_MESSAGE(state, message) {
    state.errorMessage = message;
  },

  LOGOUT(state) {
    state.user = {};
    state.accessToken = null;
    state.mfa = false;
  },

  MFA(state, mfa) {
    state.mfa = mfa;
  },
};

export const actions = {
  authenticateClient({ commit }, payload) {
    commit('CHANGE_AUTH_STATUS', requestStatus.loading);
    return new Promise((resolve, reject) => {
      authentication
        .auth(payload)
        .then((response) => {
          if (response.status === 200) {
            commit('ADD_USER_DATA', {
              user: response.data,
              token: response.headers.token,
            });
            commit('CHANGE_AUTH_STATUS', requestStatus.ready);
            resolve(response);
          }
          if (
            response.status === 401
            && response.id === MattermostStatus.NeedToken
          ) {
            commit('CHANGE_MATTERMOST_STATUS', MattermostStatus.NeedToken);
          }
          if (
            response.status === 401
            && response.id === MattermostStatus.InvalidToken
          ) {
            commit('CHANGE_MATTERMOST_STATUS', MattermostStatus.InvalidToken);
            commit('CHANGE_ERROR_MESSAGE', response.message);
          }
          if (
            response.status === 401
            && response.id === MattermostStatus.WrongCreds
          ) {
            commit('CHANGE_MATTERMOST_STATUS', MattermostStatus.WrongCreds);
            commit('CHANGE_ERROR_MESSAGE', response.message);
          }
        })
        .catch((err) => {
          console.error('Error', err);
          commit('CHANGE_AUTH_STATUS', requestStatus.error);
          reject(err);
        });
    });
  },

  checkMFA({ commit }, loginId) {
    commit('CHANGE_AUTH_STATUS', requestStatus.loading);
    return new Promise((resolve) => {
      authentication.mfa(loginId).then((response) => {
        commit('MFA', response.data.mfa_required);
        commit('CHANGE_AUTH_STATUS', requestStatus.init);
        resolve();
      });
    });
  },

  logout({ commit, state }) {
    return new Promise((resolve) => {
      authentication.logout(state.user.accessToken).then(() => {
        commit('LOGOUT');
        resolve();
      });
    });
  },
};

export const getters = {
  isAuthenticated: (state) => (state.user.email_verified ? state.user.email_verified : false),
};
