<!--
 * @Description: App.vue
 * @Author: 5t5
 * @Time: 2024/5/20 11:56
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="scale-slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
</script>

<style lang="less">
@import './assets/css/initStyle.less';
@import './assets/css/common.less';
body {
  background-color: black;
}
</style>

<style scoped lang="less">
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>