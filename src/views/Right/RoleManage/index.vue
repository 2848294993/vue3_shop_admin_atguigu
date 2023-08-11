<template>
  <div class="rolemanage-container">
    <el-card>
      <el-form inline>
        <el-form-item>
          <el-input placeholder="请输入角色名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchByKeyword">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 10px;">
      <el-button type="primary" @click="openDialog" v-has="'btn.Role.add'">添加角色</el-button>

      <el-table style="margin-top: 20px;" :data="roleList">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="职位名称" align="center" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
        <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button type="success" circle size="small" icon="Edit" title="编辑角色" @click="updateRole(row)"
              v-has="'btn.Role.update'"></el-button>
            <el-button type="info" circle size="small" icon="User" title="分配菜单权限" @click="showDrawer(row)"
              v-has="'btn.Role.assgin'"></el-button>
            <el-popconfirm title="您确定删除该角色吗?" width="200" @confirm="deleteRole(row.id)">
              <template #reference>
                <el-button type="danger" circle size="small" icon="Delete" title="删除角色"
                  v-has="'btn.Role.remove'"></el-button>
              </template>

            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>


      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total" style="margin-top: 10px;" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="roleForm.id ? '编辑角色' : '新增角色'" width="30%" @close="closeDialog">
      <el-form :model="roleForm" :rules="roleFormRule" ref="roleFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名" v-model="roleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addorEditRole">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>


    <el-drawer v-model="drawerVisible" title="分配角色权限" direction="rtl">

      <el-form>
        <el-form-item>

          <!-- 树形控件 -->
          <el-tree :data="menuList" :props="defaultProps" show-checkbox node-key="id" :default-checked-keys="checkedKeys"
            default-expand-all ref="menuListRef" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="distributeRight">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { useSettingStore } from "@/store/modules/settingStore"
import { getRoleListApi, addRoleApi, editRoleApi, getMemuListApi, distributeRightApi, deleteRoleApi } from "@/api/right/Role/index.ts"
import type { roleType, menuType } from "@/api/right/Role/type.ts"
import { ElMessage } from "element-plus"


let keyword = ref<string>("")
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let roleList = ref<roleType[]>([])
let menuList = ref<menuType[]>([])
let dialogVisible = ref<boolean>(false)
let drawerVisible = ref<boolean>(false)
let checkedKeys = ref<number[]>([])
let roleId = ref<number>()
let roleForm = reactive<roleType>({
  roleName: ""
})


const roleFormRef = ref()
const menuListRef = ref()

const settingStore = useSettingStore()

const roleFormRule = {
  roleName: [{ required: true, trigger: "blur", message: "角色名不能为空" },
  { min: 2, trigger: "blur", message: "角色名至少为2位" }]
}

const defaultProps = {
  children: "children",
  label: "name"
}

const getRoleList = async (pager = 1) => {
  pageNo.value = pager
  let res = await getRoleListApi(pageNo.value, pageSize.value, keyword.value);
  if (res.code == 200) {
    roleList.value = res.data.records
    total.value = res.data.total
  }
  else {
    ElMessage({
      type: "error",
      message: "获取角色列表数据失败"
    })
  }
}

const searchByKeyword = () => {
  getRoleList()
}

const reset = () => {
  settingStore.refresh = !settingStore.refresh
}

const openDialog = () => {
  dialogVisible.value = true
}

const addorEditRole = async () => {
  await roleFormRef.value.validate();
  let res: any
  if (!roleForm.id) {
    res = await addRoleApi(roleForm)
  }
  else {
    console.log(roleForm);

    res = await editRoleApi(roleForm)
  }
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: roleForm.id ? "编辑角色成功" : "新增角色成功"
    })
    getRoleList(roleForm.id ? pageNo.value : 1)
    dialogVisible.value = false
  }
  else {
    ElMessage({
      type: "error",
      message: roleForm.id ? "编辑角色失败" : "新增角色失败"
    })
  }
}

const closeDialog = () => {
  roleFormRef.value.resetFields()
}

const updateRole = (row: roleType) => {
  Object.assign(roleForm, row)
  dialogVisible.value = true
}

const getCheckedKeys = (menuList: menuType[]) => {

  menuList.forEach(item => {
    if (item.children && item.children.length > 0) {
      getCheckedKeys(item.children)
    }
    else {
      if (item.select) checkedKeys.value.push(item.id!)
    }
  })
}

const showDrawer = async (row: roleType) => {
  checkedKeys.value = []
  roleId.value = row.id
  let res = await getMemuListApi(row.id!)
  if (res.code == 200) {
    menuList.value = res.data
    drawerVisible.value = true
    getCheckedKeys(menuList.value)
  }
  else {
    ElMessage({
      type: "error",
      message: "获取菜单权限列表失败"
    })
  }
}


const distributeRight = async () => {
  let checkedAllKeys = menuListRef.value.getCheckedKeys()
  let checkedHalfKeys = menuListRef.value.getHalfCheckedKeys()


  let allKeys = checkedAllKeys.concat(checkedHalfKeys);
  let res = await distributeRightApi(roleId.value!, allKeys);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "分配角色权限成功"
    })
    drawerVisible.value = false
    //注意要刷新，很重要---->用户的菜单权限发生了改变，则当前用户的权限可能也发生了改变
    // window.location.reload()
  }
  else {
    ElMessage({
      type: "error",
      message: "分配角色权限失败"
    })
  }
}

const deleteRole = async (roleId: number) => {
  let res = await deleteRoleApi(roleId);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除角色成功"
    })
    getRoleList(pageNo.value > 1 && roleList.value.length < 2 ? pageNo.value - 1 : 1)
    window.location.reload()
  }
  else {
    ElMessage({
      type: "error",
      message: "该角色无法删除"
    })
  }
}
getRoleList()

watch(pageNo, () => {
  getRoleList(pageNo.value)
})

watch(pageSize, () => {
  getRoleList()
})

</script>


<style lang="scss" scoped></style>