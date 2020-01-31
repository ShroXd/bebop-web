import { axios } from '../base/public'

export default {
  hitokoto (param) {
    return axios.get('https://v1.hitokoto.cn/?c=b')
  }
}
