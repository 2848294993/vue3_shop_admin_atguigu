<template>
  <div class="gender-container">
    <h3>男女比例</h3>
    <div class="title-img"></div>
    <div class="main-box">

      <div class="img-box">
        <div class="man">男士
          <div class="man-avatar">
            <img src="../../images/man.png">
          </div>
        </div>
        <div class="woman">女士
          <div class="woman-avatar">
            <img src="../../images/woman.png">
          </div>
        </div>
      </div>
      <div class="ratio-box">
        <div class="text">
          <div class="mantext">男士58%</div>
          <div class="womantext">女士42%</div>
        </div>
        <!-- 比例图区域 -->
        <div class="ratio" ref="ratio"></div>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts'
let ratio = ref()

onMounted(() => {
  let myRatio = echarts.init(ratio.value)
  myRatio.setOption({
    xAxis: {
      min: 0,
      max: 100,
      show: false,
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        itemStyle: {
          color: "#007afe",
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        itemStyle: {
          color: "#ff4b7a",
          borderRadius: 20
        },
        barGap: '-100%',
        z: 0
      }
    ],
    grid: {
      left: '12%',
      top: 0,
      right: '12%',
      bottom: 0
    }
  })
}

)

</script>


<style lang="scss" scoped>
.gender-container {
  margin-top: 10px;
  height: 30%;
  background: url("../../images/dataScreen-main-lc.png") no-repeat;
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
    .img-box {
      margin-top: 50px;
      display: flex;
      justify-content: space-evenly;

      .man {
        width: 111px;
        height: 116px;
        background: url("../../images/man-bg.png") no-repeat;
        background-size: cover;
        text-align: center;
        color: white;

        img {
          margin-top: 20px;
          width: 50%;
        }
      }

      .woman {
        width: 111px;
        height: 116px;
        background: url("../../images/woman-bg.png") no-repeat;
        background-size: cover;
        text-align: center;
        color: white;


        img {
          margin-top: 20px;
          width: 50%;
        }
      }
    }

    .ratio-box {
      margin-top: 20px;

      .text {
        display: flex;
        margin-left: 15%;
        margin-right: 15%;
        justify-content: space-between;
        color: white;
      }

      .ratio {

        height: 50px;
      }
    }


  }
}
</style>