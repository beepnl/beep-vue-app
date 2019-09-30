import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/NotFound'
import SignIn from '@/views/SignIn'
import SignOut from '@/views/SignOut'
import Store from '@/store/store'
import Dashboard from '@/views/Dashboard'
import ForgotPassword from '@/views/ForgotPassword'
import ResetPassword from '@/views/ResetPassword'
import CreateAccount from '@/views/CreateAccount'
import ConfirmSignUp from '@/views/ConfirmSignUp'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      props: route => ({ email: route.query.email }),
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
      props: route => ({ email: route.query.email, code: route.query.code }),
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
      props: route => ({ email: route.query.email }),
    },
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
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
    const user = await Store.dispatch('Auth/currentUser')
    if (!user) {
      return next({ name: 'signIn', query: { redirect: to.fullPath } })
    }
    return next()
  }
  return next()
})

export default router
