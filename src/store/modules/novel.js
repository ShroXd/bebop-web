// state
const state = {
  chapters: [],
  chapterIndex: '0'
}

// getters
const getters = {
  getChapters (state) {
    return state.chapters
  },
  getChapterIndex (state) {
    return state.chapterIndex
  }
}

// mutaions
const mutations = {
  setChapters (state, chapters) {
    state.chapters = chapters
  },
  setChapterIndex (state, index) {
    state.chapterIndex = index
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
