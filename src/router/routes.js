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
    meta: {
      authRequired: true,
    },
    path: '/settings',
    name: 'settings',
    component: () => lazyLoadView(import('@views/settings.vue')),
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404.vue').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/',
    alias: '/apiaries',
    name: 'home',
    component: () => lazyLoadView(import('@views/apiary-list.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/apiaries/create',
    name: 'apiary-create',
    component: () => lazyLoadView(import('@views/apiary-create.vue')),
  },
  // {
  //   meta: {
  //     authRequired: true,
  //   },
  //   path: '/apiaries/:id',
  //   name: 'apiary-details',
  //   component: () => lazyLoadView(import('@views/apiary-details.vue')),
  // },
  {
    meta: {
      authRequired: true,
    },
    path: '/apiaries/:id/edit',
    name: 'apiary-edit',
    component: () => lazyLoadView(import('@views/apiary-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/checklist/:id/edit',
    name: 'checklist',
    component: () => lazyLoadView(import('@views/checklist.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/devices',
    name: 'devices',
    component: () => lazyLoadView(import('@views/devices.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/diary',
    name: 'diary',
    component: () => lazyLoadView(import('@views/diary-list.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/export',
    name: 'export',
    component: () => lazyLoadView(import('@views/export.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/groups/create',
    name: 'group-create',
    component: () => lazyLoadView(import('@views/group-edit.vue')),
  },
  // {
  //   meta: {
  //     authRequired: true,
  //   },
  //   path: '/groups/:id',
  //   name: 'group-details',
  //   component: () => lazyLoadView(import('@views/group-details.vue')),
  // },
  {
    meta: {
      authRequired: true,
    },
    path: '/groups/:id/edit',
    name: 'group-edit',
    component: () => lazyLoadView(import('@views/group-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/groups/:id/token/:token',
    name: 'group-accept',
    component: () => lazyLoadView(import('@views/group-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/hives/create',
    name: 'hive-create',
    component: () => lazyLoadView(import('@views/hive-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/hives/:id/edit',
    name: 'hive-edit',
    component: () => lazyLoadView(import('@views/hive-edit.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/hives/:id/inspect',
    name: 'hive-inspect',
    component: () => lazyLoadView(import('@views/hive-inspect.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/hives/:id/inspections/:inspection',
    name: 'hive-inspect-edit',
    component: () => lazyLoadView(import('@views/hive-inspect.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/hives/:id/inspections/',
    name: 'hive-inspections',
    component: () => lazyLoadView(import('@views/hive-inspections.vue')),
  },
  {
    path: '/info',
    name: 'info',
    component: () => lazyLoadView(import('@views/info.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/measurements',
    name: 'measurements',
    component: () => import('@views/measurements-list.vue'), // no lazyLoadView in order to be able to use beforeDestroy hook to clearInterval for lastSensorValues API call when navigating away
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/measurements/:id',
    name: 'measurements-id',
    component: () => import('@views/measurements-list.vue'), // no lazyLoadView in order to be able to use beforeDestroy hook to clearInterval for lastSensorValues API call when navigating away
  },
  // {
  //   meta: {
  //     authRequired: true,
  //   },
  //   path: '/photos',
  //   name: 'photos',
  //   component: () => lazyLoadView(import('@views/photo-gallery.vue')),
  // },
  {
    path: '/new',
    name: 'new',
    component: () => lazyLoadView(import('@views/new.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/user-profile.vue')),
    props: () => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/research',
    name: 'research',
    component: () => lazyLoadView(import('@views/research.vue')),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/hives/:id/edit',
    name: 'queen-edit',
    component: () => lazyLoadView(import('@views/hive-edit.vue')),
  },
  {
    path: '/sensors', // old v2 path which might be saved and therefore used by users coming from v2 app
    redirect: '/devices',
  },
  {
    path: '/support',
    name: 'support',
    component: () => lazyLoadView(import('@views/support.vue')),
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
    delay: 400,
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
