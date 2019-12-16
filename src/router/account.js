export default [
  {
    path: '/account',
    name: 'account',
    component: () =>
      import(/* webpackChunkName: "Account" */ '@/pages/account/Account'),
  },
]
