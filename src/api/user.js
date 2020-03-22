import { axios } from './base/api'

export default {
  fetchUserInfo () {
    return axios.get('/user/info')
  }
}
