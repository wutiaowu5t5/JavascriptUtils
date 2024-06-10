/*
 * @Description: router.js
 * @Author: 5t5
 * @Time: 2024/5/20 12:05
 */
import {createRouter, createWebHistory} from 'vue-router'

// #region routes
// 静态路由
const staticRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {title: 'Home', hidden: false}
  }
]

// 动态路由
const dynamicRoutes = [
  {
    path: '/proxy',
    name: 'Proxy',
    component: () => import('@/views/Proxy/Proxy.vue'),
    meta: {title: 'Proxy 代理对象', filename: 'DeepProxy', hidden: false}
  },
  {
    path: '/color-conversion',
    name: 'ColorConversion',
    component: () => import('@/views/ColorConversion/Color-Conversion.vue'),
    meta: {title: '颜色转换', hidden: false}
  },
  {
    path: '/enumeration-formatting',
    name: 'EnumerationFormatting',
    component: () => import('@/views/EnumerationFormatting/Enumeration-Formatting.vue'),
    meta: {title: '枚举值格式化', hidden: false}
  }
]
// #endregion


// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 创建HTML5模式
  routes: [...staticRoutes, ...dynamicRoutes] // routes
})
export {staticRoutes, dynamicRoutes, router} // 暴露路由