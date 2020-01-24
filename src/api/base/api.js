import Axios from 'axios'

const config = {
  baseURL: `/api`,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
}

const axios = Axios.create(config)

// 全局劫持，附带 token
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

export {
  axios
}
