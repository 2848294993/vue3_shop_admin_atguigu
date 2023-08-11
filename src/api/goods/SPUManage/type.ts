interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface saleAttrValueType {
  id?: number | string,
  spuId?: number,
  baseSaleAttrId: number | string,
  saleAttrValueName: string,
  saleAttrName?: string,
}

export interface saleAttrInfoType {
  id?: number | string,
  spuId?: number,
  baseSaleAttrId: number | string,
  saleAttrName: string,
  spuSaleAttrValueList: saleAttrValueType[],
  currentIndex?: number
  saleAttrIdAndVid?: string
}

export interface imgType {
  id?: number,
  imgName?: string,
  imgUrl?: string,
  name?: string,
  url?: string

}


export interface SPUType {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuName: string,
  description: string,
  category3Id: number | string,
  tmId: number | string,
  spuSaleAttrList: null | saleAttrInfoType[],
  spuImageList: null | imgType[],
  spuPosterList?: null
}

export interface SPUListType extends commonType {
  data: {
    records: SPUType[],
    total: number,
    size?: number,
    current?: number,
    orders?: [],
    optimizeCountSql?: boolean,
    hitCount?: boolean,
    countId?: null,
    maxLimit?: null,
    searchCount?: boolean,
    pages?: number
  }
}

export interface saleAttrType {
  id: number,
  name: string
}
export interface saleAttrListType extends commonType {
  data: saleAttrType[]
}

export interface imgListType extends commonType {
  data: imgType[]
}

export interface trademarkType {
  id: number,
  tmName: string,
}

export interface trademarkListType extends commonType {
  data: trademarkType[]
}

export interface SPUBaseInfoType extends commonType {
  data: SPUType
}

export interface saleAttrInfoListType extends commonType {
  data: saleAttrInfoType[]
}


export interface skuType {
  category3Id: number | string,
  skuName: string | string,
  spuId: number | string,
  tmId: number | string,
  weight: number | string,
  price: number | string,
  skuDesc: string,
  skuDefaultImg: string,
  skuAttrValueList: [
    {
      attrId: number | string,
      valueId: number | string,
    }
  ],
  skuSaleAttrValueList: [
    {
      saleAttrId: number | string,
      saleAttrValueId: number | string,
    }
  ],
}

export interface skuListType {

  id?: number,
  spuId?: number,
  price: number,
  skuName: string,
  skuDesc?: string,
  weight: number,
  tmId?: number,
  category3Id?: number,
  skuDefaultImg: string,
  isSale?: number,
  skuImageList?: null,
  skuAttrValueList?: null,
  skuSaleAttrValueList?: null

}

export interface skuListBySpuType extends commonType {
  data: skuListType[]
}






