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
    component: () => lazyLoadView(import('@views/account-password-forgot.vue')),
    props: (route) => ({
      email: route.query.email,
    }),
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => lazyLoadView(import('@views/account-password-reset.vue')),
    props: (route) => ({
      email: route.query.email,
      code: route.query.code,
    }),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => lazyLoadView(import('@views/account-sign-up.vue')),
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
    path: '*',
    redirect: '/',
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/alerts',
    name: 'alerts',
    component: () => lazyLoadView(import('@views/alerts.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/alertrules',
    name: 'alertrules',
    component: () => lazyLoadView(import('@views/alertrules.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/alertrules/create',
    name: 'alertrule-create',
    component: () => lazyLoadView(import('@views/alertrule-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/alertrules/:id/edit',
    name: 'alertrule-edit',
    component: () => lazyLoadView(import('@views/alertrule-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/alertrules/default',
    name: 'alertrules-default',
    component: () => lazyLoadView(import('@views/alertrules-default.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/',
    alias: '/apiaries',
    name: 'home',
    component: () => lazyLoadView(import('@views/apiary-list.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/apiaries/create',
    name: 'apiary-create',
    component: () => lazyLoadView(import('@views/apiary-create.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/apiaries/:id/edit',
    name: 'apiary-edit',
    component: () => lazyLoadView(import('@views/apiary-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/apiaries/:id/management',
    name: 'apiary-management',
    component: () => lazyLoadView(import('@views/apiary-management.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/checklist/:id/edit',
    name: 'checklist',
    component: () => lazyLoadView(import('@views/checklist.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/checklists/',
    name: 'checklists',
    component: () => lazyLoadView(import('@views/checklist.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/devices',
    name: 'devices',
    component: () => lazyLoadView(import('@views/devices.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/diary',
    name: 'diary',
    component: () => lazyLoadView(import('@views/diary-list.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/export',
    name: 'export',
    component: () => lazyLoadView(import('@views/export.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/flashlog/:id',
    name: 'flashlog',
    component: () => lazyLoadView(import('@views/flashlog.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/hivetags',
    name: 'hivetags',
    component: () => lazyLoadView(import('@views/hivetags.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hivetags/create',
    name: 'hivetag-create',
    component: () => lazyLoadView(import('@views/hivetag-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hivetags/:id/create',
    name: 'hivetag-create-id',
    component: () => lazyLoadView(import('@views/hivetag-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hivetags/:id/edit',
    name: 'hivetag-edit',
    component: () => lazyLoadView(import('@views/hivetag-edit.vue')),
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
    component: () => lazyLoadView(import('@views/import.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/groups/create',
    name: 'group-create',
    component: () => lazyLoadView(import('@views/group-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/groups/:id/edit',
    name: 'group-edit',
    component: () => lazyLoadView(import('@views/group-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/groups/:id/token/:token',
    name: 'group-accept',
    component: () => lazyLoadView(import('@views/group-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/create',
    name: 'hive-create',
    component: () => lazyLoadView(import('@views/hive-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/:id/edit',
    name: 'hive-edit',
    component: () => lazyLoadView(import('@views/hive-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/:id/inspections/:inspection',
    name: 'hive-inspect-edit',
    component: () => lazyLoadView(import('@views/inspect.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/hives/:id/inspections/',
    name: 'hive-inspections',
    component: () => lazyLoadView(import('@views/hive-inspections.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/inspect',
    name: 'inspect',
    component: () => lazyLoadView(import('@views/inspect.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/measurements',
    name: 'measurements',
    component: () => import('@views/measurements-list.vue'), // no lazyLoadView in order to be able to use beforeDestroy hook to clearInterval for lastSensorValues API call when navigating away
  },
  {
    meta: {
      authRequired: true,
      depth: 0,
    },
    path: '/measurements/:id',
    name: 'measurements-id',
    component: () => import('@views/measurements-list.vue'), // no lazyLoadView in order to be able to use beforeDestroy hook to clearInterval for lastSensorValues API call when navigating away
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/new',
    name: 'new',
    component: () => lazyLoadView(import('@views/new.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/user-profile.vue')),
    props: () => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    meta: {
      authRequired: true,
      depth: 1,
    },
    path: '/research',
    name: 'research',
    component: () => lazyLoadView(import('@views/research.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/hives/:id/edit',
    name: 'queen-edit',
    component: () => lazyLoadView(import('@views/hive-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
      depth: 2,
    },
    path: '/translations',
    name: 'translations',
    component: () => lazyLoadView(import('@views/translations.vue')),
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading.vue').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    // Set to 1000 in order to only show this in case of network issues
    delay: 1000,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout.vue').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 5000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
