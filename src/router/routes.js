const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index') },
      { path: 'docs', component: () => import('pages/Docs') },
      { path: 'docs/:docSlug', component: () => import('pages/DocDetails'), props: true },
      {
        path: 'admin/', component: () => import('pages/Admin'),
        children: [
          { path: 'docs-admin/', component: () => import('pages/DocsAdmin') },
          { path: 'docs-admin/new-doc', component: () => import('pages/DocsAdminNewDoc') },
        ]
      },

      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
