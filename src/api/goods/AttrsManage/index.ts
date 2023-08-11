import request from "@/utils/request";
import { categoryResponseType, getAttrResponseType, attrType, getOneAttrDataResponseType } from "./type"

export const getCat1ListApi = () => {
  return request.get<any, categoryResponseType>("/admin/product/getCategory1")
}
export const getCat2ListApi = (category1ID: number) => {
  return request.get<any, categoryResponseType>(`/admin/product/getCategory2/${category1ID}`)
}

export const getCat3ListApi = (category2ID: number) => {
  return request.get<any, categoryResponseType>(`/admin/product/getCategory3/${category2ID}`)
}

export const getAttrListApi = (category1ID: number, category2ID: number, category3ID: number) => {
  return request.get<any, getAttrResponseType>(`/admin/product/attrInfoList/${category1ID}/${category2ID}/${category3ID}`)
}

export const addOrUpdateAttrApi = (attrForm: attrType) => {
  console.log(attrForm);

  return request.post<any, any>("/admin/product/saveAttrInfo", attrForm)
}

export const getOneAttrDataApi = (attrId: number) => {
  return request.get<any, getOneAttrDataResponseType>(`/admin/product/getAttrValueList/${attrId}`);
}

export const deleteAttrApi = (attrId: number) => {
  return request.delete<any, any>(`/admin/product/deleteAttr/${attrId}`)
}