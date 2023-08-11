<template>
  <!-- svg是外层容器，内部需要与use标签结合使用 -->
  <!-- 可以设置图标大小 -->
  <svg :style="{ width: width, height: height }">
    <!-- fill设置图标的颜色 -->
    <!-- slink: href 指定要使用哪一个图标,属性值务必是# icon-图标名字 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '#000',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style lang="scss" scoped></style>
