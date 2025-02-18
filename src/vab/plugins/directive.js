import { nodeEnv } from '@/config'
import { calcSosi, getZFWlength } from '@/utils/index'
//import { hasOperationPermission } from '@/utils/permission'
import dayjs from 'dayjs'
import _ from 'lodash'
import Vue from 'vue'
//特別文字
function replaceSpecialChar(input) {
  input.value = input.value.replace(
    /[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟㏍㊤㊥㊦㊧㊨㈲㈹㍾㍽㍼∮∑∟⊿\t]+/gim,
    ''
  )
}

function removeChild(el, binding) {
  if (nodeEnv == 'devepmemt') return
  const { value } = binding
  if (value) {
    // console.info(value)
    // const { code, group } = value
    // if (code) {
    //   if (!hasOperationPermission(code, group)) {
    //     el && el.parentNode && el.parentNode.removeChild(el)
    //   }
    // }
  }
}
/**
 * @description カスタムディレクティブv-permissions
 */
Vue.directive('permissions', {
  inserted(el, binding) {
    removeChild(el, binding)
  },
  // bind(el, binding) {
  //   removeChild(el, binding)
  // },
  // update(el, binding) {
  //   console.info('update')
  //   removeChild(el, binding)
  // },
})

/**
 * @description カスタムディレクティブv-drag
 */
Vue.directive('drag', {
  bind(el, binding, vNode) {
    if (
      el.querySelector('.el-dialog__header') &&
      el.querySelector('.el-dialog')
    ) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      const dragDom = el.querySelector('.el-dialog')
      dialogHeaderEl.style.cssText += ';cursor:move;'
      dragDom.style.cssText += ';top:0;'

      const getStyle = (function () {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr]
        } else {
          return (dom, attr) => getComputedStyle(dom, null)[attr]
        }
      })()

      dialogHeaderEl.onmousedown = (e) => {
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        const dragDomWidth = dragDom.offsetWidth
        const dragDomHeight = dragDom.offsetHeight

        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

        let styL = getStyle(dragDom, 'left')
        let styT = getStyle(dragDom, 'top')

        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL / 100)
          styT = +document.body.clientHeight * (+styT / 100)
        } else {
          styL = +styL.slice(0, -2)
          styT = +styT.slice(0, -2)
        }

        document.onmousemove = function (e) {
          let left = e.clientX - disX
          let top = e.clientY - disY

          if (-left > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }

          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

          vNode.child.$emit('drag-dialog')
        }

        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  },
})

Vue.directive('numberFormat', {
  update: function (el, binding) {
    setTimeout(() => {
      const element =
        el.querySelector('.el-input__inner') ||
        el.querySelector('.el-textarea__inner') ||
        el
      element.classList.add('number')

      if (element.value) {
        let numeral = require('numeral')
        let format = '0,0'
        if (binding.modifiers.float) {
          let n = binding.value || 1
          format = `0,0.${_.padEnd('0', Number(n), '0')}`
        }
        if (element.value) {
          element.value = numeral(element.value).format(format)
        }
      }
    }, 0)
  },
})

/**
 * @description カスタムテキストエリアの行数と文字数制限
 */
Vue.directive('specialChar', {
  bind(el, binding, vnode) {
    const input =
      el.querySelector('.el-input__inner') ||
      el.querySelector('.el-textarea__inner') ||
      el
    input.addEventListener('compositionstart', () => {
      vnode.locking = true
    })
    input.addEventListener('compositionend', () => {
      vnode.locking = false
      input.dispatchEvent(new Event('input'))
    })

    input.onblur = () => {
      if (vnode.locking) {
        return
      }
      replaceSpecialChar(input)
      input.dispatchEvent(new Event('input'))
    }
  },
})

Vue.directive('input', {
  bind(el, binding, vnode) {
    const input =
      el.querySelector('.el-input__inner') ||
      el.querySelector('.el-textarea__inner') ||
      el
    input.addEventListener('compositionstart', () => {
      vnode.locking = true
    })
    input.addEventListener('compositionend', () => {
      vnode.locking = false
      input.dispatchEvent(new Event('input'))
    })
    //要素の上で何らかのキーが放された際に発生するイベントの処理
    input.onkeyup = () => {
      if (vnode.locking) {
        return
      }
      // v-input.num
      if (binding.modifiers.num) {
        //数字のみ入力可能（先頭の0は複数可）
        onlyNum(input)
      }
      //v-input.num_point
      else if (binding.modifiers.num_point) {
        //数字＋小数点のみ入力可能（小数点複数入力可）
        onlyNumPoint(input)
      }
      //v-input.float
      else if (binding.modifiers.float) {
        //浮動小数点型のみ入力可能（小数点以下1桁のみ）
        onlyFloat(input, binding.value || 1)
      }
      //  v-input.int
      else if (binding.modifiers.int) {
        //入力できるのは整数（0+正の整数）のみです（先頭が0以下）
        onlyInt(input)
      }
      //v-input.intp
      else if (binding.modifiers.intp) {
        //入力できるのは正の整数のみです
        onlyIntp(input)
      }
      //v-input.alp
      else if (binding.modifiers.alp) {
        //文字のみ入力可能
        onlyAlp(input)
      }
      //v-input.num_alp
      else if (binding.modifiers.num_alp) {
        //数字＋文字のみ入力可能
        onlyNumAlp(input)
      }
      //v-input.arith
      else if (binding.modifiers.arith) {
        //4 つの算術演算子 + 数値
        onlyArith(input)
      }
      //桁数制御と全半角
      else if (binding.modifiers.halfkana) {
        onlyHalfKana(input)
      } else if (binding.modifiers.lastDay) {
        lastDay(input)
      }
      input.dispatchEvent(new Event('input'))
    }

    input.onblur = () => {
      if (vnode.locking) {
        return
      }
      // v-input.num
      if (binding.modifiers.num) {
        //数字のみ入力可能（先頭の0は複数可）
        onlyNum(input)
      }
      //v-input.num_point
      else if (binding.modifiers.num_point) {
        //数字＋小数点のみ入力可能（小数点複数入力可）
        onlyNumPoint(input)
      }
      //v-input.alp
      else if (binding.modifiers.alp) {
        //文字のみ入力可能
        onlyAlp(input)
      }
      //v-input.num_alp
      else if (binding.modifiers.num_alp) {
        //数字＋文字のみ入力可能
        onlyNumAlp(input)
      }
      //v-input.arith
      else if (binding.modifiers.arith) {
        //4 つの算術演算子 + 数値
        onlyArith(input)
      }
      //桁数制御と全半角
      else if (binding.modifiers.halfkana) {
        onlyHalfKana(input)
      }

      if (binding.modifiers.float) {
        let numeral = require('numeral')
        let n = binding.value || 1
        let format = `0,0.${_.padEnd('0', Number(n), '0')}`
        if (input.value) {
          input.value = numeral(input.value).format(format)
        }
      }
      if (binding.modifiers.intp) {
        let numeral = require('numeral')
        let format = `0,0`
        if (input.value) {
          input.value = numeral(input.value).format(format)
        }
      }
      if (binding.modifiers.lastDay) {
        lastDay(input)
      }
    }

    function lastDay(input) {
      let date = null
      if (binding.value) {
        var doc = document.getElementById(binding.value)
        if (doc) {
          date = doc.value
        }
      }
      let last = 31
      if (date) {
        last = Number(dayjs(date).endOf('month').format('DD'))
      }
      if (input.value) {
        input.value = Number(input.value) > last ? last : Number(input.value)
      }
      input.dispatchEvent(new Event('input'))
    }

    //数字
    function onlyNum(input) {
      input.value = input.value.replace(/\D+/g, '')
    }
    //整数(0+正整数)
    function onlyInt(input) {
      let value = input.value
      value = value.replace(/\D+/g, '')
      input.value = value ? Number(value).toString() : value //去掉开头多个0
    }
    //正整数
    function onlyIntp(input) {
      if (!/^[1-9][0-9]*$/.test(input.value)) {
        let value = input.value.replace(/\D+/g, '')
        if (value && value.substring(0, 1) === '0') {
          //0开头去除0
          value = value.substring(1)
        }

        input.value = value
      }
    }

    //数値 + 小数点
    function onlyNumPoint(input) {
      input.value = input.value.replace(/[^\d.]/g, '')
    }

    //浮動小数点
    // eslint-disable-next-line no-unused-vars
    function onlyFloat(input, n) {
      let value = input.value
      value = value.replace(/[^\d.]/g, '')
      value = value.replace(/^\./g, '')
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      if (n && Number(n) > 0) {
        //nビットを制限する
        var d = new Array(Number(n)).fill(`\\d`).join('')
        // eslint-disable-next-line no-useless-escape
        var reg = new RegExp(`^(\\-)*(\\d+)\\.(${d}).*$`, 'ig')
        value = value.replace(reg, '$1$2.$3')
      }
      if (value && value.at(-1) !== '.') {
        value = parseFloat(value).toString()
      }
      input.value = value
    }
    //アルファベット
    function onlyAlp(input) {
      input.value = input.value.replace(/[^A-Za-z]/g, '')
    }
    //数字+文字+#+,
    function onlyNumAlp(input) {
      input.value = input.value.replace(/[^A-Za-z0-9-#,]/g, '')
    }

    //4つの演算 +-*/() 数字
    function onlyArith(input) {
      let value = input.value
      if (value) {
        input.value = value.split('').reduce((prev, cur) => {
          // eslint-disable-next-line no-useless-escape
          if (/^[\d|\-|\+|\*|\/|\.|\(|\)]+$/.test(cur)) {
            return prev + cur
          }
          return prev
        }, '')
      }
    }
    //桁数制御と全半角制御が必要です
    function onlyHalfKana(input) {
      input.value = input.value.replace(/^[^\x01-\x7E\uFF61-\uFF9F]+$/, '')
    }
  },
})

Vue.directive('rows', {
  bind(el, binding, vnode) {
    const textArea =
      el.querySelector('.el-input__inner') ||
      el.querySelector('.el-textarea__inner') ||
      el

    var maxLines = vnode.data.attrs.rows
    // 每一行字节数
    var maxLineLength = Number.MAX_VALUE
    if (vnode.data.attrs.rowlength) {
      maxLineLength = Number(vnode.data.attrs.rowlength)
    }
    var maxByteLength = Number.MAX_VALUE
    if (vnode.data.attrs.bytelength) {
      maxByteLength = Number(vnode.data.attrs.bytelength)
    }
    var maxLineByteLength = Number.MAX_VALUE

    var flag = true
    var newstr
    var ctrlv = false

    textArea.onkeydown = (e) => {
      var text = textArea.value
      var lines = text.split('\n')
      if (e.keyCode == 13) {
        //回车事件处理
        var caret = textArea.selectionStart //获取当前光标位置
        var line = 0
        var charCount = 0
        if (getLen(textArea.value) >= maxByteLength) {
          return false
        }
        if (lines.length < maxLines) {
          //现在页面的总行数小于设置的总行数，则回车键执行
          return true
        } else {
          _.forEach(lines, function (e, i) {
            charCount += e.length
            if (caret <= charCount) {
              line = i
              return false
            }
            charCount += 1
          })
          if (line + 1 < maxLines) {
            //现在光标位置所在的行数小于总行数
            charCount += lines[line].length //当前行数的字符个数
            if (caret <= charCount) {
              //光标位置小于字符个数
              lines.splice(maxLines - 1, 1) //去掉最后一行
              newstr = lines.join('\n')
              newstr = newstr.slice(0, caret) + '\n' + newstr.slice(caret)
              flag = false
              if (flag == false && e.keyCode == 13) {
                textArea.value = newstr
              }
              flag = true
              return false
            }
          } else {
            return lines.length < maxLines
          }
        }
      } else if (e.keyCode == 8 || (e.keyCode >= 37 && e.keyCode <= 40)) {
        console.log('delete')
      } else if (e.ctrlKey && e.keyCode == 86) {
        ctrlv = true
      } else {
        caret = textArea.selectionStart
        line = 0
        charCount = 0
        _.forEach(lines, function (e, i) {
          charCount += e.length
          if (caret <= charCount) {
            line = i
            return false
          }
          charCount += 1
        })
        if (getLen(textArea.value) >= maxByteLength) {
          //限制字节数
          return false
        }
        var theLine = lines[line]
        if (getLen(theLine) >= maxLineByteLength) {
          return false
        }
        return theLine.length < maxLineLength
      }
    }

    textArea.oninput = (e) => {
      var text = textArea.value
      var lines = text.split('\n')
      if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines)
      }
      if (flag == false && e.keyCode == 13) {
        textArea.value = newstr
      } else if (ctrlv) {
        var zuo = ''
        var you = ''
        var caret = textArea.selectionStart
        var line = 0
        var charCount = 0
        _.forEach(lines, function (e, i) {
          charCount += e.length
          if (caret <= charCount) {
            line = i
            return false
          }
          charCount += 1
        })
        var zhantie = lines[line].substring(0, maxLineLength)
        //将上面的字符便厉，然后后面加换行
        for (let index = 0; index < line; index++) {
          zuo += lines[index] + '\n'
        }
        //将下面的字符遍历，最后一行不加换行，其余的也加换行
        for (let index = line + 1; index < lines.length; index++) {
          if (index == lines.length - 1) {
            you = '\n' + you + lines[index]
          } else {
            you = you + lines[index] + '\n'
          }
        }
        var zong = zuo + zhantie + you
        textArea.value = zong
        ctrlv = false
        if (getLen(textArea.value) >= maxByteLength) {
          //限制字节数
          return false
        }
        var theLine = lines[line]
        if (getLen(theLine) >= maxLineByteLength) {
          return false
        }
        return theLine.length < maxLineLength
      } else if (flag == true && e.keyCode == 13) {
        var aa = textArea.value.split('\n')
        var bb = aa.join('\n')
        textArea.value = bb
      }
      flag = true
    }
    textArea.addEventListener('compositionend', () => {
      var textvalue = textArea.value
      var lines = textvalue.split('\n')
      var caret = textArea.selectionStart
      var charCount = 0
      var liuAttr = []
      _.forEach(lines, function (e, i) {
        charCount += e.length
        if (caret <= charCount) {
          //光标位置小于字符个数
          if (maxLineLength / 2 < maxLineByteLength / 2) {
            //如果每行个数小于每行字节个数
            lines[i] = lines[i].substring(0, maxLineLength)
            var newstr = lines.join('\n')
            textArea.value = newstr
          } else {
            //每行的数是否满足最大行字节数
            if (getLen(lines[i]) > maxLineByteLength) {
              let len = 0
              const chinese = /[^\x00-\xff]/gi
              for (let l = 0; l < lines[i].length; l++) {
                if (lines[i].charAt(l).match(chinese)) {
                  len += 2
                } else {
                  len += 1
                }
                if (len > maxLineByteLength) {
                  var a = lines[i].slice(0, l)
                  liuAttr[i] = a
                  textArea.value = liuAttr.join('\n')
                  return
                }
              }
            }
          }
        }
        liuAttr[i] = lines[i]
        textArea.value = liuAttr.join('\n')
        charCount += 1
        if (getLen(textvalue) > maxByteLength) {
          //字节数大于总的字节数
          let len = 0
          const chinese = /[^\x00-\xff]/gi
          for (let i = 0; i < textvalue.length; i++) {
            if (textvalue.charAt(i).match(chinese)) {
              len += 2
            } else {
              len += 1
            }
            if (len > maxByteLength) {
              return (textArea.value = textvalue.slice(0, i))
            }
          }
          return (textArea.value = textvalue)
        }
      })
    })
    //获取字节
    function getLen(str) {
      var length = getZFWlength(str)
      var num = calcSosi(str)
      return length + num
    }
  },
})
