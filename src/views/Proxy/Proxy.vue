<!--
 * @Description: Proxy.vue
 * @Author: 5t5
 * @Time: 2024/6/6 17:15
-->
<template>
  <main class="proxy init-background-style">
    <header class="content-header">
      {{ title }}
    </header>
    <section class="content">
      <article class="content-body">
        身体
      </article>
      <footer class="content-footer">
        代码
      </footer>
    </section>
  </main>
</template>

<script setup>
import {onMounted, reactive, toRefs} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const state = reactive( {
  title: ''
} )


// region title
const setComponentTitle = () => {
  const {meta} = route
  state.title = meta.title
}

onMounted(() => {
  setComponentTitle()
})
// endregion title


const {title} = toRefs( state )
</script>

<style scoped lang="less">
.proxy {

}
</style>