<!--
 * @Description: Home.vue
 * @Author: 5t5
 * @Time: 2024/5/20 14:38
-->
<template>
  <section class="router-list">
    <div
      v-for="(item, index) in dynamicRoutes"
      :key="index"
      class="router-item"
      @click="router.push(item.path)"
    >
      <span class="button_lg">
        <span class="button_sl" />
        <span class="button_text">{{ item.meta.title }}</span>
      </span>
    </div>
  </section>
</template>

<script setup>
import {dynamicRoutes} from '@/router/router.js'
import {router} from '../router/router'

console.log( dynamicRoutes, 'dynamicRoutes' )
</script>

<style scoped lang="less">
.router-list {
  width: 100vw;
  height: 100vh;
  background-color: black;
  padding: 100px 100px 0;
  font-size: 40px;
  color: red;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  
  .router-item {
    color: #0f1923;
    cursor: pointer;
    position: relative;
    padding: 8px;
    height: 57px;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    transition: all .15s ease;
    
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      left: 0;
      height: calc(50% - 5px);
      border: 1px solid #7D8082;
      transition: all .15s ease;
    }
    
    &::before {
      top: 0;
      border-bottom-width: 0;
    }
    
    &::after {
      bottom: 0;
      border-top-width: 0;
    }
    
    &:active::before,
    &:active::after {
      right: 3px;
      left: 3px;
    }
    
    &:active::before {
      top: 3px;
    }
    
    &:active::after {
      bottom: 3px;
    }
    
    .button_lg {
      position: relative;
      display: block;
      padding: 10px 20px;
      color: #fff;
      background-color: #0f1923;
      overflow: hidden;
      box-shadow: inset 0 0 0 1px transparent;
      
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 2px;
        background-color: #0f1923;
      }
      
      &::after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 4px;
        height: 4px;
        background-color: #0f1923;
        transition: all .2s ease;
      }
    }
    
    .button_sl {
      display: block;
      position: absolute;
      top: 0;
      bottom: -1px;
      left: -8px;
      width: 0;
      background-color: #ff4655;
      transform: skew(-15deg);
      transition: all .2s ease;
    }
    
    .button_text {
      position: relative;
    }
    
    &:hover {
      color: #0f1923;
    }
    
    &:hover .button_sl {
      width: calc(100% + 15px);
    }
    
    &:hover .button_lg::after {
      background-color: #fff;
    }
    
  }
  
}
</style>