import {
  axios
} from './base/api'
import qs from 'querystring'

export default {
  books (param) {
    return axios.post(`/novel/books`, qs.stringify(param))
  },
  chapters (param) {
    return axios.post(`/novel/chapters`, qs.stringify(param))
  },
  contents (param) {
    return axios.post(`/novel/contents`, qs.stringify(param))
  },
  addBookMark (param) {
    return axios.post('/mark/book/add', qs.stringify(param))
  },
  delBookMark (param) {
    return axios.post('/mark/book/del', qs.stringify(param))
  },
  fetchBookMark (param = {}) {
    return axios.post('/mark/book/fetch', qs.stringify(param))
  },
  modifyReadingMark (param) {
    return axios.post('/mark/reading/modify', qs.stringify(param))
  },
  fetchReadingMark (param = {}) {
    return axios.post('/mark/reading/fetch', qs.stringify(param))
  }

}
