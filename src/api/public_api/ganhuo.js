import { axios } from '../base/public'

export default {
  gankWeb (param) {
    return axios.get(`http://gank.io/api/data/${param.classify}/${param.num}/${param.page}`)
  },

  xianduMain (param) {
    return axios.get(`http://gank.io/api/xiandu/categories`)
  },

  xianduChild (param) {
    return axios.get(`http://gank.io/api/xiandu/category/${param.item}`)
  },

  xiandu (param) {
    return axios.get(`http://gank.io/api/xiandu/data/id/${param.class}/count/${param.num}/page/${param.page}`)
  }
}
