import request from '@/utils/request'
import datasource from '@/vab/constants/datasource'

class dataGet {
  constructor(apiUrl, dataType, requestParam, method) {
    this.apiUrl = apiUrl
    this.dataType = dataType
    this.requestParam = requestParam
    this.method = method
  }
  async getData() {
    if (this.dataType == 'local') {
      return new Promise((resolve) => {
        resolve(datasource[this.apiUrl])
      })
    } else {
      var paramsObj = {
        url: this.apiUrl,
        method: this.method,
      }
      if (this.method == 'get') {
        paramsObj.params = this.requestParam
      } else {
        paramsObj.data = this.requestParam
      }
      return await request(paramsObj)
    }
  }
}

export default dataGet
