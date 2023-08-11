import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/userStore'
import NProgress from "nprogress";
import "nprogress/nprogress.css"
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  NProgress.start();
  const userStore = useUserStore();
  config.headers.token = userStore.token;
  return config;
})

request.interceptors.response.use((response) => {
  NProgress.done();
  return response.data;
},
  (err) => {
    //err为AxiosError对象，err.resopnse.status存放了错误的代码
    let msg = "";

    let status = err.response.status;
    switch (status) {
      case 401:
        msg = "token过期"
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = "服务器出现问题"
        break
      default:
        msg = "网络出现问题"
    }
    ElMessage.error(msg);
    return Promise.reject(err);
  }
)

export default request;