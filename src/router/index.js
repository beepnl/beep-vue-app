import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import auth from './auth'
import settings from './settings'
import tabs from './tabs'
import account from './account'

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
    {
      path: '/',
      name: 'home',
      component: require('@/pages/Dashboard').default,
      children: [...tabs],
    },
    {
      path: '/apiaries/:id',
      props: true,
      name: 'apiary-details',
      component: () =>
        import(
          /* webpackChunkName: "Apiaries" */
          '@/pages/apiaries/ApiaryDetails'
        ),
    },
    {
      path: '*',
      name: 'notfound',
      component: require('@/pages/NotFound').default,
    },
    ...auth,
    ...settings,
    ...account,
  ],
  scrollBehavior,
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('startLoading')
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

router.afterEach(() => {
  store.dispatch('doneLoading')
})

export default router
