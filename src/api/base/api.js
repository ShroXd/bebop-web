import Axios from 'axios'
// import router from '../../router'
import envConfig from '../../config'

const config = {
  baseURL: `${envConfig.server}`,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
}

const axios = Axios.create(config)

// 全局劫持，附带 token
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')

    if (token) {
      config.headers.common.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 拦截未登录状况
// axios.interceptors.response.use(
//   res => {
//     if (res.data.msg === '登录已过期') {
//       router.replace({
//         name: 'Entry'
//       })
//       return res
//     } else {
//       return res
//     }
//   },
//   err => {
//     console.log(err)
//   })

export {
  axios
}
