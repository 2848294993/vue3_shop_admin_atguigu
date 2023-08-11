function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

type bodyType = {
  username: string,
  password: string,
  [propName: string]: any
}
type tokenType = {
  token: string | undefined | null,
  [propName: string]: any
};
type requestType = { body: bodyType };
type requestType1 = { headers: tokenType };

export default [
  {
    url: '/api/user/login', //请求的地址
    method: 'post',//请求的方式
    response: ({ body }: requestType) => {//请求的处理过程
      const { username, password } = body
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    response: (request: requestType1) => {
      const token = request.headers.token;
      const checkUser = createUserList().find(item => token == item.token);//find函数返回第一个符合条件的数组成员，如果找不到符合条件的成员，就返回undefined
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      else {
        return { code: 200, data: { checkUser } }
      }
    }
  }
]
