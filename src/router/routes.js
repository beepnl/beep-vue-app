import store from '@state/store'

export default [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@views/account-sign-in.vue'),
    props: (route) => ({
      msg: route.query.msg,
      email: route.query.email,
    }),
    meta: {
      depth: 1,
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ path: '/' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/password-forgot',
    name: 'password-forgot',
    component: () => import('@views/account-password-forgot.vue'),
    props: (route) => ({
      email: route.query.email,
    }),
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('@views/account-password-reset.vue'),
    props: (route) => ({
      email: route.query.email,
      code: route.query.code,
    }),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@views/account-sign-up.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@views/_404.vue'),
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to home. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/alerts',
    name: 'alerts',
    component: () => import('@/src/router/views/alert-list.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/alertrules',
    name: 'alertrules',
    component: () => import('@/src/router/views/alertrule-list.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/alertrules/create',
    name: 'alertrule-create',
    component: () => import('@views/alertrule-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/alertrules/:id/edit',
    name: 'alertrule-edit',
    component: () => import('@views/alertrule-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/alertrules/default',
    name: 'alertrules-default',
    component: () => import('@views/alertrules-default.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/',
    alias: '/apiaries',
    name: 'home',
    component: () => import('@views/apiary-list.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/apiaries/create',
    name: 'apiary-create',
    component: () => import('@views/apiary-create.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/apiaries/:id/edit',
    name: 'apiary-edit',
    component: () => import('@views/apiary-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/apiaries/:id/management',
    name: 'apiary-management',
    component: () => import('@views/apiary-management.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/checklist/:id/edit',
    name: 'checklist',
    component: () => import('@/src/router/views/checklist-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/checklists/',
    name: 'checklists',
    component: () => import('@/src/router/views/checklist-edit.vue'),
  },
  // {
  //   meta: {
  //     authRequired: true,
  //     depth: 1,
  //   },
  //   path: '/dashboard/:id',
  //   name: 'dashboard',
  //   component: () => import('@views/dashboard.vue'),
  // },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/dashboards/',
    name: 'dashboards',
    component: () => import('@/src/router/views/dashboard-list.vue'),
  },
  // {
  //   path: '/dashboard/sign-in',
  //   name: 'dashboard-sign-in',
  //   component: () => import('@views/dashboard-sign-in.vue'),
  // },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/dashboards/create',
    name: 'dashboard-create',
    component: () => import('@views/dashboard-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/dashboards/:id/edit',
    name: 'dashboard-edit',
    component: () => import('@views/dashboard-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/devices',
    name: 'devices',
    component: () => import('@/src/router/views/device-list.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/diary',
    name: 'diary',
    component: () => import('@views/diary-list.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/export',
    name: 'export',
    component: () => import('@/src/router/views/export-data.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/flashlog/:id',
    name: 'flashlog',
    component: () => import('@/src/router/views/flashlog-data.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/hivetags',
    name: 'hivetags',
    component: () => import('@/src/router/views/hivetag-list.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hivetags/create',
    name: 'hivetag-create',
    component: () => import('@views/hivetag-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hivetags/:id/create',
    name: 'hivetag-create-id',
    component: () => import('@views/hivetag-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hivetags/:id/edit',
    name: 'hivetag-edit',
    component: () => import('@views/hivetag-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/import',
    name: 'import',
    props: (route) => ({
      importMessage: route.params.importMessage,
    }),
    component: () => import('@/src/router/views/import-flashlogs.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/groups/create',
    name: 'group-create',
    component: () => import('@views/group-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/groups/:id/edit',
    name: 'group-edit',
    component: () => import('@views/group-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/groups/:id/token/:token',
    name: 'group-accept',
    component: () => import('@views/group-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/create',
    name: 'hive-create',
    component: () => import('@views/hive-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/:id/edit',
    name: 'hive-edit',
    component: () => import('@views/hive-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/:id/inspections/:inspection',
    name: 'hive-inspect-edit',
    component: () => import('@/src/router/views/inspection-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/hives/:id/inspections/',
    name: 'hive-inspections',
    component: () => import('@views/hive-inspections.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/inspect',
    name: 'inspect',
    component: () => import('@/src/router/views/inspection-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/measurements',
    name: 'measurements',
    component: () => import('@views/measurements-list.vue'), // no lazyLoadView in order to be able to use beforeUnmount hook to clearInterval for lastSensorValues API call when navigating away
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/measurements/:id',
    name: 'measurements-id',
    component: () => import('@views/measurements-list.vue'), // no lazyLoadView in order to be able to use beforeUnmount hook to clearInterval for lastSensorValues API call when navigating away
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/new',
    name: 'new',
    component: () => import('@/src/router/views/new-changelog.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@views/user-profile.vue'),
    props: () => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/research',
    name: 'research',
    component: () => import('@/src/router/views/research-consent.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/:id/edit',
    name: 'queen-edit',
    component: () => import('@views/hive-edit.vue'),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/translations',
    name: 'translations',
    component: () => import('@/src/router/views/translation-list.vue'),
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
// TODO-VUE3 fix/enable??
// function lazyLoadView(AsyncView) {
//   const AsyncHandler = () => ({
//     component: AsyncView,
//     // A component to use while the component is loading.
//     loading: () => import('@views/_loading.vue').default,
//     // Delay before showing the loading component.
//     // Default: 200 (milliseconds).
//     // Set to 1000 in order to only show this in case of network issues
//     delay: 1000,
//     // A fallback component in case the timeout is exceeded
//     // when loading the component.
//     error: () => import('@views/_timeout.vue').default,
//     // Time before giving up trying to load the component.
//     // Default: Infinity (milliseconds).
//     timeout: 5000,
//   })

//   return Promise.resolve({
//     functional: true,
//     render(h, { data, children }) {
//       // Transparently pass any props or children
//       // to the view component.
//       return h(AsyncHandler, data, children)
//     },
//   })
// }
