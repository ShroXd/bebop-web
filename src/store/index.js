import Vue from 'vue'
import Vuex from 'vuex'

import novel from './modules/novel'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    novel,
    user
  }
})

export default store
