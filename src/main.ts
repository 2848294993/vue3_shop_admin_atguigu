import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
//@ts-ignore:忽略当前文件ts类型的检测，否则有红色下划线（在打包时会失败）
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
//svg图标的相关导入
import 'virtual:svg-icons-register'
import globalComponents from './components/index'
import directives from './directives'
import store from './store'
import router from './router'
//elementplus暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'



const app = createApp(App)


app.use(globalComponents)
app.use(directives)
app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')



