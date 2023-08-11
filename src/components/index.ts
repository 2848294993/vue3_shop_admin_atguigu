import SvgIcon from './SvgIcon/index.vue'
import MySelect from "./MySelect/index.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon, MySelect }
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
