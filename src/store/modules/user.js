const state = {
  userInfo: {}
}

const getters = {
  getUserInfo (state) {
    return state.userInfo
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
