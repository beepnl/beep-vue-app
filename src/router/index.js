import Vue from 'vue'
import VueRouter from 'vue-router'
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta'
// Adds a loading bar at the top during page loads.
// import NProgress from 'nprogress/nprogress'
import store from '@state/store'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
})

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  // https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // If this isn't an initial page load...
  // if (routeFrom.name !== null) {
  //   // Start the route progress bar.
  //   NProgress.start()
  // }

  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  if (store.getters['auth/loggedIn']) {
    // If the user is logged in, continue
    next()
  } else if (
    store.getters['auth/apiToken'] &&
    !store.getters['auth/loggedIn']
  ) {
    // If the user is empty but api token is present in local storage (f.e. after hard refresh), first validate user.
    store.dispatch('auth/validateUser').then(() => {
      next()
    })
  } else {
    // If the user is NOT currently logged in and no api token is present redirect to login.
    redirectToLogin()
  }

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ path: 'sign-in', query: { redirectFrom: routeTo.fullPath } })
  }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              // if (routeFrom.name === args[0].name) {
              //   // Complete the animation of the route progress bar.
              //   NProgress.done()
              // }
              // Complete the redirect.
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve()
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

// When each route is finished evaluating...
// router.afterEach((routeTo, routeFrom) => {
//   // Complete the animation of the route progress bar.
//   NProgress.done()
// })

// When each route is finished evaluating store previous route name
router.afterEach((routeTo, routeFrom) => {
  localStorage.beepPreviousRoute = routeFrom.name
  localStorage.beepPreviousQueryHiveIndex = routeFrom.query.hive_index
  // if navigating away from home / one of the other home tabs, remember it in order to return when back button is hit in a page with depth 1
  if (routeFrom.meta.depth === 0) {
    localStorage.beepPreviousTab = routeFrom.name
  }
})

export default router
