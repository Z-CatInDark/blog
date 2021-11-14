import faces from '@/assets/js/face'
const escapeHtml = (val = '') => {
  if (!val) return ''
  let result = val
  // 表情转换
  let face = /face\[\W{1,}]/g
  if (face.test(result)) {
    let group = result.match(face)
    group.map((item) => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }

  // 图片链接转换
  const img = /img\[\S+]/g
  if (img.test(result)) {
    let group = result.match(img)
    group.map((item) => {
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }

  // 链接替换
  const link = /a\(\S+\]/g
  if (link.test(result)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)]/
    group.map((item) => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }
  return result
}

export {
  escapeHtml
}
