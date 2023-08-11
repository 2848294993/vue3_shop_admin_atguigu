interface commonType {
  code: number,
  message: string,
  ok: boolean
}


export interface loginFormType {
  username: string,
  password: string
}

export interface loginResponseType extends commonType {
  data: string | null
}

export interface userInfoResponseType extends commonType {
  data: { routes: string[], buttons: string[], roles: string[], name: string, avatar: string } | null
}

export interface logoutResponseType extends commonType {
  data: null
}