import request from "@/utils/request"
import { loginResponseType, loginFormType, userInfoResponseType, logoutResponseType } from "./type";

export const login = (loginForm: loginFormType) => {
  return request.post<any, loginResponseType>("/admin/acl/index/login", loginForm);
}

export const getuserinfo = () => {
  return request.get<any, userInfoResponseType>("/admin/acl/index/info");
}

export const logout = () => {
  return request.post<any, logoutResponseType>("/admin/acl/index/logout");
}