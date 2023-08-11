<template>
  <div class="line-container">
    <h3>未来30天游客量趋势图</h3>
    <div class="title-img"></div>
    <div class="main-box">
      <div class="line" ref="line"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as echarts from "echarts"

let line = ref()

onMounted(() => {
  let myLine = echarts.init(line.value)
  myLine.setOption({
    //标题组件
    //x|y轴
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //轴线的设置
      axisLine: {
        show: true
      },
      //刻度
      axisTick: {
        show: true
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      //轴线的设置
      axisLine: {
        show: true
      },
      //刻度
      axisTick: {
        show: true
      }
    },
    grid: {
      left: 40,
      top: 20,
      right: 20,
      bottom: 20
    },
    //系列
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
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
    ]
  })
})


</script>


<style lang="scss" scoped>
.line-container {
  position: fixed;
  top: 900px;
  left: 470px;
  margin-top: -40px;
  margin-left: 20px;
  height: 200px;
  width: 950px;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
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
    height: 160px;

    .line {
      height: 100%;
    }
  }
}
</style>