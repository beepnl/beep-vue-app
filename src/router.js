import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
    },
  ],
})
