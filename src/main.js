// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import './assets/less/site.less'
import 'element-ui/lib/theme-chalk/index.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'

Vue.prototype.$EventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
