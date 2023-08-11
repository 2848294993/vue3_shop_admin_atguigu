<template>
  <div class="counter-container">
    <h3>年度游客量对比</h3>
    <div class="title-img"></div>
    <div class="main-box">
      <div class="counter" ref="counter"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from "echarts"

let counter = ref()

onMounted(() => {
  let myCounter = echarts.init(counter.value)
  myCounter.setOption({
    xAxis: {
      type: "category"
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    grid: {
      top: 20,
      bottom: 20,
      left: 10,
      right: 10

    },

    series: {
      type: 'scatter',
      label: {
        show: true,
        position: "top",
        color: "red"
      },
      symbol: "diamond",
      symbolSize: 16,
      data: [33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313, 123, 5, 657, 7],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red' // 0% 处的颜色
          }, {
            offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }

    }
  })
})



</script>


<style lang="scss" scoped>
.counter-container {
  height: 30%;
  margin-top: 10px;

  background: url("../../images/dataScreen-main-rc.png") no-repeat;
  background-size: cover;



  h3 {
    font-style: italic;
    font-size: 16px;
    color: white;
    font-weight: 800;
  }

  .title-img {
    margin-top: 10px;
    height: 7px;
    background: url(../../images/dataScreen-title.png) no-repeat;
  }

  .main-box {
    height: 270px;

    .counter {
      height: 100%;
    }
  }
}
</style>