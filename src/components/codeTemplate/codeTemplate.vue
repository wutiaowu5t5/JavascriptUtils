<!--
 * @Description: codeTemplate.vue
 * @Author: 5t5
 * @Time: 2024/6/10 11:01
-->
<template>
  <section ref="hljsDom" :class="{ 'collapsed': isCollapsed }" class="hljs-container" :codetype="codeType">
    <highlightjs :language="codeType" :autodetect="false" :code="code" />
    <div v-if="isCollapsible" class="collapse-btn" @click="toggleCollapse()">
      <icon-ep-ArrowDownBold v-if="isCollapsed" class="floating-icon" />
      <icon-ep-ArrowUpBold v-else class="floating-icon" />
    </div>
  </section>
</template>

<script setup>
import {onMounted, reactive, ref, toRefs} from 'vue'

const props = defineProps( {
  code: {
    type: String,
    default: '',
    required: true
  },
  codeType: {
    type: String,
    default: 'JavaScript'
  }
} )

const state = reactive({
  code: '',
  isCollapsed: true,
  isCollapsible: false,
  maxHeight: 300
})
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

onMounted(async () => {
  setTimeout(() => {
    formattingRenderDom(hljsDom.value)
    checkHeight(hljsDom.value)
  }, 400)
})

// 切换折叠状态的方法
const toggleCollapse = () => {
  state.isCollapsed = !state.isCollapsed
}

const {isCollapsed, isCollapsible} = toRefs( state )
const {code, codeType} = toRefs( props )
</script>

<style lang="less">
@import "../codeTemplate/code.less";
</style>

<style scoped lang="less">
.hljs-container {
  transition: max-height 3s ease;
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