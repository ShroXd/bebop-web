import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
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
      component: () => import('../pages/List/Novel.vue')
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
