<template>
  <div class="tabbar-container">
    <div class="tabbar_left">
      <el-icon class="foldicon">
        <component :is="settingStore.fold?'Expand':'Fold'" @click="changeFold"></component>
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb :separator-icon="'ArrowRight'">
        <el-breadcrumb-item v-for="item in $route.matched" :to="item.path" v-show="item.path != '/'">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <!-- 刷新按钮 -->
      <el-button :icon="'Refresh'" circle @click="refresh" />
      <!-- 全屏按钮 -->
      <el-button :icon="'FullScreen'" circle @click="fullScreen" />
      <!-- 设置按钮 -->

      <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <el-form>
          <el-form-item label="暗黑模式:">
            <el-switch v-model="selectVal" inline-prompt active-icon="MoonNight" inactive-icon="Sunny"
              @change="selectValChange" />
          </el-form-item>
          <el-form-item label="主题颜色:">
            <el-color-picker v-model="selectedColor" show-alpha :predefine="predefineColors" size="small"
              @change="changeThemeColor" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button :icon="'Setting'" circle />
        </template>
      </el-popover>

      <!-- 头像 -->
      <img :src="userStore.useravatar" style="width: 30px;height: 30px; border-radius: 50%;">
      <!-- 退出登录 -->
      <el-dropdown>
        <span>
          {{ userStore.username }}
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue"
import { useSettingStore } from "@/store/modules/settingStore";
import { useUserStore } from "@/store/modules/userStore";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
let selectVal = ref<boolean>(false)
let selectedColor = ref<string>('#409eff')
let settingStore = useSettingStore();
let userStore = useUserStore();
const $route = useRoute();
const $router = useRouter();

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeFold = () => {
  settingStore.fold = !settingStore.fold;
}

const refresh = () => {
  settingStore.refresh = !settingStore.refresh;
}

const logout = async () => {
  try {
    await userStore.userLogout();
    $router.push("/login")
  }
  catch (error) {
    ElMessage.error((<Error>error).message)
  }

}

const fullScreen = () => {
  let full = document.fullscreenElement;
  if (full) {
    //全屏状态
    //退出全屏
    document.exitFullscreen();
  }
  else {
    //全屏
    document.documentElement.requestFullscreen();
  }
}

const selectValChange = () => {
  let html = document.documentElement
  selectVal.value ? html.className = "dark" : html.className = ""
}

const changeThemeColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', selectedColor.value)
}



</script>


<style lang="scss" scoped>
.tabbar-container {
  height: $tabbar-height;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  // border-bottom: 2px solid rgb(216, 216, 216);
  // box-shadow: 0px 2px rgb(216, 216, 216);

  .tabbar_left {
    height: 100%;
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;


    .foldicon {
      margin-right: 10px;
    }

    .el-breadcrumb {
      .el-icon {
        margin-right: 5px;
      }

      span {
        vertical-align: top;
      }
    }
  }

  .tabbar_right {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      margin: 0px 10px;
    }
  }
}
</style>