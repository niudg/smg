import cache from '@/utils/cache'
import dataGet from '@/utils/dataGet'
import _ from 'lodash'

/**
 * ローカルまたリモートサーバからデータを取得する
 * @param {*} model
 * @returns
 */
export async function getData(model = {}) {
  let value = []
  let key = model.key
  let requestParam = model.requestParam
  let dataType = model.dataType
  let method = model.method || 'post'
  let dg = new dataGet(key, dataType, requestParam, method)
  let cacheKey = model.cacheKey ? key + '-' + model.cacheKey : key
  //localの場合
  if (dataType == 'local') {
    return await dg.getData()
  }
  if (model.enableCache) {
    value = cache.session.getJSON(cacheKey)
  }
  if (!value || value.length == 0) {
    const res = await dg.getData()
    if (_.isArray(res)) {
      value = res
    } else {
      if (_.has(res, 'list')) {
        value = res.list
      } else {
        value = res
      }
    }
    if (value) {
      if (model.enableCache) {
        cache.session.setJSON(cacheKey, value)
      }
    }
  }
  return value
}
