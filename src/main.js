import Vue from 'vue';
import { mapActions } from 'vuex';
import cachingHelper from '@/helper/cachingHelper';
import storageHelper from '@/helper/storageHelper';
import storageNames from '@/data/storageNames';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/styles/main.scss';

Vue.config.productionTip = false;

// Save vuex store to local storage
store.subscribe((mutation, state) => {
  storageHelper.write(cachingHelper.write(state), storageNames.VUEX_STORE);
});

new Vue({
  router,
  store,
  vuetify,
  methods: {
    ...mapActions(['initializeState']),
  },
  created() {
    this.initializeState();
  },
  render: (h) => h(App),
}).$mount('#app');
