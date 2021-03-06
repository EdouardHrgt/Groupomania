import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () =>
      import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () =>
      import(/* webpackChunkName: "panel" */ '../views/Panel.vue'),
  },
  {
    path: '/singlePost/:id',
    name: 'SinglePost',
    component: () =>
      import(/* webpackChunkName: "singlepost" */ '../views/SinglePost.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
