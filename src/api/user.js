// 用户相关请求模块
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}
/**
 * 发送验证码
 * 每个手机号每分钟只能发一次
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
