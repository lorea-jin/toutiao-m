import request from '@/utils/request'

// 获取联想建议（自动补全）
export function searchsuggestion(params) {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params
  })
}

// 获取搜索结果
export function getSearchResult(params) {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
