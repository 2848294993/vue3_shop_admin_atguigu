import request from "@/utils/request";
import type { userListResponseType, userType, roleListResponseType } from "./type"


export const getUserListApi = (page: number, limit: number, usernamekeyword: string, namekeyword: string) => {
  return request.get<any, userListResponseType>(`/admin/acl/user/${page}/${limit}`, { params: { username: usernamekeyword, name: namekeyword } })
}

export const addUserApi = (userform: userType) => {
  return request.post<any, any>("/admin/acl/user/save", userform)
}

export const editUserApi = (userform: userType) => {
  return request.put<any, any>("/admin/acl/user/update", userform)
}

export const getAllRoleApi = (adminId: number) => {
  return request.get<any, roleListResponseType>(`/admin/acl/user/toAssign/${adminId}`)
}

export const assignRoleApi = (roleIdList: number[], userId: number) => {
  return request.post<any, any>("/admin/acl/user/doAssignRole", { roleIdList, userId })
}

export const deleteUserApi = (id: number) => {
  return request.delete<any, any>(`/admin/acl/user/remove/${id}`)
}

export const deleteUserByGroupApi = (deleteUserId: number[]) => {
  return request.delete<any, any>("/admin/acl/user/batchRemove", { data: deleteUserId })
}