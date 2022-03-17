import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/equ-control/index'
  },

  {
    path: '/equ-control',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'EquControl',
        component: () => import('@/views/equ-control/index'),
        meta: { title: '设备控制管理', icon: 'form' }
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/equ-control/detail'),
        meta: { title: '设备详情' },
        hidden: true
      }
    ]
  },

  {
    path: '/cwb-control',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CwbControl',
        component: () => import('@/views/cwb-control/index'),
        meta: { title: '船坞泵设备管理', icon: 'form' }
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/cwb-control/detail'),
        meta: { title: '船坞泵设备详情' },
        hidden: true
      }
    ]
  },

  {
    path: '/plans',
    component: Layout,
    name: '计划管理',
    redirect: '/plans/index',
    meta: { title: '计划管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/plans/index'),
        meta: { title: '计划管理', icon: 'form' }
      },
      {
        path: 'kpi',
        component: () => import('@/views/kpi/index'),
        meta: { title: '工单人效', icon: 'form' }
      }
    ]
  },

  {
    path: '/overall',
    component: Layout,
    name: '统筹管理',
    redirect: '/overall/shop',
    meta: { title: '统筹管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'shop',
        component: () => import('@/views/overall/shop'),
        meta: { title: '船厂项目管理', icon: 'form' }
      },
      {
        path: 'code',
        component: () => import('@/views/overall/code'),
        meta: { title: '分类编码库', icon: 'form' }
      }
    ]
  },

  {
    path: '/data',
    component: Layout,
    name: '数据应用',
    redirect: '/data/consume',
    meta: { title: '数据应用', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'consume',
        component: () => import('@/views/data/consume'),
        meta: { title: '能耗结算报表', icon: 'form' }
      }
    ]
  },

  {
    path: '/decide',
    component: Layout,
    name: '辅助决策系统',
    redirect: '/decide/quality',
    meta: { title: '辅助决策系统', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'quality',
        component: () => import('@/views/decide/quality'),
        meta: { title: '质量风险辅助决策', icon: 'form' }
      },
      {
        path: 'safety',
        component: () => import('@/views/decide/safety'),
        meta: { title: '安全辅助决策', icon: 'form' }
      },
      {
        path: 'price',
        component: () => import('@/views/decide/price'),
        meta: { title: '成本辅助决策', icon: 'form' }
      }
    ]
  },

  {
    path: '/qz-control',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'QzControl',
        component: () => import('@/views/qz-control/index'),
        meta: { title: '起重设备管理', icon: 'form' }
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/qz-control/detail'),
        meta: { title: '起重设备详情' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
