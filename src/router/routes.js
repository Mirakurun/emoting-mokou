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
        name: 'favorites',
        path: '/favorites',
        component: () => import('pages/Favorites.vue'),
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
