<template>
  <div class="rank-container">
    <h3>热门景区排行</h3>
    <div class="title-img"></div>
    <div class="main-box">
      <div class="rank" ref="rank"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as echarts from "echarts"

let color = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']

let rank = ref()

onMounted(() => {
  let myRank = echarts.init(rank.value)
  myRank.setOption({
    xAxis: {
      type: "category"

    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      }

    },
    grid: {
      top: 30,
      left: 30,
      right: 20,
      bottom: 20

    },
    series: [
      {
        type: "bar",
        data: [10, 20, 30, 40, 50, 60, 70],
        itemStyle: {
          color: function (data: any) {
            return color[data.dataIndex]
          },

        }
      },
      {
        type: "bar",
        data: [10, 20, 30, 40, 50, 60, 70],
        itemStyle: {
          color: function (data: any) {
            return color[data.dataIndex]
          },

        }
      }
    ]
  })
})


</script>


<style lang="scss" scoped>
.rank-container {
  height: 37%;
  background: url(../../images/dataScreen-main-rt.png) no-repeat;
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
    height: 340px;

    .rank {
      height: 100%;
    }
  }
}
</style>