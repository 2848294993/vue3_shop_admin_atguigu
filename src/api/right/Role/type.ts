interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface roleType {
  id?: number,
  createTime?: string,
  updateTime?: string,
  roleName: string,
  remark?: null
}

export interface roleListResponseType extends commonType {
  data: {
    records: roleType[],
    total: number,
  }
}

export interface menuType {
  id?: number,
  createTime?: string,
  updateTime?: string,
  pid?: number,
  name: string,
  code?: string,
  toCode?: null,
  type?: number,
  status?: null,
  level: number,
  children?: menuChildrenType,
  select: boolean
}

export type menuChildrenType = menuType[]

export interface menuListResponseType extends commonType {
  data: menuType[]
}
