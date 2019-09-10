import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Entry',
    component: resolve => require(['../pages/Entry/Entry.vue'], resolve)
  }]
})
