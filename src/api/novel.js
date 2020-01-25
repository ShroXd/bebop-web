import {
  axios
} from './base/api'
import qs from 'querystring'

export default {
  list (param) {
    return axios.post(`/novel/light/list`, qs.stringify(param))
  },
  book (param) {
    return axios.get(`/novel/${param.bookId}/book`, {})
  },
  chapter (param = {}) {
    return axios.get(`/novel/${param.bookId}/chapters`, {})
  },
  content (param = {}) {
    return axios.get(`/novel/${param.bookId}/${param.chapterId}/contents`, {})
  },
  addStar (param = {}) {
    return axios.post(`/novel/light/star`, qs.stringify(param))
  },
  fetchStar (param = {}) {
    return axios.get(`/novel/light/${param.userName}/star`, {})
  }
}
