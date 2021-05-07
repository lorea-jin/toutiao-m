import request from '@/utils/request'

// 用户认证（登录注册）
export function login(data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取短信验证码
export function getCode(mobile) {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// 获取用户自己信息
export function getMyInfo() {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}
