<template>
  <div class="statistic-container">
    <h3>数据统计</h3>
    <div class="title-img"></div>
    <div class="main-box">
      <div class="statistic" ref="statistic"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from "echarts"

let statistic = ref()

onMounted(() => {
  let myStatistic = echarts.init(statistic.value)
  myStatistic.setOption({

    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 }
      ]
    },
    series:


    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '购物'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '吃饭'
        }
      ]
    }

  })
})


</script>


<style lang="scss" scoped>
.statistic-container {
  height: 27%;
  background-color: #fff;
  margin-top: 10px;
  background: url("../../images/dataScreen-main-rb.png") no-repeat;
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
    height: 250px;

    .statistic {
      height: 100%;
    }
  }
}
</style>