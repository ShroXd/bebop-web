import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      component: () => import('../pages/Chapter/Chapter.vue')
    },
    {
      path: '/content',
      name: 'Content',
      component: () => import('../pages/Reading/NovelContent.vue')
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
    // 清除登录信息
    // 强制推入 entry

    next({ path: '/entry' })
  } else {
    // vuex 存储 userInfo

    next()
  }
})

export default router
