import store from '@state/store'

export default [
  {
    path: '/sign-in',
    component: () => lazyLoadView(import('@views/sign-in.vue')),
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
    path: '/sign-out',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logout')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { path: '/' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/password-forgot',
    component: () => import('@views/password-forgot.vue'),
  },
  {
    path: '/password-reset',
    component: () => import('@views/password-reset.vue'),
    props: (route) => ({
      email: route.query.email,
      code: route.query.code,
    }),
  },
  {
    path: '/sign-up',
    component: () => import('@views/sign-up.vue'),
  },
  {
    path: '/sign-up-confirm',
    component: () => import('@views/sign-up-confirm.vue'),
    props: (route) => ({
      email: route.query.email,
    }),
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
    path: '/diary',
    name: 'diary',
    component: () => import('@views/event-list.vue'),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/data',
    name: 'data',
    component: () => import('@views/data-outline.vue'),
  },
  {
    meta: {
      authRequired: true,
    },
    path: '/photos',
    name: 'photos',
    component: () => import('@views/photo-gallery.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/user-profile.vue')),
    meta: {
      authRequired: true,
    },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/profile/:username',
    component: () => lazyLoadView(import('@views/user-profile.vue')),
    meta: {
      authRequired: true,
      // HACK: In order to share data between the `beforeResolve` hook
      // and the `props` function, we must create an object for temporary
      // data only used during route resolution.
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        store
          // FIXME: get the user's info from the api/login endpoint
          .dispatch('auth/authenticate', { username: routeTo.params.username })
          .then((user) => {
            // Add the user to `meta.tmp`, so that it can
            // be provided as a prop.
            routeTo.meta.tmp.user = user
            // Continue to the route.
            next()
          })
          .catch(() => {
            // If a user with the provided username could not be
            // found, redirect to the 404 page.
            next({ name: '404', params: { resource: 'User' } })
          })
      },
    },
    // Set the user from the route params, once it's set in the
    // beforeResolve route guard.
    props: (route) => ({ user: route.meta.tmp.user }),
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
    timeout: 10000,
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
