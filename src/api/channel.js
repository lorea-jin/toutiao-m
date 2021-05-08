import request from '@/utils/request'

// 获取用户频道列表
export function getChannels() {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// 全部频道列表
export function getAllChannels() {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 批量修改用户频道列表（部分覆盖）-添加用户频道
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除用户频道
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
