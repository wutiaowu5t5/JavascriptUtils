<!--
 * @Description: commonTemplate.vue
 * @Author: 5t5
 * @Time: 2024/6/7 17:12
-->
<template>
  <main :class="mainClass" class="init-background-style">
    <header class="content-header">
      {{ title }}
    </header>
    <section class="content">
      <article class="content-body">
        <p>代码</p>
        <code-template :code="code" />
        <slot name="alert" />
      </article>
      <footer class="content-footer">
        <p>示例</p>
        <section class="example-container">
          <slot name="example" />
        </section>
      </footer>
    </section>
  </main>
</template>

<script setup>
import {onMounted, reactive, toRefs} from 'vue'
import {useRoute} from 'vue-router'
import CodeTemplate from '@cmp/codeTemplate/codeTemplate.vue'

const route = useRoute()

const props = defineProps( {
  mainClass: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  }
} )

const state = reactive({
  title: '',
  scriptName: '',
  isCollapsed: true,
  isCollapsible: false,
  maxHeight: 300
})

// region message
const setComponentMessage = () => {
  const {meta} = route
  state.title = meta.title
}

onMounted(async () => {
  setComponentMessage()
})
// endregion message

const {title} = toRefs( state )
const {mainClass, code} = toRefs( props )
</script>

<style lang="less" scoped>
.init-background-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  color: white;
  background-color: black;
  font-family: 'sanctum';
  
  /* 滚动条 */
  &::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
    width: 4px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: #fff; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }
  &::-webkit-scrollbar {
    width: 10px; /*滚动条的宽度*/
    height: 8px; /*滚动条的高度*/
  }
  &::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
    height: 10px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
    height: 50px;
    background-color: #9f9f9f;
    -webkit-border-radius: 4px;
  }
  
  .content-header {
    width: 40%;
    min-height: 300px;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    width: 40%;
    flex-grow: 1;
    background-color: #181b1a;
    margin-bottom: 40px;
    border-radius: 15px;
    padding: 20px;
    border: 1px solid #fff;
    
    p {
      font-size: 28px;
    }
    
    .content-body {}
    
    .content-footer {}
    
  }
  
}
</style>