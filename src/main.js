/*
 * @Description: Vue入口文件
 * @Author: 5t5
 * @Time: 2024/5/17 17:04
 */
// 创建Vue
import {createApp} from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入Pinia
import store from './store/store'
app.use(store)

// 引入Router
import {router} from './router/router'
app.use(router)

// 引入log美化
import consoleOverridePlugin from './utils/customConsole/consolePlugin'
app.use(consoleOverridePlugin)

// 引入highlight
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import 'highlight.js/styles/atom-one-dark.css'
import HLJsVuePlugin from '@highlightjs/vue-plugin'
app.use(HLJsVuePlugin)


app.mount('#app')