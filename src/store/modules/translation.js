/* eslint-disable no-shadow */
import german from '@/i18n/german';

export const namespaced = true;

export const state = { langKeys: german };

export const getters = {
  i18n: (state) => state.langKeys,
};
