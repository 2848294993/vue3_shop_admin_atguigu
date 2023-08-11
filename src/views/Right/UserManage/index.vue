<template>
  <div class="usrmanage-container">
    <el-card style="margin: 10px;">
      <el-form inline style="margin: 10px;">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入搜索用户名" v-model="usernamekeyword"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称:">
          <el-input placeholder="请输入用户昵称" v-model="namekeyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUser">搜索</el-button>
          <el-button @click="refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px;">
      <el-button type="primary" icon="Plus" @click="openAddUserForm" v-has="'btn.User.add'">添加用户</el-button>
      <el-button type="danger" icon="Delete" :disabled="!deleteUserIdList.length" @click="deleteByGroup"
        v-has="'btn.User.remove'">批量删除</el-button>

      <el-table style="margin-top: 10px;" :data="userList" @selection-change="deleteUserIdListChange" :row-key="getRowId"
        ref="userTableRef">
        <el-table-column type="selection" reserve-selection></el-table-column>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="用户名" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间 " prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button type="primary" size="small" circle icon="Edit" title="编辑" @click="editUser(row)"
              v-has="'btn.User.update'"></el-button>
            <el-button type="success" size="small" circle icon="User" title="分配角色" @click="showDrawer(row)"
              v-has="'btn.User.assgin'"></el-button>

            <el-popconfirm title="您确定删除该用户吗?" width="200" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="danger" size="small" circle icon="Delete" title="删除用户"
                  v-has="'btn.User.remove'"></el-button>
              </template>

            </el-popconfirm>


          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 6, 9, 12]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" style="margin-top: 20px;" />
    </el-card>

    <!-- 对话框 -->
    <el-dialog v-model="addUserDialogVisible" :title="userForm.id ? '编辑用户' : '新增用户'" width="30%" @close="closeDialog">
      <el-form label-width="100px" :rules="userFormRules" :model="userForm" ref="userFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userForm.id">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addOrEditUser">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-drawer v-model="drawerVisible" title="分配角色" direction="rtl">
      <el-form>
        <el-form-item label="用户昵称">
          <el-input disabled="true" v-model="name"></el-input>
        </el-form-item>

        <!-- 角色全选 -->
        <el-form-item>
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange" style="margin-left: 10px;">
            <el-checkbox v-for="role in allRoleList" :key="role.id" :label="role.id" style="display: block;">{{
              role.roleName
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="assignRoles">确定</el-button>
        <el-button @click="drawerVisible = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { getUserListApi, addUserApi, editUserApi, getAllRoleApi, assignRoleApi, deleteUserApi, deleteUserByGroupApi } from "@/api/right/User/index"
import type { userType, roleType } from "@/api/right/User/type"
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/modules/userStore";
import { useSettingStore } from "@/store/modules/settingStore";

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let userList = ref<userType[]>([])
let addUserDialogVisible = ref<boolean>(false)
let drawerVisible = ref<boolean>(false)
let allRoleList = ref<roleType[]>([])
let assignRoleList = ref<roleType[]>([])
let name = ref<string>("")
let editflag = ref<boolean>(false)
let userId = ref<number>()
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let checkedRoles = ref<number[]>([])
let usernamekeyword = ref<string>("")
let namekeyword = ref<string>("")
let deleteUserIdList = ref<userType[]>([])
let userForm = reactive<userType>({
  id: undefined,
  username: "",
  name: "",
  password: ""
})
const userFormRef = ref()
const userTableRef = ref()

let userStore = useUserStore();
let settingStore = useSettingStore()


const validateUsername = (rules: any, value: any, callback: any) => {

  if (value.trim().length < 5 || value.trim().length > 20) {
    callback(new Error("用户名应该在5~20位"))
  }
  callback()
}

const validatePwd = (rules: any, value: any, callback: any) => {


  if (value.trim().length < 6 || value.trim().length > 20) {
    callback(new Error("密码应该在6~20位"))
  }
  callback()
}
const userFormRules = {
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  name: [{ required: true, trigger: "blur", message: "用户昵称不能为空" }],
  password: [{ required: true, trigger: "blur", validator: validatePwd }]
}

const getUserList = async (pager = 1) => {
  pageNo.value = pager
  let res = await getUserListApi(pageNo.value, pageSize.value, usernamekeyword.value, namekeyword.value)
  if (res.code == 200) {
    userList.value = res.data.records
    total.value = res.data.total
  }
  else {
    ElMessage({
      type: "error",
      message: "获取用户列表数据失败"
    })
  }
}


const openAddUserForm = () => {
  Object.assign(userForm, {
    id: undefined,
    username: "",
    name: "",
    password: ""
  })
  addUserDialogVisible.value = true
}
const addOrEditUser = async () => {
  await userFormRef.value.validate();
  let res: any;
  if (userForm.id) {
    res = await editUserApi(userForm)
  }
  else {
    res = await addUserApi(userForm)
  }
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: userForm.id ? "修改用户成功" : "添加用户成功"
    })
    if (userForm.id) {
      if (editflag.value) {
        window.location.reload();
      }
      else {
        getUserList(pageNo.value)
      }

    }
    else {
      getUserList()
    }
    addUserDialogVisible.value = false
  }
  else {
    ElMessage({
      type: "error",
      message: userForm.id ? "改变用户信息失败" : "添加用户失败"
    })
  }
}

const editUser = (row: userType) => {
  if (row.username == userStore.username) {
    editflag.value = true
    ElMessageBox.confirm(
      '该用户为当前登录用户，确定修改当前用户信息吗？',
      "提示",
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      Object.assign(userForm, row)
      addUserDialogVisible.value = true
    }
    ).catch(() => [
      ElMessage({
        type: "info",
        message: "已取消修改"
      })
    ])
  }
  else {
    editflag.value = false
    Object.assign(userForm, row)
    addUserDialogVisible.value = true
  }
}

const closeDialog = () => {
  userFormRef.value.resetFields()
}

const showDrawer = async (row: userType) => {
  name.value = row.name
  userId.value = row.id
  let res = await getAllRoleApi(row.id!)
  if (res.code == 200) {
    allRoleList.value = res.data.allRolesList
    assignRoleList.value = res.data.assignRoles

    checkedRoles.value = assignRoleList.value.map(item => {
      return item.id!
    })
    drawerVisible.value = true
  }
  else {
    ElMessage({
      type: "error",
      message: "获取角色信息失败"
    })
  }

}
//value为点击全选框之后的checkAll的值
const handleCheckAllChange = (value: boolean) => {
  isIndeterminate.value = false
  if (value) {
    checkedRoles.value = allRoleList.value.map(item => {
      return item.id!
    })
  }
  else {
    checkedRoles.value = []
  }
}
//value为点击多选框之后的checkedRoles的值
const handleCheckedRolesChange = (value: any) => {
  if (value.length > 0 && value.length < allRoleList.value.length) {
    isIndeterminate.value = true
  }
  else {
    isIndeterminate.value = false
    checkAll.value = value.length == 0 ? false : true
  }
}

const assignRoles = async () => {
  let res = await assignRoleApi(checkedRoles.value, userId.value!)
  if (res.code = 200) {
    ElMessage({
      type: "success",
      message: "分配角色成功"
    })
    drawerVisible.value = false
    getUserList(pageNo.value)
  }
  else {
    ElMessage({
      type: "error",
      message: "分配角色失败"
    })
  }
}


const deleteUser = async (row: userType) => {
  //考虑到删除自己的情况
  if (userStore.username == row.username) {
    ElMessageBox.confirm(
      '该用户为当前登录用户，您确定删除该用户吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      //确定删除
      .then(async () => {
        let res = await deleteUserApi(row.id!)
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "删除用户成功"
          })
          //实际上是为了让layout的tabbar组件重新挂载，以执行onMounted
          //在tabbar的onMounted钩子中我们用token获取当前用户的信息，如果该用户被删除了，则发送过去的token信息无效，则会执行logout，清楚掉本地的token并且跳到登录页面
          window.location.reload()
        }
        else {
          ElMessage({
            type: "error",
            message: "该用户无法删除"
          })
        }
      })

      //取消删除
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
  }
  else {
    let res = await deleteUserApi(row.id!)
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "删除用户成功"
      })
      getUserList(pageNo.value > 2 && userList.value.length < 2 ? pageNo.value - 1 : pageNo.value)
    }
    else {
      ElMessage({
        type: "error",
        message: "该用户无法删除"
      })
    }
  }


}

const getRowId = (row: any) => {

  return row.id
}
//value为选中的行数据组成的数组
const deleteUserIdListChange = (value: any) => {


  deleteUserIdList.value = value
}

const deleteByGroup = () => {
  let flag = false
  let deleteIdList = deleteUserIdList.value.map(item => {
    if (item.username == userStore.username) {
      flag = true
    }
    return item.id
  })
  if (flag) {
    ElMessageBox.confirm(
      '要删除的用户中包含当前登录用户，您确定删除吗？',
      "提示",
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      let res = await deleteUserByGroupApi(deleteIdList as number[])
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "删除成功"
        })
        window.location.reload()
      }
      else {
        ElMessage({
          type: "error",
          message: "删除失败"
        })
      }
    }
    ).catch(() => {
      ElMessage({
        type: "info",
        message: "已取消修改"
      })
    })
  }
  else {
    ElMessageBox.confirm(

      '您确定删除这些用户吗?',
      '提示',
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }
    ).then(async () => {
      let res = await deleteUserByGroupApi(deleteIdList as number[])
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "删除成功"
        })

        //用来清空用户的选择
        userTableRef.value.clearSelection()

        //批量删除后回到第一页
        getUserList()
      }
      else {
        ElMessage({
          type: "error",
          message: "删除失败"
        })
      }
    })
  }
}


const searchUser = async () => {
  getUserList()
}

const refresh = () => {
  //组件刷新
  settingStore.refresh = !settingStore.refresh
}


watch(pageNo, () => {
  getUserList(pageNo.value)
})

watch(pageSize, () => {
  getUserList()
})
getUserList(pageNo.value)


</script>


<style lang="scss" scoped></style>