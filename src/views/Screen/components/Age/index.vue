<template>
  <div class="age-container">
    <h3>年龄比例</h3>
    <div class="title-img"></div>
    <div class="main-box">
      <div class="age" ref="age"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as echarts from "echarts"


let age = ref()

let colors = ["#F6C95C", "#EF7D33", "#1F9393", "#184EA1", "#81C8EF", "#9270CA"]
onMounted(() => {
  let myAge = echarts.init(age.value)
  myAge.setOption({
    tooltip: {
      trigger: 'item',
      formatter: "{b} <br/>占比：{d}%"
    },
    color: colors,
    legend: {
      right: 30,
      top: 15,
      orient: 'vertical',//图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14
      }
    },
    series: {
      type: 'pie',
      radius: ['30%', '80%'],
      data: [
        {
          value: 500, name: '20-40岁', itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[0],
            borderRadius: 10
          }
        },
        {
          value: 435, name: '40-50岁', itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[1],
            borderRadius: 10
          }
        },
        {
          value: 420, name: '10-20岁',
          itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[2],
            borderRadius: 10
          }
        },
        {
          value: 410, name: '50岁-60岁', itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[3],
            borderRadius: 10
          }
        },
        {
          value: 300, name: '60岁以上', itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[4],
            borderRadius: 10
          }
        },
        {
          value: 279, name: '10岁以下', itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[5],
            borderRadius: 10
          }
        },

      ],
      label: {
        show: true,
        position: 'inside',
        formatter: "{d}%",
        color: '#fff',
        fontSize: '16px'
      },
      left: 0,
      width: '70%',
      itemStyle: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowBlur: 10
      },
    },
    grid: {
      left: 0,
      right: "40%"
    }
  })
})



</script>


<style lang="scss" scoped>
.age-container {
  margin-top: 10px;
  height: 27%;
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
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
    .age {
      margin-top: 30px;
      height: 210px;
    }
  }
}
</style>