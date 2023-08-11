<template>
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>


<script setup lang="ts">
import { nextTick, ref, watch } from "vue"
import { useSettingStore } from "@/store/modules/settingStore";
let flag = ref(true)
const settingStore = useSettingStore();
watch(() => settingStore.refresh, () => {
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  })
})

</script>


<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all .3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>