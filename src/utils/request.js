/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求发起经过这里
    // config： 本次请求的请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
    // 需要返回config配置对象，否则请求会停在这里出不去
    return config
  },
  function (error) {
    // 请求出错或没发出去 会进入这里
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
