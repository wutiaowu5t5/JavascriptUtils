/*
 * @Description: router.js
 * @Author: 5t5
 * @Time: 2024/5/20 12:05
 */
import {createRouter, createWebHistory} from 'vue-router'

// #region routes
// 静态路由
const staticRoutes = [
]

// 动态路由
const dynamicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {title: 'Home', hidden: false}
  },
  {
    path: '/proxy',
    name: 'Proxy',
    component: () => import('@/views/Proxy/Proxy.vue'),
    meta: {title: 'Proxy 代理对象', hidden: false}
  },
  {
    path: '/color-conversion',
    name: 'ColorConversion',
    component: () => import('@/views/ColorConversion/Color-Conversion.vue'),
    meta: {title: 'ColorConversion', hidden: false}
  },
  {
    path: '/enumeration-formatting',
    name: 'EnumerationFormatting',
    component: () => import('@/views/EnumerationFormatting/Enumeration-Formatting.vue'),
    meta: {title: 'EnumerationFormatting', hidden: false}
  }
  
  
]
// #endregion

export {staticRoutes, dynamicRoutes} // 暴露路由

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 创建HTML5模式
  routes: [...staticRoutes, ...dynamicRoutes] // routes
})

export default router