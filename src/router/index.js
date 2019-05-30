import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {/* 首页配置 */
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {/* 玩家管理 */
    path: '/userList',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'UserList',
    meta: {
      title: 'userManageTable',
      icon: 'table'
    },
    children: [
      {
        path: 'list-user-table',
        component: () => import('@/views/table/userManage/userManageList'),
        name: 'list-user',
        meta: { title: 'list-user' }
      },
      {
        path: 'user-add',
        component: () => import('@/views/table/userManage/addUser'),
        name: 'user-add',
        meta: { title: 'user-add' }
      }
    ]
  },
  {/* 后台用户管理 */
    path: '/userBackList',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'UserBackList',
    meta: {
      title: 'userBackTable',
      icon: 'table'
    },
    children: [
      {
        path: 'list-user-table',
        component: () => import('@/views/table/userBack/userbackList'),
        name: 'user-back-list',
        meta: { title: 'user-back-list' }
      },
      {
        path: 'user-back-add',
        component: () => import('@/views/table/userBack/userBackAdd'),
        name: 'user-back-add',
        meta: { title: 'user-back-add' }
      }
    ]
  },
  {/* 代理商管理 */
    path: '/agentUserList',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'AgentUserList',
    meta: {
      title: 'agentUserTable',
      icon: 'table'
    },
    children: [
      {
        path: 'agent-list-table',
        component: () => import('@/views/table/agentManage/agentManageList'),
        name: 'agent-list',
        meta: { title: 'agent-list' }
      },
      {
        path: 'agent-add',
        component: () => import('@/views/table/agentManage/addAgent'),
        name: 'agent-add',
        meta: { title: 'agent-add' }
      },
      {
        path: 'agent-relation',
        component: () => import('@/views/table/agentManage/agentRelation'),
        name: 'agent-relation',
        meta: { title: 'agent-relation' }
      }
    ]
  },
  {/* 上下分管理 */
    path: '/upDownPointsTable',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'UpDownPointsTable',
    meta: {
      title: 'upDownPointsTable',
      icon: 'table'
    },
    children: [
      {
        path: 'daili-upDownPoints-table',
        component: () => import('@/views/table/upDownPoint/dailiUpDownPoint'),
        name: 'daili-upDownPoints',
        meta: { title: 'daili-upDownPoints' }
      },
      {
        path: 'player-upDownPoints',
        component: () => import('@/views/table/upDownPoint/playerUpDownPoint'),
        name: 'player-upDownPoints',
        meta: { title: 'player-upDownPoints' }
      }
    ]
  },
  {/* 金豆明细管理 */
    path: '/beanDetailTable',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'beanDetailTable',
    meta: {
      title: 'beanDetailTable',
      icon: 'table'
    },
    children: [
      {
        path: 'daili-beanDetail',
        component: () => import('@/views/table/beanDetail/dailiBeanDetailList'),
        name: 'daili-beanDetail',
        meta: { title: 'daili-beanDetail' }
      },
      {
        path: 'player-beanDetail',
        component: () => import('@/views/table/beanDetail/playerBeanDetailList'),
        name: 'player-beanDetail',
        meta: { title: 'player-beanDetail' }
      },
      {
        path: 'beanDetail',
        component: () => import('@/views/table/beanDetail/beanDetailList'),
        name: 'beanDetail',
        meta: { title: 'beanDetail' }
      }
    ]
  },
  {/* 公告管理 */
    path: '/newsTable',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'newsTable',
    meta: {
      title: 'newsTable',
      icon: 'table'
    },
    children: [
      {
        path: 'news-list',
        component: () => import('@/views/table/news/newsList'),
        name: 'news-list',
        meta: { title: 'news-list' }
      },
      {
        path: 'news-add',
        component: () => import('@/views/table/news/addNews'),
        name: 'news-add',
        meta: { title: 'news-add' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
