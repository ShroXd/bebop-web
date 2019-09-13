import {
  axios
} from './base/api'

export default {
  list (param = {}) {
    return axios.get('/novel/light/list', param)
  }
}
