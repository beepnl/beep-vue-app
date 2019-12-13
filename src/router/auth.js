let SignIn = () => import(/* webpackChunkName: Auth */ '@/views/auth/SignIn')
let SignOut = () => import(/* webpackChunkName: Auth */ '@/views/auth/SignOut')
let ForgotPassword = () =>
  import(/* webpackChunkName: Password */ '@/views/auth/ForgotPassword')
let ResetPassword = () =>
  import(/* webpackChunkName: Password */ '@/views/auth/ResetPassword')
let CreateAccount = () =>
  import(/* webpackChunkName: Signup */ '@/views/auth/CreateAccount')
let ConfirmSignUp = () =>
  import(/* webpackChunkName: Signup */ '@/views/auth/ConfirmSignUp')

export default [
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
]
