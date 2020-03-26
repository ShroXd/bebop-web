// state
const state = {
  chapters: [],
  chapterIndex: '0',
  bookInfo: {}
}

// getters
const getters = {
  getChapters (state) {
    return state.chapters
  },
  getChapterIndex (state) {
    return state.chapterIndex
  },
  getBookInfo (state) {
    return state.bookInfo
  }
}

// mutaions
const mutations = {
  setChapters (state, chapters) {
    state.chapters = chapters
  },
  setChapterIndex (state, index) {
    state.chapterIndex = index
  },
  setBookInfo (state, info) {
    state.bookInfo = info
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
