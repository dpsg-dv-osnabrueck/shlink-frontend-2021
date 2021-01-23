/* eslint-disable no-shadow */
import shlink from '@/api/shlink';

export const namespaced = true;

export const state = {
  urls: {},
  status: 1,
};

export const mutations = {
  ADD_URLS(state, payload) {
    state.urls = payload;
  },
};

export const actions = {
  fetchUrls({ commit }) {
    return new Promise((resolve, reject) => {
      shlink
        .get()
        .then((response) => {
          if (response.status === 200) {
            commit('ADD_URLS', response.data.shortUrls.data);
            resolve();
          }
        })
        .catch((err) => {
          console.error(err);
          reject();
        });
    });
  },

  createUrl({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      shlink
        .create(payload)
        .then((response) => {
          if (response.status === 200) {
            dispatch('fetchUrls');
            resolve();
          }
        })
        .catch((err) => {
          console.error(err);
          reject();
        });
    });
  },

  deleteUrl({ dispatch }, shortCode) {
    return new Promise((resolve, reject) => {
      shlink
        .delete(shortCode)
        .then((response) => {
          if (response.status === 204) {
            dispatch('fetchUrls');
            resolve();
          }
        })
        .catch((err) => {
          console.error(err);
          reject();
        });
    });
  },
};

export const getters = {};
