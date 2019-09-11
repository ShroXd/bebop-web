import Axios from 'axios'

const axios = Axios.create({
  baseURL: `/api`,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

export {
  axios
}
