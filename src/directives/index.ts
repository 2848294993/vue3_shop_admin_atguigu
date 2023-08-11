import type { App } from "vue"
import { useUserStore } from "@/store/modules/userStore";
import pinia from "@/store"

const userSotre = useUserStore(pinia)

const getInput = (el: HTMLElement): HTMLInputElement | null => el instanceof HTMLInputElement ? el : el.querySelector('input')


export default {
  install(app: App) {
    app.directive('focus', {
      mounted: (el: HTMLElement) => {
        getInput(el)?.focus()
      }
    });
    app.directive('has', {
      mounted(el, options) {
        if (!userSotre.buttonList.includes(options.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}