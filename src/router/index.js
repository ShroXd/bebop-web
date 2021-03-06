import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '*',
    redirect: '/'
  },
  {
    path: '/entry',
    name: 'Entry',
    component: () => import('../pages/Entry/Entry.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('../pages/Base/Main.vue'),
    // 路由元信息，检查登录态
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/',
      name: 'Novel',
      component: () => import('../pages/Home/Index.vue')
    },
    {
      path: '/chapter',
      name: 'Chapter',
      component: () => import('../pages/Novel/Chapter/Chapter.vue')
    },
    {
      path: '/content',
      name: 'Content',
      component: () => import('../pages/Novel/Reading/Reading.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../pages/User/User.vue')
    }
    ]
  }
  ]
})

router.beforeEach((to, from, next) => {
  // 防止无限循环
  if (to.path === '/entry') {
    return next()
  }

  const token = localStorage.getItem('token')
  if (!token) {
    next({ path: '/entry' })
  } else {
    next()
  }
})

export default router
