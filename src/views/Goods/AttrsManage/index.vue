<template>
  <div class="attrsmanage-container">
    <el-card style="margin: 20px 10px;">
      <!-- 下拉框区域 -->
      <my-select :flag="flag"></my-select>
      <el-card style="margin: 20px 0px;">
        <!-- 按钮和表格区域 -->
        <div v-if="flag">
          <el-button type="primary" size="default" icon="Plus" :disabled="!attrsStore.cat3ID" @click="changeFlagFalse"
            v-has="'btn.Attr.add'">添加属性</el-button>
          <el-table style="margin: 20px 0px;" :data="attrList">
            <el-table-column type="index" align="center" width="80" label="序号"></el-table-column>
            <el-table-column width="200" label="属性名称" prop="attrName"></el-table-column>
            <el-table-column label="属性值名称">
              <template #="scoped">
                <el-tag v-for="item in scoped.row.attrValueList" :key="item.id" effect="plain" style="margin: 5px 5px;">{{
                  item.valueName
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="200" label="属性操作" align="center">
              <template #="scoped">
                <el-button type="primary" circle icon="Edit" @click="changeFlagFalseEdit(scoped)"
                  v-has="'btn.Attr.update'"></el-button>
                <el-popconfirm title="您确定要删除该属性吗?" @confirm="deleteAttr(scoped.row.id)" width="200" :hide-after="0">
                  <template #reference>
                    <el-button type="danger" circle icon="Delete" v-has="'btn.Attr.remove'"></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 添加或者修改属性区域 -->
        <div v-else>
          <el-form>
            <el-form-item label="属性名称:" :model="attrForm">
              <el-input style="width: 300px;" placeholder="请输入属性名称" v-model="attrForm.attrName"></el-input>
            </el-form-item>
          </el-form>

          <el-button type="primary" icon="Plus" :disabled="!attrForm.attrName" @click="addAttrVal">添加属性值</el-button>
          <el-button style="border: 1px solid lightgrey;" @click="flag = true">取消</el-button>

          <!-- 属性值表格区域 -->
          <el-table style="margin: 20px 0px;" :data="attrForm.attrValueList">
            <el-table-column label="序号" width="80" type="index"></el-table-column>
            <el-table-column label="属性值名称" width="400">
              <template #="scoped">
                <el-input v-model="scoped.row.valueName" v-if="currentIndex == scoped.$index" @blur="showDiv(scoped)"
                  v-focus>
                </el-input>
                <div v-else @click="showInput(scoped.$index)">{{
                  scoped.row.valueName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="属性值操作" width="200">
              <template #="scoped">
                <el-button icon="Delete" type="danger" circle size="small"
                  @click="attrForm.attrValueList.splice(scoped.row.$index, 1)"></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 保存和取消按钮区域 -->
          <el-button type="primary" :disabled="!attrForm.attrValueList.length" @click="addOrUpdateAttr">保存</el-button>
          <el-button style="border: 1px solid lightgrey;" @click="flag = true">取消</el-button>
        </div>
      </el-card>


    </el-card>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, reactive } from "vue"
import { useAttrsStore } from "@/store/modules/attrsStore";
import { getAttrListApi, addOrUpdateAttrApi, getOneAttrDataApi, deleteAttrApi } from "@/api/goods/AttrsManage/index"
import type { attrType } from "@/api/goods/AttrsManage/type"
import { ElMessage } from "element-plus";

const attrsStore = useAttrsStore();

let flag = ref<boolean>(true)
let attrList = ref<attrType[]>([])
let currentIndex = ref<number>()
let showDivFlag = ref<boolean>(false)
let attrForm = reactive<attrType>({
  attrName: "", categoryId: "", categoryLevel: 3, attrValueList: []
})



const changeFlagFalse = () => {
  Object.assign(attrForm, {
    attrName: "", categoryId: attrsStore.cat3ID, categoryLevel: 3, attrValueList: []
  })
  flag.value = false
}

const changeFlagFalseEdit = async (scoped: any) => {

  let res = await getOneAttrDataApi(scoped.row.id)

  if (res.code == 200) {
    Object.assign(attrForm, { attrName: scoped.row.attrName, categoryId: scoped.row.categoryId, id: scoped.row.id, categoryLevel: 3, attrValueList: res.data })
  }
  else {
    ElMessage({
      type: "error",
      message: "获取属性数据失败"
    })
    return
  }
  flag.value = false
}

const getAttrList = async () => {

  let res = await getAttrListApi(attrsStore.cat1ID!, attrsStore.cat2ID!, attrsStore.cat3ID!)

  if (res.code == 200) {
    attrList.value = res.data
  }
  else {
    ElMessage({
      type: "error",
      message: "获取属性数据失败"
    })
  }
}

const addAttrVal = () => {


  attrForm.attrValueList.push({
    valueName: ""
  })
  currentIndex.value = attrForm.attrValueList.length - 1;
};

const showDiv = (scoped: any) => {
  if (scoped.row.valueName.trim() == "") {
    ElMessage({
      type: "error",
      message: "属性值名称不能为空"
    })

    //如果属性值的名称为空，则将该属性值名称去掉
    attrForm.attrValueList.splice(scoped.$index, 1)

  }
  //如果属性值名称已经存在
  let flag = attrForm.attrValueList.find((item) => {

    if (item != scoped.row) {
      return item.valueName == scoped.row.valueName;
    }
  }
  )
  //如果不存在两个相同的属性值名称，则flag为undefined
  if (flag) {
    ElMessage({
      type: "error",
      message: "属性值名称不允许重复"
    })
    attrForm.attrValueList.splice(scoped.$index, 1)

  }
  currentIndex.value = undefined;
  showDivFlag.value = true;
}

const showInput = (index: number) => {
  currentIndex.value = index;
}

const addOrUpdateAttr = async () => {


  let res = await addOrUpdateAttrApi(attrForm);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "操作属性成功"
    })
    getAttrList();
    flag.value = true
  }
  else {
    ElMessage({
      type: "error",
      message: "操作属性失败"
    })
  }
}

const deleteAttr = async (attrId: number) => {
  let res = await deleteAttrApi(attrId);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除属性成功"
    })
    getAttrList()
  }
  else {
    ElMessage({
      type: "error",
      message: "删除属性失败"
    })
  }
}

watch(() => attrsStore.cat3ID, () => {
  attrList.value = []
  if (attrsStore.cat3ID) {
    getAttrList()
  }
})

if (attrsStore.cat3ID) {
  getAttrList()
}



</script>


<style lang="scss" scoped></style>,