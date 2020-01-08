export default [
  {
    path: '/apiaries',
    name: 'apiaries',
    component: () =>
      import(/* webpackChunkName: "Apiaries" */ '@/pages/apiaries/ApiaryList'),
  },
  {
    path: '/plan',
    name: 'plan',
    component: () =>
      import(
        /* webpackChunkName: "Planning" */
        '@/pages/plan/EventList'
      ),
  },
  {
    path: '/log',
    name: 'log',
    component: () => import(/* webpackChunkName: "" */ '@/pages/log/Outline'),
  },
  {
    path: '/photos',
    name: 'photos',
    component: () =>
      import(/* webpackChunkName: "Photos" */ '@/pages/photos/PhotoGallery'),
  },
]
