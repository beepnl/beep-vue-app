import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/views/SignUp'
import NotFound from '@/views/NotFound'
import SignIn from '@/views/SignIn'
import SignOut from '@/views/SignOut'
import Store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/sign-out',
      name: 'signOut',
      component: SignOut,
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: SignUp,
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters['user/isLoggedIn']) {
      return next({ name: 'signIn', query: { redirect: to.fullPath } })
    }
    return next()
  }
  return next()
})

export default router
