import Vue from 'vue';
import Vuex from 'vuex';
import cachingHelper from '@/helper/cachingHelper';
import storageHelper from '@/helper/storageHelper';
import storageNames from '@/data/storageNames';

import * as authentication from '@/store/modules/authentication';
import * as translation from '@/store/modules/translation';
import * as shlink from '@/store/modules/shlink';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    translation,
    shlink,
  },

  mutations: {
    INITIALIZE_STATE(state, cachedState) {
      Object.assign(state, cachedState);
    },
  },

  actions: {
    initializeState({ state, commit }) {
      const cachedState = storageHelper.read(storageNames.VUEX_STORE);
      if (cachedState) {
        commit('INITIALIZE_STATE', cachingHelper.read(state, cachedState));
      }
    },
  },
});
