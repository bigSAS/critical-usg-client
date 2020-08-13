const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index') },
      {
        path: 'admin/', component: () => import('pages/Admin.vue'),
        children: [
          { path: 'docs-admin/', component: () => import('pages/DocsAdmin.vue') },
          { path: 'docs-admin/new-doc', component: () => import('pages/DocsAdminNewDoc.vue') },
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
