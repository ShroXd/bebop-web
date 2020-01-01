import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Entry',
    component: () => import('../pages/Entry/Entry.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../pages/Base/Main.vue'),
    // 路由元信息，检查登录态
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/novel',
      name: 'Novel',
      component: () => import('../pages/List/Novel.vue')
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
