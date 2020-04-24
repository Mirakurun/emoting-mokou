const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      {
        name: 'admin',
        path: '/admin',
        component: () => import('pages/Admin.vue'),
      },
      {
        name: 'emote',
        path: '/emotes/:id',
        component: () => import('pages/Emote.vue'),
        children: [
          {
            name: 'emote-home',
            path: '',
            component: () => import('pages/EmoteHome.vue'),
          },
          {
            name: 'edit',
            path: 'edit',
            component: () => import('pages/EmoteEdit.vue'),
          },
        ],
      },
      {
        name: 'favorites',
        path: '/favorites',
        component: () => import('pages/Favorites.vue'),
      },
      {
        name: 'search',
        path: '/search',
        component: () => import('pages/Search.vue'),
        props: route => ({ query: route.query.query }),
      },
      {
        name: 'upload',
        path: '/upload',
        component: () => import('pages/Upload.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
