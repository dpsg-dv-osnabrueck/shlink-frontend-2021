export default {
  VUEX_STORE: process.env.NODE_ENV === 'production' ? 'vuexStoreShlink' : 'vuexStoreShlinkdev',
};
