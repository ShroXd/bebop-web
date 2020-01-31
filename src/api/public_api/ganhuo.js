import { axios } from '../base/public'

export default {
  gankWeb (param) {
    return axios.get(`http://gank.io/api/data/${param.classify}/${param.num}/${param.page}`)
  }
}
