import Vue from 'vue';
import VueRouter from 'vue-router';
import Shortener from '@/views/Shortener.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Shlink' },
  },
  {
    path: '/shlink',
    name: 'Shlink',
    component: Shortener,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
