import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/pageTitle'
import { toLoginRoute } from '@/utils/routes'
import { authentication, routesWhiteList } from '@/config'

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})

const redirectUrl = async (next, to) => {
  if (!sessionStorage.getItem('redirectUri')) {
    sessionStorage.setItem('redirectUri', to.fullPath)
  }
  next(toLoginRoute(to.fullPath))
}

router.beforeEach(async (to, from, next) => {
  const { showProgressBar } = store.getters['settings/theme']
  if (showProgressBar) VabProgress.start()
  const hasToken = store.getters['user/token']

  if (hasToken) {
    if (store.getters['routes/routes'].length) {
      if (to.path === '/login') {
        next({ path: '/' })
        if (showProgressBar) VabProgress.done()
      } else next()
    } else {
      try {
        let mode = authentication
        await store.dispatch('user/getUserInfo')
        await store.dispatch('routes/setRoutes', mode)
        const redirectUri = sessionStorage.getItem('redirectUri')
        if (redirectUri) {
          next({ path: redirectUri, replace: true })
        } else {
          next({ ...to, replace: true })
        }
        sessionStorage.removeItem('redirectUri')
      } catch (err) {
        console.info(err)
        await store.dispatch('user/resetAll')
      }
    }
  } else {
    if (routesWhiteList.includes(to.path)) {
      next()
    } else {
      redirectUrl(next, to)
    }
  }
})
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
  if (VabProgress.status) VabProgress.done()
})
