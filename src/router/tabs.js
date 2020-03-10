export default [
  {
    path: '/apiaries',
    name: 'apiaries',
    component: () =>
      import(/* webpackChunkName: "Apiaries" */ '@pages/apiaries/ApiaryList'),
  },
  {
    path: '/diary',
    name: 'diary',
    component: () =>
      import(
        /* webpackChunkName: "Diary" */
        '@pages/diary/EventList'
      ),
  },
  {
    path: '/data',
    name: 'data',
    component: () =>
      import(/* webpackChunkName: "Data" */ '@pages/data/Outline'),
  },
  {
    path: '/photos',
    name: 'photos',
    component: () =>
      import(/* webpackChunkName: "Photos" */ '@pages/photos/PhotoGallery'),
  },
]
