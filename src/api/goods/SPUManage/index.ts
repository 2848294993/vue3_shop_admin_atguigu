import request from "@/utils/request";

import type { SPUListType, saleAttrListType, imgListType, trademarkListType, SPUBaseInfoType, SPUType, saleAttrInfoListType, skuType, skuListBySpuType } from "./type"

export const getSPUListApi = (pageNo: number, pageSize: number, cat3ID: number) => {
  return request.get<any, SPUListType>(`/admin/product/${pageNo}/${pageSize}?category3Id=${cat3ID}`)
}

//获取一共有多少个销售属性
export const getSaleAttrsListApi = () => {
  return request.get<any, saleAttrListType>("/admin/product/baseSaleAttrList")
}

//获取销售属性的相关信息，包括销售属性值
export const getSaleAttrsInfoApi = (spuId: number) => {
  return request.get<any, SPUBaseInfoType>(`/admin/product/getSpuInfo/${spuId}`)
}

//获取品牌数据
export const getTrademarkListApi = () => {
  return request.get<any, trademarkListType>("/admin/product/baseTrademark/getTrademarkList")
}

//获取图片数据
export const getSPUImgListApi = (spuId: number) => {
  return request.get<any, imgListType>(`/admin/product/spuImageList/${spuId}`)
}

//更新SPU或者增加SPU
export const updateorAddSPUApi = (SPUForm: SPUType) => {
  if (SPUForm.id) {
    return request.post<any, any>("/admin/product/updateSpuInfo", SPUForm)
  }
  else {
    console.log("zhezhe");

    return request.post<any, any>("/admin/product/saveSpuInfo", SPUForm)
  }
}

//获取该SPU的销售属性
export const getComAttrListApi = (spuId: number) => {
  return request.get<any, saleAttrInfoListType>(`/admin/product/spuSaleAttrList/${spuId}`)
}

export const addSKUApi = (skuform: skuType) => {
  return request.post<any, any>("/admin/product/saveSkuInfo", skuform)
}

export const getSKUListBySPUIdApi = (spuId: number) => {
  return request.get<any, skuListBySpuType>(`/admin/product/findBySpuId/${spuId}`)
}


export const deleteSPUApi = (spuId: number) => {
  return request.delete<any, any>(`/admin/product/deleteSpu/${spuId}`)
}