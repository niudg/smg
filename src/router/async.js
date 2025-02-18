import Layout from '@/vab/layouts'

export const asyncRoutes = [
  {
    path: 'service',
    name: 'service',
    component: Layout,
    meta: {
      title: 'サ-ビス管理',
      breadcrumbHidden: true,
      icon: 'international',
    },
    children: [
      {
        path: '/MservicePage',
        name: 'MservicePage',
        meta: {
          title: 'サ-ビスマスタ',
        },
        component: () => import('@/views/MservicePage'),
      },
      {
        path: '/MservicechargePage',
        name: 'MservicechargePage',
        meta: {
          title: 'サービス料金マスタ',
        },
        component: () => import('@/views/MservicechargePage'),
      },
    ],
  },

  {
    path: 'contract',
    name: 'contract',
    component: Layout,
    meta: {
      title: '契約管理',
      breadcrumbHidden: true,
      icon: 'table',
    },
    children: [
      {
        path: '/McontractPage',
        name: 'McontractPage',
        meta: {
          title: '契約管理',
        },
        component: () => import('@/views/McontractPage'),
      },
    ],
  },

  {
    path: 'user',
    name: 'user',
    component: Layout,
    meta: {
      title: 'ユーザー管理',
      breadcrumbHidden: true,
      icon: 'people',
    },
    children: [
      {
        path: '/AppUserPage',
        name: 'AppUserPage',
        meta: {
          title: 'ユーザー',
          icon: 'button',
        },
        component: () => import('@/views/AppUserPage'),
      },
      {
        path: '/RolePage',
        name: 'RolePage',
        meta: {
          title: 'ロール',
        },
        component: () => import('@/views/RolePage'),
      },
      {
        path: '/UserRolePage',
        name: 'UserRolePage',
        meta: {
          title: 'ユーザーロール',
        },
        component: () => import('@/views/UserRolePage'),
      },
    ],
  },

  {
    path: 'datasource',
    name: 'datasource',
    component: Layout,
    meta: {
      title: 'データソース管理',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: '/MdatasourcePage',
        name: 'MdatasourcePage',
        meta: {
          title: 'データソース',
        },
        component: () => import('@/views/MdatasourcePage'),
      },
      {
        path: '/McachePage',
        name: 'McachePage',
        meta: {
          title: 'キャッシュマスタ',
        },
        component: () => import('@/views/McachePage'),
      },
    ],
  },

  {
    path: 'customer',
    name: 'customer',
    component: Layout,
    meta: {
      title: '取引先管理',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: '/McustomerPage',
        name: 'McustomerPage',
        meta: {
          title: '取引先マスタ',
        },
        component: () => import('@/views/McustomerPage'),
      },
    ],
  },

  {
    path: 'hiddenPageGroup',
    name: 'hiddenPageGroup',
    component: Layout,
    meta: {
      title: '',
      hidden: true,
      breadcrumbHidden: true,
    },
    children: [
      {
        path: '/AppUserCreate',
        name: 'AppUserCreate',
        meta: {
          title: 'ユーザー新增',
          hidden: true,
        },
        component: () => import('@/views/AppUserCreate'),
      },
      {
        path: '/AppUserUpdate',
        name: 'AppUserUpdate',
        meta: {
          title: 'ユーザー 変更 ',
          hidden: true,
        },
        component: () => import('@/views/AppUserUpdate'),
      },
      {
        path: '/MdatasourceCreate',
        name: 'MdatasourceCreate',
        meta: {
          title: 'データソース 新規 ',
          hidden: true,
        },
        component: () => import('@/views/MdatasourceCreate'),
      },
      {
        path: '/MdatasourceUpdate',
        name: 'MdatasourceUpdate',
        meta: {
          title: 'データソース変更',
          hidden: true,
        },
        component: () => import('@/views/MdatasourceUpdate'),
      },
      {
        path: '/RoleCreate',
        name: 'RoleCreate',
        meta: {
          title: 'ロール新增',
          hidden: true,
        },
        component: () => import('@/views/RoleCreate'),
      },
      {
        path: '/RoleUpdate',
        name: 'RoleUpdate',
        meta: {
          title: 'ロール変更',
          hidden: true,
        },
        component: () => import('@/views/RoleUpdate'),
      },
      {
        path: '/UserRoleCreate',
        name: 'UserRoleCreate',
        meta: {
          title: 'ユーザーロール新增',
          hidden: true,
        },
        component: () => import('@/views/UserRoleCreate'),
      },
      {
        path: '/UserRoleUpdate',
        name: 'UserRoleUpdate',
        meta: {
          title: 'ユーザーロール变更',
          hidden: true,
        },
        component: () => import('@/views/UserRoleUpdate'),
      },
      {
        path: '/McacheCreate',
        name: 'McacheCreate',
        meta: {
          title: 'キャッシュマスタ新规',
          hidden: true,
        },
        component: () => import('@/views/McacheCreate'),
      },
      {
        path: '/McacheUpdate',
        name: 'McacheUpdate',
        meta: {
          title: 'キャッシュマスタ变更',
          hidden: true,
        },
        component: () => import('@/views/McacheUpdate'),
      },
      {
        path: '/MserviceCreate',
        name: 'MserviceCreate',
        meta: {
          title: 'サ-ビスマスタ新增',
          hidden: true,
        },
        component: () => import('@/views/MserviceCreate'),
      },
      {
        path: '/MserviceUpdate',
        name: 'MserviceUpdate',
        meta: {
          title: 'サ-ビスマスタ变更',
          hidden: true,
        },
        component: () => import('@/views/MserviceUpdate'),
      },
      {
        path: '/MservicechargeCreate',
        name: 'MservicechargeCreate',
        meta: {
          title: 'サービス料金マスタ新增',
          hidden: true,
        },
        component: () => import('@/views/MservicechargeCreate'),
      },
      {
        path: '/MservicechargeUpdate',
        name: 'MservicechargeUpdate',
        meta: {
          title: 'サービス料金マスタ变更',
          hidden: true,
        },
        component: () => import('@/views/MservicechargeUpdate'),
      },
      {
        path: '/McustomerCreate',
        name: 'McustomerCreate',
        meta: {
          title: '取引先マスタ新规',
          hidden: true,
        },
        component: () => import('@/views/McustomerCreate'),
      },
      {
        path: '/McustomerUpdate',
        name: 'McustomerUpdate',
        meta: {
          title: '取引先マスタ变更',
          hidden: true,
        },
        component: () => import('@/views/McustomerUpdate'),
      },
      {
        path: '/McontractCreate',
        name: 'McontractCreate',
        meta: {
          title: '契約管理新规',
          hidden: true,
        },
        component: () => import('@/views/McontractCreate'),
      },
      {
        path: '/McontractUpdate',
        name: 'McontractUpdate',
        meta: {
          title: '契約管理变更',
          hidden: true,
        },
        component: () => import('@/views/McontractUpdate'),
      },
    ],
  },
]
