import request from '@/utils/request'

// 频道新闻推荐_V1.1  (用于获取推荐下面的文章列表)
export function getArticle(params) {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}
