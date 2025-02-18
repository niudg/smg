import Layout from '@/vab/layouts'
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    constant: true,
    component: () => import('@/views/login'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/registerSuccess',
    component: () => import('@/views/registerSuccess'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/logout',
    component: () => import('@/views/logout'),
    constant: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    constant: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    constant: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/503',
    name: '503',
    component: () => import('@/views/503'),
    constant: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'Root',
    constant: true,
    component: Layout,
    meta: {
      title: 'トップ',
      icon: 'home-2-fill',
      breadcrumbHidden: true,
      levelHidden: true,
      hidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        constant: true,
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: 'トップ',
          icon: 'home-2-fill',
          affix: true,
          noClosable: true,
        },
      },
    ],
  },
]
