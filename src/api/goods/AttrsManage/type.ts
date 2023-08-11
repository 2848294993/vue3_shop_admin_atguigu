interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface categoryType {
  id: number,
  createTime: string,
  updateTime: string,
  name: string,
  category1Id?: number,
  category2Id?: 29
}

export interface categoryResponseType extends commonType {
  data: categoryType[]
}

export interface attrValueType {
  id?: number,
  createTime?: null | string,
  updateTime?: null | string,
  valueName: string,
  attrId?: number
}

export interface attrType {
  id?: number,
  createTime?: null | string,
  updateTime?: null | string,
  attrName: string,
  categoryId: number | string,
  categoryLevel: number,
  attrValueList: attrValueType[]
  comAttrIdAndVid?: string
}

export interface getAttrResponseType extends commonType {
  data: attrType[]
}


export interface getOneAttrDataResponseType extends commonType {
  data: attrValueType[]
}
