interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface trademarkType {
  id: number,
  createTime: string,
  updateTime: string,
  tmName: string,
  logoUrl: string
}

export interface trademarkResponseType extends commonType {
  data: {
    records: trademarkType[],
    total: number,
    size: number,
    current: number,
    pages: number,
    searchCount: boolean,
  }
}

export interface trademarkFormType {
  id: number,
  tmName: string,
  logoUrl: string
}

export interface getOneTrademarkResponseType extends commonType {
  data: trademarkType
}

