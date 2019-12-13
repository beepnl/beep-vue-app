let SignIn = () => import(/* webpackChunkName: "Auth" */ '@/views/auth/SignIn')
let SignOut = () =>
  import(/* webpackChunkName: "Auth" */ '@/views/auth/SignOut')
let PasswordForgotten = () =>
  import(/* webpackChunkName: "Password" */ '@/views/auth/PasswordForgotten')
let PasswordReset = () =>
  import(/* webpackChunkName: "Password" */ '@/views/auth/PasswordReset')
let SignUp = () =>
  import(/* webpackChunkName: "Signup" */ '@/views/auth/SignUp')
let SignUpConfirmation = () =>
  import(/* webpackChunkName: "Signup" */ '@/views/auth/SignUpConfirmation')

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
    path: '/password-forgotten',
    name: 'passwordForgotten',
    component: PasswordForgotten,
  },
  {
    path: '/password-reset',
    name: 'passwordReset',
    component: PasswordReset,
    props: route => ({
      email: route.query.email,
      code: route.query.code,
    }),
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: SignUp,
  },
  {
    path: '/sign-up-confirm',
    name: 'signUpConfirmation',
    component: SignUpConfirmation,
    props: route => ({
      email: route.query.email,
    }),
  },
]
