import { defineStore } from "pinia";

import { ref } from "vue";

import { login, getuserinfo, logout } from "@/api/login";
import { constRoutes, asyncRoutes, anyRoute } from "@/router/routes";
import { cloneDeep } from "lodash"
import type { RouteRecordRaw } from "vue-router";
import router from "@/router"


let filterAsyncRouter = (roleRouters: string[], asyncRoutes: RouteRecordRaw[]) => {
  return asyncRoutes.filter(item => {
    if (roleRouters.includes(<string>item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRouter(roleRouters, item.children)
      }
      //记得一定要return true
      return true
    }
  })

}
export const useUserStore = defineStore('userStore', () => {
  let token = ref(localStorage.getItem("token"));
  let useravatar = ref("");
  let username = ref("");
  let routeList = ref<RouteRecordRaw[]>(constRoutes);
  let buttonList = ref<string[]>([])
  //使用组合式的pinia
  async function userLogin(loginForm: { username: string, password: string }) {

    let res = await login(loginForm);

    if (res.code == 200) {
      token.value = res.data!;
      localStorage.setItem("token", res.data!)
      return "登录成功"
    }
    else {
      //可能是token过期了或者是用户手动地修改了token
      //那么这时候就需要退出登录
      throw new Error("登录失败")
    }
  }
  //退出登录
  async function userLogout() {
    //向服务器发送退出登录的请求
    let res = await logout();
    if (res.code == 200) {
      //清空本地的token
      localStorage.removeItem("token");
      //清空仓库的token
      token.value = "";
      useravatar.value = "";
      username.value = "";
    }
    else {
      throw new Error("出现了一点问题");
    }
  }

  async function getUserInfo() {
    let res = await getuserinfo();
    console.log(res);

    if (res.code == 200) {
      useravatar.value = res.data!.avatar
      username.value = res.data!.name
      //根据返回来的用户信息过滤异步路由，确定该用户拥有哪些异步路由
      let filteredAsyncRoutes = filterAsyncRouter(res.data?.routes!, cloneDeep(asyncRoutes))
      routeList.value = [...constRoutes, ...filteredAsyncRoutes, anyRoute];
      [...filteredAsyncRoutes, anyRoute].forEach(item => {
        router.addRoute(item)
      })
      buttonList.value = res.data?.buttons!
    }
    else {
      throw new Error(res.message)
    }
  }
  return {
    token,
    useravatar,
    username,
    routeList,
    buttonList,
    userLogin,
    userLogout,
    getUserInfo
  }
})