/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

/**
 * 登录请求模块
 * @param {object} data 登录接口需要的数据，对象中包括mobile和code
 * @returns {object} 返回值是调用request方法之后返回的promise对象
 */
export const login = (data) => {
  // const res = request()
  // console.log(res) promise
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}
/**
 * 发送验证码模块 每个手机号每分钟只能发一次
 * @param {string} mobile 用户输入的手机号
 * @return 返回值是调用request方法之后返回的promise对象
 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息模块
 * @param {string} mobile
 * @return 返回值是调用request方法之后返回的promise对象
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 需要授权
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
