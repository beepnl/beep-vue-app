export default [
  {
    path: '/sign-in',
    name: 'signIn',
    component: () =>
      import(/* webpackChunkName: "Auth" */ '@/pages/auth/SignIn'),
    props: route => ({
      email: route.query.email,
    }),
  },
  {
    path: '/sign-out',
    name: 'signOut',
    component: () =>
      import(/* webpackChunkName: "Auth" */ '@/pages/auth/SignOut'),
  },
  {
    path: '/password-forgotten',
    name: 'passwordForgotten',
    component: () =>
      import(
        /* webpackChunkName: "Password" */
        '@/pages/auth/PasswordForgotten'
      ),
  },
  {
    path: '/password-reset',
    name: 'passwordReset',
    component: () =>
      import(/* webpackChunkName: "Password" */ '@/pages/auth/PasswordReset'),
    props: route => ({
      email: route.query.email,
      code: route.query.code,
    }),
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () =>
      import(/* webpackChunkName: "Signup" */ '@/pages/auth/SignUp'),
  },
  {
    path: '/sign-up-confirm',
    name: 'signUpConfirmation',
    component: () =>
      import(
        /* webpackChunkName: "Signup" */
        '@/pages/auth/SignUpConfirmation'
      ),
    props: route => ({
      email: route.query.email,
    }),
  },
]
