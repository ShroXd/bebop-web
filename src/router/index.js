import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      // TODO 拆分主页，放入子路由
      children: [
        {
          path: '/portal',
          name: 'Portal',
          component: () => import('../pages/Portal/Portal.vue')
        }
      ]
    }
  ]
})
