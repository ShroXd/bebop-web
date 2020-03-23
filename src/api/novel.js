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
  addStar (param = {}) {
    return axios.post(`/novel/light/star`, qs.stringify(param))
  },
  fetchStar (param = {}) {
    return axios.get(`/novel/light/${param.userName}/star`, {})
  }
}
