import raf from 'raf'
import getScroll from './getScroll'

// interface ScrollToOptions {
//   /** Scroll container, default as window */
//   getContainer?: () => HTMLElement | Window;
//   /** Scroll end callback */
//   callback?: () => any;
//   /** Animation duration, default as 450 */
//   duration?: number;
// }

function easeInOutCubic(t, b, c, d) {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

export default function scrollTo(y, options = {}) {
  const { getContainer = () => window, callback, duration = 450 } = options

  const container = getContainer()
  const scrollTop = getScroll(container, true)
  const startTime = Date.now()

  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(
      time > duration ? duration : time,
      scrollTop,
      y,
      duration
    )
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      container.scrollTop = nextScrollTop
    }
    if (time < duration) {
      raf(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }
  raf(frameFunc)
}
