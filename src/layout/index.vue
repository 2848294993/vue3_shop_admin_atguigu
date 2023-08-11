<template>
  <div class="layout-container">

    <div class="left">
      <!-- Logo区域 -->
      <Logo></Logo>
      <!-- 左侧菜单 -->
      <!-- 设置侧边栏的滚动条 -->
      <el-scrollbar>
        <el-menu router background-color="#001529" text-color="white" unique-opened :default-active="$router.path"
          :collapse="settingStore.fold">
          <Menu :menuList="userStore.routeList">
          </Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right">
      <div class="top" :class="{ 'fold': settingStore.fold }">
        <Tabbar></Tabbar>
      </div>

      <div class="content" :class="{ 'fold': settingStore.fold }">
        <Main></Main>
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import Menu from "./Menu/index.vue"
import Main from "./Main/index.vue"
import Logo from "./Logo/index.vue"
import Tabbar from "./Tabbar/index.vue"
import { useUserStore } from "@/store/modules/userStore"
import { useSettingStore } from "@/store/modules/settingStore"
import { useRoute } from "vue-router";
let $router = useRoute();
let settingStore = useSettingStore();
let userStore = useUserStore();


</script>


<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  height: 100%;
  position: relative;
  display: flex;

  .left {
    height: 100vh;
    width: $menu-width;
    background-color: #001529;


    .el-scrollbar {
      height: calc(100vh - $logo-height);

      .el-menu {
        border: 0px;
      }
    }

  }



  .right {
    height: 100vh;
  }

  .top {
    position: fixed;
    left: $menu-width;
    top: 0;
    // background-color: #fff;
    height: $tabbar-height;
    width: (100vw - $menu-width);
    transition: all .5s;

    &.fold {
      left: $menu-width-fold;
      width: calc(100vw - $menu-width-fold);
    }
  }

  .content {
    // position: absolute;
    // left: $menu-width;
    // top: $tabbar-height;
    margin-top: $tabbar-height;
    height: $tabbar-height;
    width: calc(100vw - $menu-width);
    height: calc(100vh - $tabbar-height);
    overflow-y: auto; //设置滚动条，即如果内容的高度没有超过设定给盒子设定的高度，滚动条隐藏，否则，滚动条展示
    transition: all .5s;
    // background-color: #fff;

    &.fold {
      left: $menu-width-fold;
      width: calc(100vw - $menu-width-fold);
    }
  }





}
</style>