import request from '@/utils/request'
/**
 * 获取文章
 * @param {string|number} id
 * @param {Number} timestamp
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
