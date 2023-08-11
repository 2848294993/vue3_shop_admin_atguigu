import request from "@/utils/request";
import type { roleListResponseType, roleType, menuListResponseType } from "./type.ts"

export const getRoleListApi = (page: number, limit: number, roleName: string) => {
  return request.get<any, roleListResponseType>(`/admin/acl/role/${page}/${limit}/?roleName=${roleName}`)
}

export const addRoleApi = (roleForm: roleType) => {
  return request.post<any, any>("/admin/acl/role/save", roleForm)
}

export const editRoleApi = (roleForm: roleType) => {
  return request.put<any, any>("/admin/acl/role/update", roleForm)
}

export const getMemuListApi = (roleId: number) => {
  return request.get<any, menuListResponseType>(`/admin/acl/permission/toAssign/${roleId}`)
}


export const distributeRightApi = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(`/admin/acl/permission/doAssign/?roleId=${roleId}&permissionId=${permissionId}`)
}

export const deleteRoleApi = (id: number) => {
  return request.delete<any, any>(`/admin/acl/role/remove/${id}`)
}