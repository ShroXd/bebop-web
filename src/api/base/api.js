import Axios from 'axios'

const axios = Axios.create({
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

export {
  axios
}
