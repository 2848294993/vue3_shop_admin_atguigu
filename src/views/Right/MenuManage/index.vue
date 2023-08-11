<template>
  <div class="menumanage-container">
    <el-card style="margin: 10px;">
      <el-table row-key="id" :data="menuList">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button type="primary" size="small" circle icon="Plus" :title="row.level == 3 ? '添加功能' : '添加菜单'"
              :disabled="row.level == 4" @click="changeAddDialogVisable(row)" v-has="'btn.Permission.add'"></el-button>
            <el-button type="success" size="small" circle icon="Edit" title="编辑" :disabled="row.level == 1"
              @click="changeEditDialogVisible(row)" v-has="'btn.Permission.update'"></el-button>
            <el-popconfirm @confirm="deleteMenu(row.id)" title="您确定删除该权限吗?" width="200">
              <template #reference>
                <el-button type="danger" size="small" circle icon="Delete" title="删除" :disabled="row.level == 1"
                  v-has="'btn.Permission.remove'"></el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-dialog v-model="addDialogVisible" :title="menuForm.id ? '编辑菜单/功能' : '添加菜单/功能'" width="30%" @close="closeDialog">
      <el-form :model="menuForm" :rules="menuFormRules" ref="menuFormRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuForm.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="code">
          <el-input v-model="menuForm.code" placeholder="请输入权限数值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrUpdateMenu">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue"
import { getMenuListApi, addMenuApi, editMenuApi, deleteMenuApi } from "@/api/right/Menu/index"
import type { menuType } from "@/api/right/Role/type";
import type { menuFormType } from "@/api/right/Menu/type"

let menuList = ref<menuType[]>([])
let addDialogVisible = ref<boolean>(false)
let menuForm = reactive<menuFormType>({
  name: "",
  code: "",
  level: 0,
  pid: 0
})

const menuFormRules = {
  name: [{ required: true, trigger: "blur", message: "菜单名称不能为空" }],
  code: [{ required: true, trigger: "blur", message: "权限数值不能为空" }]
}

const menuFormRef = ref()


const getMenuList = async () => {
  let res = await getMenuListApi()
  if (res.code == 200) {
    menuList.value = res.data
  }
  else {
    ElMessage({
      type: "error",
      message: "获取菜单列表数据失败"
    })
  }
}

const changeAddDialogVisable = (row: menuType) => {
  menuForm.id = undefined
  menuForm.level = row.level + 1
  menuForm.pid = row.id!
  addDialogVisible.value = true
}

const changeEditDialogVisible = (row: menuType) => {
  Object.assign(menuForm, row)
  addDialogVisible.value = true
}

const addOrUpdateMenu = async () => {
  await menuFormRef.value.validate()
  if (!menuForm.id) {
    let res = await addMenuApi(menuForm)
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "添加菜单权限成功"
      })
      addDialogVisible.value = false
      window.location.reload()
    }
    else {
      ElMessage({
        type: 'error',
        message: "添加菜单权限失败"
      })
    }
  }
  else {
    let res = await editMenuApi(menuForm)
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "修改菜单权限成功"
      })
      addDialogVisible.value = false
      window.location.reload()
    }
    else {
      ElMessage({
        type: 'error',
        message: "修改菜单权限失败"
      })
    }
  }
}

const closeDialog = () => {
  menuFormRef.value.resetFields()
}


const deleteMenu = async (menuId: number) => {
  let res = await deleteMenuApi(menuId)
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除菜单权限成功"
    })
    window.location.reload()
  }
  else {
    ElMessage({
      type: "error",
      message: "删除菜单权限失败"
    })
  }
}
getMenuList()


</script>


<style lang="scss" scoped></style>