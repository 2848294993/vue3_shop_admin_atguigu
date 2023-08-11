<template>
  <div class="logo-container">
    <svg-icon name="logo" width="50px" height="50px"></svg-icon>
    <p class="name" :class="{ 'fold': settingStore.fold }">白马购物商城</p>
  </div>
</template>


<script setup lang="ts">
import { useSettingStore } from "@/store/modules/settingStore";
let settingStore = useSettingStore();
</script>


<style lang="scss" scoped>
.logo-container {
  height: $logo-height;
  padding-right: 0px;


  .name {
    display: inline-block;
    height: $logo-height;
    vertical-align: top;
    line-height: $logo-height;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    transition: all .5s;

    &.fold {
      opacity: 0;
    }
  }
}
</style>