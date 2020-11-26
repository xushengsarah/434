import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    redirect: '/business',
    children: [
      {
        component: () => import('@/views/business/index.vue'),
        path: '/business'
      },
      {
        component: () => import('@/views/content/index'),
        path: '/run'
      },
      {
        component: () => import('@/views/cameraUserList/index.vue'),
        path: '/cameraUserList'
      },
      {
        component: () => import('@/views/netWork/index.vue'),
        path: '/netWork'
      },
      {
        component: () => import('@/views/service/index.vue'),
        path: '/service'
      },
      {
        component: () => import('@/views/service/serviceDetails.vue'),
        path: '/serDetails'
      },
      {
        component: () => import('@/views/serviceOverview/index.vue'),
        path: '/serviceOverview',
        meta: {
          keepAlive: true
        }
      },
      {
        component: () => import('@/views/serviceOverview/serverList/streamMedia.vue'),
        path: '/streamMediaDetails'
      },
      {
        component: () => import('@/views/systemTools/index.vue'),
        path: '/systemTools'
      },
      {
        component: () => import('@/views/systemTools/theme/index.vue'),
        path: '/theme'
      },
      {
        component: () => import('@/views/systemTools/user/index.vue'),
        path: '/user'
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  // 通配符
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

const origPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return origPush.call(this, location).catch(err => err)
}

// 跳转前判断是否有token
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const SessionID = window.sessionStorage.getItem('loginSessionid')
  if (!SessionID) return next('/login')
  next()
})

export default router
