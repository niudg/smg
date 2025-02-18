const sessionCache = {
  set(key, value) {
    if (!sessionStorage) {
      return
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value)
    }
  },
  get(key) {
    if (!sessionStorage) {
      return null
    }
    if (key == null) {
      return null
    }
    return sessionStorage.getItem(key)
  },
  setJSON(key, jsonValue) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },
  getJSON(key) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
  },
  remove(key) {
    sessionStorage.removeItem(key)
  },
}
const localCache = {
  set(key, value) {
    if (!localStorage) {
      return
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value)
    }
  },
  get(key) {
    if (!localStorage) {
      return null
    }
    if (key == null) {
      return null
    }
    return this.getItem(key)
  },
  setJSON(key, jsonValue) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },
  getJSON(key) {
    return this.get(key)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  // キャッシュが存在するかどうかを確認する
  has(key) {
    return localStorage.getItem(key) ? true : false
  },
  setItem(params) {
    let obj = {
      name: '',
      value: '',
      expires: '',
      startTime: new Date().getTime(),
    }
    let options = {}
    //objをマージしてparamsに渡す
    Object.assign(options, obj, params)
    if (options.expires) {
      //options.expires が設定されている場合は、options.name をキーに、options を値に設定します。
      localStorage.setItem(options.name, JSON.stringify(options))
    } else {
      //options.expires が設定されていない場合は、値の型を判断します
      //let type = Object.prototype.toString.call(options.value)
      //値がオブジェクトまたは配列オブジェクトの型である場合は、JSON.stringify を使用して変換してから、
      if (Object.prototype.toString.call(options.value) == '[object Object]') {
        options.value = JSON.stringify(options.value)
      }
      if (Object.prototype.toString.call(options.value) == '[object Array]') {
        options.value = JSON.stringify(options.value)
      }
      localStorage.setItem(options.name, options.value)
    }
  },

  getItem(name) {
    let item = localStorage.getItem(name)
    //アイテムが存在するかどうかを判断する
    if (item) {
      // まず、取得したオブジェクトが object オブジェクト形式に変換できることを確認します。変換できない場合は、json 文字列の形式ではないことを意味します
      try {
        item = JSON.parse(item)
      } catch (error) {
        return item
      }
      // expires の値がある場合は、有効期限が設定されていることを意味します。
      if (item.expires) {
        // 現在の時刻を取得する
        let now = new Date().getTime()
        // 現在時刻と保存された時刻を比べて、
        if (now - item.startTime > item.expires) {
          localStorage.removeItem(name)
          return null
        } else {
          //キャッシュの有効期限が切れていない、戻り値
          return item.value
        }
      } else {
        // 有効期限は設定されておらず、値が直接返されます
        return item
      }
    } else {
      return null // アイテムの値がNULLの場合、ストレージがないことを意味し、false を返します。
    }
  },
}

export default {
  /**
   * セッションレベルのキャッシング
   */
  session: sessionCache,
  /**
   * ローカル キャッシュ
   */
  local: localCache,
}
