<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由的情况 -->

    <el-menu-item v-if="!item.children && item.meta.show" :index="item.path + ''">
      <!-- 为了图标，套上一层template -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        {{ item.meta.title }}
      </template>
    </el-menu-item>
    <!-- 有一个子路由的情况 -->
    <template v-if="item.children && item.children.length == 1">
      <!-- 注意要考虑到该子路由里再嵌套了多个路由的情况 -->
      <Menu :menuList="item.children"></Menu>

    </template>
    <!-- 有多个子路由的情况 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">


      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span> {{ item.meta.title }}</span>

      </template>

      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>


<script setup lang="ts">
defineProps(["menuList"]);

</script>

<script lang="ts">
export default {
  name: "Menu"
}
</script>


<style lang="scss" scoped></style>