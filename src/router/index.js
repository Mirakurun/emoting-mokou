import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';

import routes from './routes';

Vue.use(VueRouter);
Vue.use(Meta);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash, offset: { x: 0, y: 50 } };
      }
      return { x: 0, y: 0 };
    },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    store.commit('user/setPreviousRoute', from.name);
    next();
  });

  return Router;
}
