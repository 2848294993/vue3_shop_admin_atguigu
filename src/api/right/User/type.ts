interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface userType {
  id?: number,
  createTime?: string,
  updateTime?: string,
  username: string,
  password?: string,
  name: string,
  phone?: null,
  roleName?: string
}

export interface userListResponseType extends commonType {
  data: {
    records: userType[],
    total: number
  }
}

export interface roleType {
  id?: number,
  createTime?: string,
  updateTime: string
  roleName?: string,
  remark?: null
}

export interface roleListResponseType extends commonType {
  data: {
    assignRoles: roleType[],
    allRolesList: roleType[]
  }
}