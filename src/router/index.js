import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

let NotFound = () => import('@/views/NotFound')
import auth from './auth'

Vue.use(Router)

// https://router.vuejs.org/guide/advanced/scroll-behavior.html
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else if (to.hash) {
    return {
      selector: to.hash,
      offset: {
        x: 0,
        y: 10,
      },
    }
  } else {
    return {
      x: 0,
      y: 0,
    }
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    ...auth,
    {
      path: '*',
      component: NotFound,
    },
  ],
  scrollBehavior,
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
