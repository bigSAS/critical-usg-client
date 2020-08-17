import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({store}) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.dev.js instead!
    // quasar.conf.dev.js -> build -> vueRouterMode
    // quasar.conf.dev.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.path.indexOf('admin') >= 0) {
      console.log('admin route!')
      const user = store.getters.user
      console.log('user', user)
      if (!user || !user.is_superuser) {
        next('/')
      }
    }
    next()
  })
  return Router
}
