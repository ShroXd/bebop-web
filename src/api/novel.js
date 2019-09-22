import {
  axios
} from './base/api'

export default {
  list (param = {}) {
    return axios.get('/novel/light/list', param)
  },
  chapter (param = {}) {
    return axios.get(`/novel/${param.bookId}/chapters`, {})
  },
  content (param = {}) {
    return axios.get(`/novel/${param.bookId}/${param.chapterId}/contents`, {})
  }
}
