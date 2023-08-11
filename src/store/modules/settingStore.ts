import { defineStore } from "pinia";
import { ref } from "vue"

export const useSettingStore = defineStore("settingStore", () => {
  let fold = ref(false);
  let refresh = ref(false);

  return {
    fold,
    refresh
  }
})