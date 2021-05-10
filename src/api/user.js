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

/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
