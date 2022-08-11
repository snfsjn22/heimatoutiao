/**
 * 封装本地存储操作模块
 * date: 2022/08/10
 * author: 李秉哲
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    // 数据转换为JSON储存
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
