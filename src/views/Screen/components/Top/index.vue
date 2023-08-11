<template>
  <div class="tleft">
    <div class="indexBtn" @click="goToIndex">首页</div>
  </div>
  <div class="tcenter">智慧旅游可视化大数据展示平台
    <div class="subTitle">平 台 高 峰 预 警 信 息 ( 2 条 )</div>
  </div>
  <div class="tright">
    <div class="rBtn">统计报告</div>
    <span>当前时间:{{ dateTime }}</span>
  </div>
</template>


<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue"
import { useRouter } from 'vue-router';

const $router = useRouter()
let intervalId = ref<number>()
let dateTime = ref<string>("")

const getDateTime = () => {
  const dateTime = new Date();
  const yy = dateTime.getFullYear();
  const mm = dateTime.getMonth() + 1;
  const dd = dateTime.getDate();
  const hh = dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours();
  const MM = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes();
  const ss = dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds();
  return `${yy}年${mm}月${dd}日 ${hh}:${MM}:${ss}`
}

dateTime.value = getDateTime()

intervalId.value = setInterval(() => {
  console.log("hello");

  dateTime.value = getDateTime()
}, 1000)


const goToIndex = () => {
  $router.push("/")
}

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})

</script>


<style lang="scss" scoped>
.tleft {
  flex: 1.3;
  background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
  background-size: contain;

  .indexBtn {
    float: right;
    width: 135px;
    height: 42px;
    background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
    text-align: center;
    line-height: 42px;
    color: cyan;
    font-weight: 700;
    font-style: italic;
    cursor: pointer;
  }
}

.tcenter {
  flex: 2;
  height: 74px;
  background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
  background-size: (100%, 100%);
  font-size: 30px;
  font-weight: 800;
  color: cyan;
  font-style: italic;
  text-align: center;
  line-height: 74px;

  .subTitle {
    background: url("../../images/dataScreen-header-warn-bg.png") no-repeat;
    height: 44px;
    width: 622px;
    margin: 0 auto;
    color: white;
    font-weight: 800;
    font-style: italic;
    font-size: 16px;
    line-height: 44px;
  }
}

.tright {
  flex: 1.3;
  display: flex;
  justify-content: space-between;
  background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
  background-size: contain;

  .rBtn {
    width: 135px;
    background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
    text-align: center;
    line-height: 42px;
    color: cyan;
    font-weight: 700;
    font-style: italic;
    cursor: pointer;
  }

  span {
    margin-right: 70px;
    line-height: 35px;
    color: cyan;
    font-weight: 700;
    font-style: italic;

  }
}
</style>