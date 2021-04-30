const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Login.vue'),
        meta: {
          rule: 'isUnauthenticated'
        }
      }
    ]
  },
  {
    path: '/index',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          rule: 'isAuthenticated'
        }
      }
    ]
  },
  {
    path: '/Editar',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '',
        component: () => import('components/FormUser.vue'),
        meta: {
          rule: 'isAuthenticated'
        }
      }
    ]
  }
]
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
