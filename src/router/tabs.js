export default [{
    path: '/apiaries',
    name: 'apiaries',
    component: () =>
      import( /* webpackChunkName: "Apiaries" */ '@/pages/apiary/ApiaryList'),
  },
  {
    path: '/logbook',
    name: 'logbook',
    component: () =>
      import( /* webpackChunkName: "Logbook" */ '@/pages/Logbook'),
  },
  {
    path: '/sensors',
    name: 'sensors',
    component: () =>
      import( /* webpackChunkName: "Sensors" */ '@/pages/Sensors'),
  },
  {
    path: '/photos',
    name: 'photos',
    component: () => import( /* webpackChunkName: "Photos" */ '@/pages/Photos'),
  },
]