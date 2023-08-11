import { createRouter, createWebHashHistory } from "vue-router";
import { constRoutes } from "./routes"
import { useUserStore } from "@/store/modules/userStore";
import setting from "@/setting";
import { ElMessage } from "element-plus"
const router = createRouter({
  history: createWebHashHistory(),//hash模式
  //注测常量路由
  routes: constRoutes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  //token为空
  if (!userStore.token) {
    if (to.path == '/login') {
      next();
    }
    else {
      next("/login")
    }
  }
  else {
    if (to.path == "/login") {
      next(false);
    }
    else {
      if (userStore.username) {
        next()
      }
      else {
        try {
          await userStore.getUserInfo()
          next({ ...to, replace: true })
        }
        catch (error) {
          //没有获取到用户信息，可能是token过期了，或者是用户修改了token，需要退出登录

          //还有一种情况，用户修改了自己的账号，这时候在用户在服务器的token就发生了变化，那这时候拿着旧的token去给服务器就核对不上了，就会出错
          try {
            //logout这一步很重要
            await userStore.userLogout();
            next("/login")
          }
          catch (error1) {
            ElMessage.error((<Error>error1).message);
          }
        }
      }


    }
  }
})
//全局后置路由守卫
router.afterEach((to, from, next) => {
  document.title = `${setting.name}-${to.meta.title}`
})


export default router;
