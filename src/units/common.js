/**
 * 下载文件
 * @param {*} blob 文件blob
 * @param {*} downName 下载名字
 */
export const download = (blob, downName) => {
  const a = document.createElement('a')
  a.download = downName
  a.href = URL.createObjectURL(blob)
  a.click()
}
