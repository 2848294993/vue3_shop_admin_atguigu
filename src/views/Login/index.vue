<template>
  <div class="login-container">
    <el-row>
      <!-- xs用来设置响应式，表示<768px 响应式栅格数 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
          <h1>L O G I N</h1>
          <h3>欢迎来到白马商城</h3>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" show-password :prefix-icon="Lock" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userLogin(loginFormRef)" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
// import { Md5 } from "ts-md5"
import { useUserStore } from "@/store/modules/userStore"
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue"
import { FormInstance, ElMessageBox, ElMessage, ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import greet from "@/utils/time"
// 加密方法：Md5.hashStr()
let loading = ref(false)
let loginForm = reactive({ username: "admin", password: "atguigu123" })
const loginFormRef = ref();
const router = useRouter();
const userLogin = async (loginFormObject: FormInstance) => {
  loading.value = true
  await loginFormObject.validate(async (valid) => {
    if (valid) {//校验成功
      // const password = Md5.hashStr(loginForm.password);
      try {
        await useUserStore().userLogin({ username: loginForm.username, password: loginForm.password });
        router.push("./");//跳转到首页
        // 显示问候消息
        ElNotification({
          title: `Hi,${greet}`,
          message: '欢迎您',
          type: 'success',
          duration: 2000
        })
      }
      catch (err) {
        ElMessage.error((<Error>err).message)
      }
      loading.value = false;
    }
    else { //校验失败
      ElMessageBox.alert("账号名或密码不符合规范", "出错啦", {
        confirmButtonText: 'OK',
        callback: () => {
          ElMessage({
            type: 'info',
            message: "登录失败",
          })
        },
      })
    }
  })

}
let loginFormRules = {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 5, max: 20, message: "账号的长度应该在5~20之间", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码的长度应该在6~20之间", trigger: "blur" }
  ]
}
</script>


<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/background.jpg") no-repeat;
  background-size: cover;
}

.el-form {
  width: 80%;
  padding: 60px 40px;
  background: url("../../assets/images/login_form.png") no-repeat;
  position: relative;
  top: 25vh;

  h1 {
    margin: 10px 0px;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #fff;

  }

  .el-button {
    width: 100%;
  }
}
</style>@/store/modules/userStore