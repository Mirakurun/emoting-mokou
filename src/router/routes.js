const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      {
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
        name: 'privacy-policy',
        path: '/privacy-policy',
        component: () => import('pages/PrivacyPolicy.vue'),
      },
      {
        name: 'search',
        path: '/search',
        component: () => import('pages/Search.vue'),
        props: route => ({ query: route.query.query }),
      },
      {
        name: 'terms-of-serivce',
        path: '/terms-of-service',
        component: () => import('pages/TermsOfService.vue'),
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
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
