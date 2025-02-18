let dayjs = require('dayjs')

export function timeChange(value) {
  if (!value) return ''
  let arr = value.toString().split('')
  if (arr.length < 4) {
    return `0${arr[0]}:${arr[1]}${arr[2]}`
  } else {
    return `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`
  }
}

export function dateChange(value) {
  if (!value) return ''
  const str = value.toString()
  return `${str.slice(0, 4)}/${str.slice(4, 6)}`
}

// 時間フォーマットの変換
export function convertTimeStr(dateStr) {
  if (dateStr) {
    return dateStr.slice(0, 5)
  } else {
    return null
  }
}

// 時間フォーマットの変換
export function updateTimeStr(dateStr) {
  if (!dateStr) return
  return dayjs(dateStr).format('YYYY/MM')
}
