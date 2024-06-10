<!--
 * @Description: 警告框组件
 * @Author: 5t5
 * @Time: 2024/6/10 13:49
-->
<template>
  <article class="alert" :class="typeSource[type].className">
    <div>
      <el-tooltip
        effect="dark"
        :content="typeSource[type].tooltip"
        placement="top"
      >
        <span class="icon">i</span>
      </el-tooltip>
      <span>{{ typeSource[type].title }}</span>
    </div>
    <figcaption>
      <slot name="content" />
    </figcaption>
  </article>
</template>

<script setup>
import {toRefs} from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  }
})

const typeSource = {
  info: {
    className: 'alert-info',
    tooltip: '这是一个提醒内容的警告框',
    title: 'Info'
  },
  suggestion: {
    className: 'alert-suggestion',
    tooltip: '这是一个建议内容的警告框',
    title: 'Suggestion'
  },
  important: {
    className: 'alert-important',
    tooltip: '这是一个重要内容的警告框',
    title: 'Important'
  },
  warning: {
    className: 'alert-warning',
    tooltip: '这是一个警告内容的警告框',
    title: 'Warning'
  },
  note: {
    className: 'alert-note',
    tooltip: '这是一个注意内容的警告框',
    title: 'Note'
  }
}

const {type} = toRefs(props)
</script>

<style scoped lang="less">
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid;
  border-left: 4px solid transparent;
  border-radius: 3px 4px 4px 2px;
  
  div{
    font-size: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    .icon {
      display: inline-block;
      text-align: center;
      vertical-align: center;
      font-size: 12px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid;
      margin-right: 10px;
    }
    
    span {
      line-height: 20px;
      vertical-align: center;
    }
  }
  
}

.alert-info {
  color: #31708f;
  //background-color: #d9edf7;
  border-color: #bce8f1;
  
  .icon {
    border-color: #31708f;
  }
}

.alert-suggestion {
  color: #3c763d;
  //background-color: #dff0d8;
  border-color: #d6e9c6;
  
  .icon {
    border-color: #3c763d;
  }
}

.alert-important {
  color: #8a6d3b;
  //background-color: #fcf8e3;
  border-color: #faebcc;
  
  .icon {
    border-color: #8a6d3b;
  }
}

.alert-warning {
  color: #a94442;
  //background-color: #f2dede;
  border-color: #ebccd1;
  
  .icon {
    border-color: #a94442;
  }
}

.alert-note {
  color: #8a6d3b;
  //background-color: #fcf8e3;
  border-color: #faebcc;
  
  .icon {
    border-color: #8a6d3b;
  }
}
</style>