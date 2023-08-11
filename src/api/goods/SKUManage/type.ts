import type { skuListType, saleAttrInfoType, imgType } from "@/api/goods/SPUManage/type"
import type { attrValueType } from "@/api/goods/AttrsManage/type"

interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface SKUListResponseType extends commonType {
  data: {
    records: skuListType[],
    total: number
  }
}

export interface skuInfoType extends commonType {
  data: skuInfoDataType
}

export interface skuInfoDataType {
  id?: number,
  spuId?: number,
  price: number,
  skuName: string,
  skuDesc: string,
  weight?: number | string,
  tmId?: number,
  category3Id?: number,
  skuDefaultImg?: string,
  isSale?: number,
  skuAttrValueList: attrValueType[],
  skuSaleAttrValueList: saleAttrInfoType[],
  skuImageList: imgType[]
}
