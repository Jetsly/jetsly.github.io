
import mockMap from './config.js'

/**
 * 解析url
 * @param {String} url 请求地址
 * @param {Object} options 参数
 */
const parseUrl = (url, options = {}) => {
  let anchor = document.createElement('a')
  anchor.href = url
  let querys = anchor.search.slice(1)
  let params = {}
  if (querys) {
    querys.split('&').forEach(query => {
      let item = query.split('=')
      params[`${decodeURIComponent(item[0])}`] = decodeURIComponent(item[1])
    })   
  }
  if (options.body instanceof FormData) {
    [...options.body.keys()].forEach(key => {
      params[`${key}`] = options.body.get(key)
    })
  }
  return {
    protocol: anchor.protocol,
    host: anchor.host,
    port: anchor.port,
    hostname: anchor.hostname,
    hash: anchor.hash,
    pathname: anchor.pathname,
    method: options.method || 'GET',
    params: params
  }
}

/**
 * 判断参数是否一样
 */
const isObjectValueEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}

/**
 * 判断是否包含
 */
export const mockRegex = parseData => {
  if (parseData.pathname in mockMap) {
    let info = mockMap[`${parseData.pathname}`]
    if (!~Object.prototype.toString.call(info).indexOf('Array')) {
      return {
        succ: true,
        data: info
      }
    }
    for (var idx = 0; idx < info.length; idx++) {
      if (isObjectValueEqual(info[idx].params, parseData.params)) {
        return {
          succ: true,
          data: info[idx].data
        }
      }
    }
  }
}
/** 
 * 注入fetch请求
 * @param {String} url 请求地址
 * @param {Object} options 参数
 */
const injectFetch = oldFetch => (url, options) => {
  let parseData = parseUrl(url, options)
  let result = mockRegex(parseData)
  if (result && result.succ) {
    console.group(url)
    console.log(parseData)
    console.log(result.data)
    console.groupEnd()
    return Promise.resolve({
      json () {
        return result.data
      } 
    })    
  } else {
    return oldFetch(url, options)
  }
}

if (process.env.NODE_ENV !== 'production') {
  window.fetch = injectFetch(window.fetch)
}
