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
        <section ref="hljsDom" :class="{ 'collapsed': isCollapsed }" class="hljs-container" codetype="JavaScript">
          <highlightjs language="JavaScript" :autodetect="false" :code="code" />
          <div v-if="isCollapsible" class="collapse-btn" @click="toggleCollapse()">
            <icon-ep-ArrowDownBold v-if="isCollapsed" class="floating-icon" />
            <icon-ep-ArrowUpBold v-else class="floating-icon" />
          </div>
        </section>
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
import {onMounted, ref, reactive, toRefs} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const props = defineProps( {
  mainClass: {
    type: String,
    default: ''
  }
} )

const state = reactive({
  title: '',
  code: '',
  scriptName: '',
  isCollapsed: true,
  isCollapsible: false,
  maxHeight: 300
  
})

// region message
const setComponentMessage = () => {
  const {meta} = route
  state.title = meta.title
  state.scriptName = meta.filename
  fetch(`./${state.scriptName}.js`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.text()
    })
    .then(data => {
      state.code = data
    })
    .catch(error => {
      console.error('Error loading JavaScript file:', error)
    })
}

const hljsDom = ref(null)

const formattingRenderDom = (el) => {
  // / 获取代码片段
  const code = el.querySelector('code.hljs')
  const pre = el.querySelector('pre')
  if (!code || !pre) return
  
  const html = code.innerHTML
  const size = html.split('\n').length
  // 插入行数
  const ul = document.createElement('ul')
  const fragment = document.createDocumentFragment()
  for (let i = 1; i <= size; i++) {
    const li = document.createElement('li')
    li.innerText = i
    fragment.appendChild(li)
  }
  ul.appendChild(fragment)
  ul.classList.add('hljs-code-number')
  el.insertBefore(ul, pre)
  
  // 插入复制功能
  const copy = document.createElement('div')
  copy.classList.add('hljs-copy')
  copy.innerText = '复制'
  
  // 添加点击事件
  copy.addEventListener('click', () => {
    // 创建一个输入框
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.setAttribute('readonly', 'readonly')
    textarea.value = code.innerText
    textarea.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      copy.innerText = '复制成功'
    }
    document.body.removeChild(textarea)
  })
  
  pre.appendChild(copy)
  
  // 鼠标移入显示复制按钮
  el.addEventListener('mouseover', () => {
    copy.style.display = 'block'
  })
  el.addEventListener('mouseout', () => {
    copy.innerText = '复制'
    copy.style.display = 'none'
  })
}

const checkHeight = (el) => {
  if (el) {
    console.log( el.scrollHeight, 'el.scrollHeight' )
    state.isCollapsible = el.scrollHeight > state.maxHeight
  }
}

// 切换折叠状态的方法
const toggleCollapse = () => {
  state.isCollapsed = !state.isCollapsed
}

onMounted(async () => {
  setComponentMessage()
  setTimeout(() => {
    formattingRenderDom(hljsDom.value)
    checkHeight(hljsDom.value)
  }, 400)
})
// endregion message

const {title, code, isCollapsed, isCollapsible} = toRefs( state )
const {mainClass} = toRefs( props )
</script>

<style lang="less">
@import "./code.less";
</style>

<style lang="less" scoped>
.init-background-style {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  color: white;
  background-color: #131818;
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
    min-height: 15%;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    width: 40%;
    height: 100%;
    background-color: #181b1a;
    margin-bottom: 40px;
    border-radius: 15px;
    padding: 20px;
    border: 1px solid #fff;
    
    p {
      font-size: 28px;
    }
    
    .content-body {
      
      .hljs-container {
        transition: max-height 0.3s ease;
        overflow: hidden;
        position: relative;
        
        .collapse-btn {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(23,23,23,0.1), rgba(23,23,23,0.9));
          
          .floating-icon {
            cursor: pointer;
            animation: float 1.8s infinite ease-in-out;
          }
        }
      }
      
      .hljs-container.collapsed {
        max-height: 300px; /* 设置折叠后的最大高度 */
      }
    }
    
    .content-footer {
      background-color: #354f75;
    }
    
  }
  
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>