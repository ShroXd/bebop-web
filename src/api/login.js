import {
  axios
} from './base/api'
import qs from 'querystring'

export default {
  login (param) {
    return axios.post('/auth/login', qs.stringify(param))
  },
  register (param) {
    return axios.post('/auth/register', qs.stringify(param))
  }
}
