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
          { path: 'img-admin/', component: () => import('pages/ImgAdmin') },
          { path: 'docs-admin/new-doc', component: () => import('pages/DocsAdminNewDoc') },
          { path: 'docs-admin/edit-doc', component: () => import('pages/DocsAdminEditDoc') },
          { path: 'docs-admin/delete-doc', component: () => import('pages/DocsAdminDeleteDoc') },
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
