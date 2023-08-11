import request from "@/utils/request";

import type { menuListResponseType, menuFormType } from "./type"

export const getMenuListApi = () => {
  return request.get<any, menuListResponseType>("/admin/acl/permission")
}

export const addMenuApi = (menuForm: menuFormType) => {
  return request.post<any, any>("/admin/acl/permission/save", menuForm)
}

export const editMenuApi = (menuForm: menuFormType) => {
  return request.put<any, any>("/admin/acl/permission/update", menuForm)
}

export const deleteMenuApi = (id: number) => {
  return request.delete<any, any>(`/admin/acl/permission/remove/${id}`)
}