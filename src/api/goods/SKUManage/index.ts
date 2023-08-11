import request from "@/utils/request";
import type { SKUListResponseType, skuInfoType } from "./type"

export const getSKUListApi = (page: number, limit: number) => {
  return request.get<any, SKUListResponseType>(`/admin/product/list/${page}/${limit}`)
}

export const cancelSaleApi = (skuId: number) => {
  return request.get<any, any>(`/admin/product/cancelSale/${skuId}`)
}

export const onSaleApi = (skuId: number) => {
  return request.get<any, any>(`/admin/product/onSale/${skuId}`)
}

export const getOneSKUInfoBySkuId = (skuId: number) => {
  return request.get<any, skuInfoType>(`/admin/product/getSkuInfo/${skuId}`)
}

export const deleteSKUApi = (skuId: number) => {
  return request.delete<any, any>(`/admin/product/deleteSku/${skuId}`)
}