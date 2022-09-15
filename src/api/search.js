import request from '@/utils/request'
/**
 *  搜索建议
 * @param {*} q  搜索关键词
 * @returns promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
