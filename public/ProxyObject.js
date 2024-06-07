// 初始化对象或数组的深度代理
// @param {Object|Array} obj - 需要代理的目标对象或数组
// @param {Object} handle - 代理处理器对象
// @returns {Proxy|null} - 返回代理对象或null（如果目标非法）
const createProxy = (obj, handle) => {
  // 检查传入的目标是否为对象或数组
  if (!obj || typeof obj !== 'object') {
    console.error('Illegal agent target: Target must be an object or array.')
    return null
  }
  // 检查代理处理器是否为对象
  if (!handle || typeof handle !== 'object') {
    console.error('Illegal handler: Handler must be an object.')
    return null
  }
  // 辅助函数，用于检查值是否为对象（包括数组）
  const isObject = (val) => val !== null && typeof val === 'object'

  // 递归遍历目标对象或数组，将其所有嵌套对象和数组都代理化
  // @param {Object|Array} target - 当前处理的对象或数组
  // @returns {Object|Array|null} - 处理后的对象或数组
  const traverse = (target) => {
    // 如果目标是数组
    if (Array.isArray(target)) {
      // 遍历数组的每一项
      for (let i = 0; i < target.length; i++) {
        // 如果当前项是对象或数组，则递归调用traverse进行处理
        if (isObject(target[i])) {
          target[i] = traverse(target[i])
        }
      }
    } else {
      // 如果目标是对象
      // 遍历对象的每一个属性
      for (const key in target) {
        // 确保只处理对象自身的属性
        if (Object.prototype.hasOwnProperty.call(target, key) && isObject(target[key])) {
          target[key] = traverse(target[key])
        }
      }
    }
    // 返回处理后的目标
    return target
  }
  // 对传入的对象或数组进行遍历处理，并返回代理后的对象
  return new Proxy(traverse(obj), handle)
}
export default createProxy