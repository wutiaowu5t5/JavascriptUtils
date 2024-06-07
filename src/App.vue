<!--
 * @Description: App.vue
 * @Author: 5t5
 * @Time: 2024/5/20 11:56
-->
<template>
  <div v-if="showBackButtonRef" class="back" @click="backHome()">
    BACK TO HOME
  </div>
  <router-view v-slot="{ Component }">
    <transition name="scale-slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import {watch, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
let showBackButtonRef = ref(false)

const router = useRouter()
const backHome = () => {
  router.push('/')
}

watch(
  () => route.path,
  (newValue, oldValue) => {
    showBackButtonRef.value = newValue !== '/'
  }
)
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

.back {
  text-decoration: none;
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  color: #fff;
  width: 130px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
  
  &:hover {
    animation: ani 8s linear infinite;
    border: none;
  }
  
  &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 35px;
    transition: 1s;
  }
  
  &:hover::before {
    filter: blur(20px);
  }
  
  &:active {
    background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  }
}

@keyframes ani {
  0% {
    background-position: 0%;
  }
  
  100% {
    background-position: 400%;
  }
}
</style>