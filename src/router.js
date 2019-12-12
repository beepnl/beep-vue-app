import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/store'
import Dashboard from '@/views/Dashboard'
import NotFound from '@/views/NotFound'

import SignIn from '@/views/account/SignIn'
import SignOut from '@/views/account/SignOut'
import ForgotPassword from '@/views/account/ForgotPassword'
import ResetPassword from '@/views/account/ResetPassword'
import CreateAccount from '@/views/account/CreateAccount'
import ConfirmSignUp from '@/views/account/ConfirmSignUp'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      props: route => ({
        email: route.query.email,
      }),
    },
    {
      path: '/sign-out',
      name: 'signOut',
      component: SignOut,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword,
      props: route => ({
        email: route.query.email,
        code: route.query.code,
      }),
    },
    {
      path: '/create-account',
      name: 'createAccount',
      component: CreateAccount,
    },
    {
      path: '/confirm-sign-up',
      name: 'confirmSignUp',
      component: ConfirmSignUp,
      props: route => ({
        email: route.query.email,
      }),
    },
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      //meta: { requiresAuth: true, },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      //meta: { requiresAuth: true },
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await Store.dispatch('Auth/currentUser')
    const session = await Store.dispatch('Auth/currentSession')
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
