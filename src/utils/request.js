import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})

request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(config => {
  return config.data
})

export default request
