import Vue from 'vue'
import Vuex from 'vuex'

import novel from './modules/novel'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    novel
  }
})

export default store
