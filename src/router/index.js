import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

let NotFound = () => import('@/views/NotFound')
import auth from './auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    ...auth,
    {
      path: '*',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await store.dispatch('auth/currentUser')
    const session = await store.dispatch('auth/currentSession')
    if (!user || !session) {
      return next({
        name: 'signIn',
        query: {
          redirect: to.fullPath,
        },
      })
    }
    return next()
  }
  return next()
})

export default router
