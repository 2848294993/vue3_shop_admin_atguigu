<template>
  <div class="home-container">
    <div class="top" style="margin:30px;">
      <img :src="userStore.useravatar" style="width:100px;height:100px;border-radius:50%">
      <div class="right">
        <h1>{{ greet }}呀！{{ userStore.username }}</h1>
        <p>商城运营平台</p>
      </div>
    </div>
    <div class="bottom">
      <svg-icon name="welcome" width="100%" height="400px"></svg-icon>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useUserStore } from "@/store/modules/userStore.ts"
import greet from "@/utils/time.ts"
const userStore = useUserStore()

</script>


<style lang="scss" scoped>
.home-container {
  height: 100%;

  .top {
    display: flex;

    .right {
      margin-top: 10px;
      margin-left: 20px;

      h1 {
        font-size: 30px;
        font-weight: 800;
        margin-bottom: 30px;
      }

      p {
        font-style: italic;
        font-size: 20px;
        color: skyblue;
      }
    }
  }

  .bottom {
    height: 100%;
    display: flex;
    align-items: center;
  }

}
</style>