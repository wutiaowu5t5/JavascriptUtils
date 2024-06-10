/*
 * @Description: DeepProxy类用于创建深度代理对象或数组
 * @Author: 5t5
 * @Time: 2024/6/10 15:19
 */

class DeepProxy {
  
  #cache = new WeakMap()
  
  /**
   * 创建一个深度代理对象或数组。
   *
   * @param {Object|Array} obj 需要被代理的原始对象或数组。
   * @param {Object} handle 代理处理器，定义了代理对象上的操作如何被拦截和处理。
   * @returns {Object|Array} 返回创建的深度代理对象，如果参数不合法则返回null。
   */
  create(obj, handle) {
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
    
    /**
     * 递归遍历并代理对象或数组的每个嵌套属性。
     *
     * @param {Object|Array} target 需要被遍历和代理的目标对象或数组。
     * @returns {Object|Array} 返回遍历和代理后的目标对象或数组。
     */
    const traverse = (target) => {
      // 如果目标已经被代理过，直接返回缓存的代理对象
      if (this.#cache.has(target)) {
        return this.#cache.get(target)
      }
      
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
      
      // 创建代理对象
      const proxy = new Proxy(target, handle)
      
      // 缓存代理对象
      this.#cache.set(target, proxy)
      
      // 返回处理后的代理对象
      return proxy
    }
    
    // 对传入的对象或数组进行遍历处理，并返回代理后的对象
    return traverse(obj)
  }
  
  /**
   * 取消代理。
   *
   * 此方法用于检查给定的代理是否在缓存中，并根据情况返回缓存的原始对象或代理本身。
   * 如果代理存在于缓存中，这意味着它之前被撤销过，此时返回缓存的对象，避免重复创建。
   * 如果代理不在缓存中，则说明它没有被撤销过，直接返回该代理。
   * 这种设计用于管理一组代理对象，确保它们在需要时可以被撤销和重新使用，或者在没有被撤销的情况下继续使用。
   *
   * @param {Object} proxy - 待撤销的代理对象。
   * @returns {Object} 如果代理存在于缓存中，则返回缓存的原始对象；否则返回代理本身。
   */
  revoke(proxy) {
    if (this.#cache.has(proxy)) {
      return this.#cache.get(proxy)
    }
    return proxy
  }
  
}

export default new DeepProxy()