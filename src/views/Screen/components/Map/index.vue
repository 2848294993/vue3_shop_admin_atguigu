<template>
  <div class="map-container">
    <div class="title">景 区 实 时 客 流 量</div>
    <div class="main-box">
      <div class="map" ref="map"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
import chinaJSON from "./china.json"

let map = ref()

onMounted(() => {
  let myMap = echarts.init(map.value)
  echarts.registerMap("china", chinaJSON as any)
  myMap.setOption({
    geo: {
      map: "china",
      label: {
        show: true,//文字显示出来
        color: 'white',
        fontSize: 13
      },
      roam: true,
      top: 0,
      bottom: -100,
      emphasis: {
        label: {
          color: "#fff",
          show: true,
          fontSize: 40
        },

        itemStyle: {
          areaColor: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#073684" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#2B91B7" // 100% 处的颜色
              }
            ]
          }
        }
      },
      itemStyle: {

        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#073684" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#061E3D" // 100% 处的颜色
            }
          ]
        },
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "#00F6FF"
            },
            {
              offset: 1,
              color: "#87ADCB"
            }
          ],
          false
        ),
      },


    },
    series: [
      {
        type: 'lines',//航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989],  // 起点
              [119.306239, 26.075302]   // 终点

            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 5
            }
          },
          {
            coords: [
              [116.405285, 39.904989],  // 起点
              [114.298572, 30.584355]   // 终点

            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 5
            }
          }
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10
        }
      }
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0
    }
  })
})

</script>


<style lang="scss" scoped>
.map-container {
  margin-top: 120px;
  margin-left: 40px;

  .title {
    height: 30px;
    width: 300px;
    background: url(../../images/map-title-bg.png) no-repeat;
    background-size: cover;
    line-height: 30px;
    padding-left: 50px;
    color: #fff;
    font-weight: 600;
  }

  .main-box {
    height: 700px;

    .map {
      height: 100%;
    }
  }
}
</style>