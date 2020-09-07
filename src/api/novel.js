import {
  axios
} from './base/api'
import qs from 'querystring'

export default {
  books (param) {
    return axios.get(`/novel/books`, param)
  },
  chapters (param) {
    return axios.get(`/novel/chapters`, param)
  },
  contents (param) {
    return axios.get(`/novel/contents`, {params: param})
  },
  addBookMark (param) {
    return axios.post('/mark/book', qs.stringify(param))
  },
  delBookMark (param) {
    return axios.delete('/mark/book', {data: qs.stringify(param)})
  },
  fetchBookMark (param) {
    return axios.get('/mark/book', param)
  },
  modifyReadingMark (param) {
    return axios.post('/mark/reading', qs.stringify(param))
  },
  fetchReadingMark (param) {
    return axios.get('/mark/reading', {params: param})
  }

}
