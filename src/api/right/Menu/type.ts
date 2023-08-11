import type { menuType } from "../Role/type";

interface commonType {
  code: number,
  message: string,
  ok: boolean
}

export interface menuListResponseType extends commonType {
  data: menuType[]
}

export interface menuFormType {
  id?: number,
  name: string,
  code: string,
  level: number,
  pid: number
}