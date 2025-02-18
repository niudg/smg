import Vue from 'vue'
import { publicPath, routerMode } from '@/config'
import VueRouter from 'vue-router'
import { asyncRoutes } from './async'
import { constantRoutes } from './constant'

Vue.use(VueRouter)
const router = createRouter()
function createRouter(routes = constantRoutes) {
  return new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: routes,
  })
}

function resetRouter(routes = constantRoutes) {
  routes.map((route) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children)
    }
  })
  router.matcher = createRouter(routes).matcher
}

function fatteningRoutes(routes) {
  return routes.flatMap((route) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

export default router
export { asyncRoutes, constantRoutes, resetRouter }
