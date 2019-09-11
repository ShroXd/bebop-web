import {
  axios
} from './base/api'
import qs from 'querystring'

export default {
  login (param) {
    return axios.get('/login', param)
  },
  register (param) {
    return axios.post('/register', qs.stringify(param))
  }
}
