<template>
  <div class="tourist-container">
    <h3>实时游客统计</h3>
    <div class="title-img"></div>
    <p>可预约总量<span>999999</span>人</p>
    <div class="main-box">
      <div class="top-number">
        <div v-for="(item, index) in people" :key="index">{{ item }}</div>
      </div>
      <!-- 水球图区域 -->
      <div class="ball" ref="liquidfill"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue"

import * as echarts from 'echarts';
import 'echarts-liquidfill'

let people = ref<string>("216908人")

let liquidfill = ref()


function Pie() { // 外层虚线圈数据
  let dataArr = [];
  for (var i = 0; i < 150; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 50,
        itemStyle: {
          color: '#19A4BB',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 100,
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      });
    }
  }
  return dataArr;
}

const rate = 0.5
let option = {
  polar: {
    radius: ['75%', '80%'],
    center: ['50%', '50%'],
  },
  angleAxis: {
    max: 100,
    clockwise: false,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    startAngle: 180
  },
  radiusAxis: {
    type: 'category',
    show: true,
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    { // 水波球
      // value: 50, //  内容 配合formatter
      type: 'liquidFill',
      name: '预估量',
      radius: '70%', // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
      center: ['50%', '50%'],
      data: [
        rate,
        rate,
        rate
      ], // data个数代表波浪数
      backgroundStyle: {
        borderWidth: 1,
        borderColor: "#31d7d4",
        color: '#11144e', // 球体本景色
      },
      amplitude: '10%', //波浪的振幅
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: '#22a5ba',
            },
            {
              offset: 0,
              color: '#34f5b5',
            },
          ],
          globalCoord: false,
        },
      ],
      label: {
        formatter: '{a}',
        fontSize: 20,
        color: '#fff',
        position: ['50%', '20%'],
      },
      outline: {
        show: false,
      },
    },
    { // 外层虚线环
      type: 'pie',
      zlevel: 0,
      silent: true,
      radius: ['76%', '78%'],
      z: 1,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: Pie(),
    },
    { // 进度条环
      name: '',
      type: 'bar',
      roundCap: true,
      z: 2,
      showBackground: false,
      data: [rate * 100],
      coordinateSystem: 'polar',
      barWidth: 30, //大的占比环
      itemStyle: {
        opacity: 1,
        color: "#31d8d5",
      },
    },
  ],
};

onMounted(() => {
  let myLiquidFill = echarts.init(liquidfill.value)
  myLiquidFill.setOption(option)
})


</script>


<style lang="scss" scoped>
.tourist-container {
  margin-top: 10px;
  height: 37%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
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

  p {
    float: right;
    margin-right: 10px;
    color: white;

    span {
      color: orangered;
      font-style: italic;
    }
  }

  .main-box {
    .top-number {
      display: flex;
      margin-top: 40px;
      justify-content: center;

      &>div {
        background: url(../../images/total.png) no-repeat;
        background-size: cover;
        height: 53px;
        width: 53px;
        margin-left: 2px;
        line-height: 55px;
        text-align: center;
        color: cyan;
        font-size: 34px;
        font-weight: 500;
      }
    }

    .ball {
      height: 250px
    }
  }
}
</style>