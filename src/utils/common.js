/* eslint-disable no-floating-decimal */
const getElementY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}

/**
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动的偏移量
 * @returns
 */
const scrollToElem = (elem, duration, offset) => {
  // 初始位置
  const startingY = window.pageYOffset
  const elementY = getElementY(elem)
  // 需要去滚动的距离
  const diff = elementY - startingY + offset
  // 如果 diff 为 0
  if (!diff) return
  const easing = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export {
  scrollToElem
}
