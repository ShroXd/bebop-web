import {
  axios
} from './base/api'

export default {
  login (param) {
    return axios.get('/login', param)
  }
}
