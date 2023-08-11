<template>
  <div class="screen-container">
    <div class="box" ref="box">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="bleft">
          <Tourist></Tourist>
          <Gender></Gender>
          <Age></Age>
        </div>
        <div class="bcenter">
          <Map></Map>
          <Line></Line>
        </div>
        <div class="bright">
          <Rank></Rank>
          <Counter></Counter>
          <Statistic></Statistic>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Top from "./components/Top/index.vue"
import Tourist from "./components/Tourist/index.vue"
import Gender from "./components/Gender/index.vue"
import Age from "./components/Age/index.vue"
import Map from "./components/Map/index.vue"
import Line from "./components/Line/index.vue"
import Rank from "./components/Rank/index.vue"
import Counter from "./components/Counter/index.vue"
import Statistic from "./components/Statistic/index.vue"

import { ref, onMounted } from "vue"


let box = ref()


const getScale = (screenWidth = 1920, screenHeight = 1080) => {
  let wScale = window.innerWidth / screenWidth;
  let hScale = window.innerHeight / screenHeight;
  return wScale < hScale ? wScale : hScale
}


onMounted(() => {
  box.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

window.addEventListener("resize", () => {
  box.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})



</script>


<style lang="scss" scoped>
.screen-container {
  width: 100Vw;
  height: 100vh;
  background: url("./images//bg.png") no-repeat;
  background-size: cover;

  .box {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1920px; //按照基准1920px和1080px进行放缩
    height: 1080px;
    transform-origin: left top; //设置变换原点在屏幕的正中央

    .top {
      height: 45px;
      display: flex;
    }

    .bottom {
      height: calc(1080px - 38px);
      display: flex;

      .bleft {
        margin-left: 50px;
        flex: 1;
      }

      .bcenter {
        flex: 2.5;
      }

      .bright {
        flex: 1;
        margin-top: 10px;
        margin-right: 50px;
        margin-left: -40px;
      }
    }
  }
}
</style>