;(function (t, e) {
  'object' === typeof exports && 'object' === typeof module
    ? (module.exports = e())
    : 'function' === typeof define && define.amd
    ? define([], e)
    : 'object' === typeof exports
    ? (exports['vab-icons'] = e())
    : (t['vab-icons'] = e())
})('undefined' !== typeof self ? self : this, function () {
  return (function (t) {
    var e = {}

    function n(r) {
      if (e[r]) return e[r].exports
      var o = (e[r] = { i: r, l: !1, exports: {} })
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
    }

    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
      }),
      (n.r = function (t) {
        'undefined' !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t
        if (4 & e && 'object' === typeof t && t && t.__esModule) return t
        var r = Object.create(null)
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', {
            enumerable: !0,
            value: t,
          }),
          2 & e && 'string' != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function (e) {
                return t[e]
              }.bind(null, o)
            )
        return r
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t['default']
              }
            : function () {
                return t
              }
        return n.d(e, 'a', e), e
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (n.p = ''),
      n((n.s = 'fb15'))
    )
  })({
    '06af': function (t, e, n) {},
    '1cdc': function (t, e, n) {
      'use strict'
      n('06af')
    },
    '29a1': function (t, e, n) {
      t.exports = n.p + 'img/remixicon.symbol.f09b1c74.svg'
    },
    8875: function (t, e, n) {
      var r, o, i
      ;(function (n, c) {
        ;(o = []),
          (r = c),
          (i = 'function' === typeof r ? r.apply(e, o) : r),
          void 0 === i || (t.exports = i)
      })('undefined' !== typeof self && self, function () {
        function t() {
          var e = Object.getOwnPropertyDescriptor(document, 'currentScript')
          if (!e && 'currentScript' in document && document.currentScript)
            return document.currentScript
          if (e && e.get !== t && document.currentScript)
            return document.currentScript
          try {
            throw new Error()
          } catch (p) {
            var n,
              r,
              o,
              i = /.*at [^(]*\((.*):(.+):(.+)\)$/gi,
              c = /@([^@]*):(\d+):(\d+)\s*$/gi,
              s = i.exec(p.stack) || c.exec(p.stack),
              u = (s && s[1]) || !1,
              a = (s && s[2]) || !1,
              f = document.location.href.replace(document.location.hash, ''),
              l = document.getElementsByTagName('script')
            u === f &&
              ((n = document.documentElement.outerHTML),
              (r = new RegExp(
                '(?:[^\\n]+?\\n){0,' +
                  (a - 2) +
                  '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*',
                'i'
              )),
              (o = n.replace(r, '$1').trim()))
            for (var d = 0; d < l.length; d++) {
              if ('interactive' === l[d].readyState) return l[d]
              if (l[d].src === u) return l[d]
              if (u === f && l[d].innerHTML && l[d].innerHTML.trim() === o)
                return l[d]
            }
            return null
          }
        }

        return t
      })
    },
    ab05: function (t, e, n) {},
    fb15: function (t, e, n) {
      'use strict'
      if ((n.r(e), 'undefined' !== typeof window)) {
        var r = window.document.currentScript,
          o = n('8875')
        ;(r = o()),
          'currentScript' in document ||
            Object.defineProperty(document, 'currentScript', { get: o })
        var i = r && r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
        i && (n.p = i[1])
      }
      var c = function () {
          var t,
            e = this,
            n = e.$createElement,
            r = e._self._c || n
          return e.isExternal
            ? r(
                'img',
                e._g(
                  {
                    staticClass: 'img-icon',
                    attrs: { src: e.icon },
                  },
                  e.$listeners
                )
              )
            : e.isCustomSvg
            ? r(
                'svg',
                e._g(
                  {
                    class: e.svgClass,
                    attrs: { 'aria-hidden': 'true' },
                  },
                  e.$listeners
                ),
                [r('use', { attrs: { 'xlink:href': '#vab-icon-' + e.icon } })]
              )
            : e.isDefaultSvg
            ? r('svg', e._g({ staticClass: 'vab-icon' }, e.$listeners), [
                r('use', {
                  attrs: { 'xlink:href': e.remixIconPath + '#ri-' + e.icon },
                }),
              ])
            : r(
                'i',
                e._g(
                  {
                    class: ((t = {}), (t['ri-' + e.icon] = !0), t),
                    attrs: { 'aria-hidden': 'true' },
                  },
                  e.$listeners
                )
              )
        },
        s = []
      n('ab05')

      function u(t) {
        return /^(https?:|mailto:|tel:)/.test(t)
      }

      var a = {
          name: 'VabIcon',
          props: {
            icon: { type: String, required: !0 },
            isCustomSvg: { type: Boolean, default: !1 },
            isDefaultSvg: { type: Boolean, default: !1 },
            className: { type: String, default: '' },
          },
          data: function () {
            return { remixIconPath: n('29a1') }
          },
          computed: {
            isExternal: function () {
              return u(this.icon)
            },
            svgClass: function () {
              return this.className
                ? 'vab-icon '.concat(this.className)
                : 'vab-icon'
            },
          },
        },
        f = a
      n('1cdc')

      function l(t, e, n, r, o, i, c, s) {
        var u,
          a = 'function' === typeof t ? t.options : t
        if (
          (e && ((a.render = e), (a.staticRenderFns = n), (a._compiled = !0)),
          r && (a.functional = !0),
          i && (a._scopeId = 'data-v-' + i),
          c
            ? ((u = function (t) {
                ;(t =
                  t ||
                  (this.$vnode && this.$vnode.ssrContext) ||
                  (this.parent &&
                    this.parent.$vnode &&
                    this.parent.$vnode.ssrContext)),
                  t ||
                    'undefined' === typeof __VUE_SSR_CONTEXT__ ||
                    (t = __VUE_SSR_CONTEXT__),
                  o && o.call(this, t),
                  t && t._registeredComponents && t._registeredComponents.add(c)
              }),
              (a._ssrRegister = u))
            : o &&
              (u = s
                ? function () {
                    o.call(
                      this,
                      (a.functional ? this.parent : this).$root.$options
                        .shadowRoot
                    )
                  }
                : o),
          u)
        )
          if (a.functional) {
            a._injectStyles = u
            var f = a.render
            a.render = function (t, e) {
              return u.call(e), f(t, e)
            }
          } else {
            var l = a.beforeCreate
            a.beforeCreate = l ? [].concat(l, u) : [u]
          }
        return { exports: t, options: a }
      }

      var d = l(f, c, s, !1, null, '79aac9d9', null),
        p = d.exports
      e['default'] = p
    },
  })['default']
})
