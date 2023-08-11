//路由的拆分

export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
      show: false,
    }
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    redirect: "/home",
    meta: {
      title: "首页",
      show: false,
      icon: "House"
    },
    children: [{
      path: "/home",
      component: () => import("@/views/Home/index.vue"),
      name: "home",
      meta: {
        title: "首页",
        show: true,
        icon: "House"
      }
    }

    ]
  },
  {
    path: "/screen",
    component: () => import("@/views/Screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      show: true,
      icon: "Monitor"
    }
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      show: false,
    }
  },
]

export const asyncRoutes = [
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    redirect: "/user",
    meta: {
      title: "权限管理",
      show: true,
      icon: "Key"
    },
    children: [
      {
        path: "/user",
        component: () => import("@/views/Right/UserManage/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          show: true,
          icon: "User"
        }
      },
      {
        path: "/role",
        component: () => import("@/views/Right/RoleManage/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          show: true,
          icon: "Lock"
        }
      },
      {
        path: "/menu",
        component: () => import("@/views/Right/MenuManage/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          show: true,
          icon: "Operation"
        }
      }
    ]
  },
  {
    path: "/goods",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    redirect: "/trademark",
    meta: {
      title: "商品管理",
      show: true,
      icon: "Goods"
    },
    children: [
      {
        path: "/trademark",
        component: () => import("@/views/Goods/TradeMark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          show: true,
          icon: "PriceTag"
        }
      },
      {
        path: "/attrs",
        component: () => import("@/views/Goods/AttrsManage/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          show: true,
          icon: "Flag"
        }
      },
      {
        path: "/spu",
        component: () => import("@/views/Goods/SPUManage/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          show: true,
          icon: "Management"
        }
      },
      {
        path: "/sku",
        component: () => import("@/views/Goods/SKUManage/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          show: true,
          icon: "MagicStick"
        }
      }
    ]
  },
]

export const anyRoute = {
  path: "/:pathMatch(.*)",
  redirect: "/404",
  name: "Any",
  meta: {
    title: "pathmatch",
    show: false,
  }
}
