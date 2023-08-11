<template>
  <div class="skuform-container">
    <el-form label-width="75px">
      <el-form-item label="SKU名称">
        <el-input v-model="skuForm.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input-number :precision="2" :step="1" :min="0" v-model="skuForm.price" />
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input-number :precision="2" :step="1" :min="0" v-model="skuForm.weight" />
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input type="textarea" v-model="skuForm.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline label-width="75px">
          <el-form-item style="margin-top: 20px;" v-for="item in comAttrList" :key="item.id" :label="item.attrName">
            <el-select v-model="item.comAttrIdAndVid">
              <el-option v-for="item1 in item.attrValueList" :key="item1.id" :label="item1.valueName"
                :value="`${item.id}:${item1.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline label-width="75px">
          <el-form-item v-for="item in saleAttrList" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleAttrIdAndVid">
              <el-option v-for="item1 in item.spuSaleAttrValueList" :key="item1.id" :label="item1.saleAttrValueName"
                :value="`${item.id}:${item1.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="imgList" ref="imgTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="图片">
            <template #="{ row }">
              <div style="width: 100px;height: 100px;border: 1px solid lightgrey;">
                <img :src="row.imgUrl" alt="加载不出来" style="width: 100px;height: 100px;">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" @click="setDefault(row)">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="primary" @click="addSKU">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form>
  </div>
</template>


<script setup lang="ts">

import { reactive, ref } from "vue"
import { useAttrsStore } from "@/store/modules/attrsStore";
import { getAttrListApi } from "@/api/goods/AttrsManage/index"
import { getComAttrListApi, getSPUImgListApi, addSKUApi } from "@/api/goods/SPUManage/index"
import type { attrType } from "@/api/goods/AttrsManage/type"
import type { saleAttrInfoType, imgType, skuType } from "@/api/goods/SPUManage/type"
import { ElMessage, ElTable } from "element-plus";



const attrsStore = useAttrsStore()

let comAttrList = ref<attrType[]>([])
let saleAttrList = ref<saleAttrInfoType[]>([])
let imgList = ref<imgType[]>([])
let skuForm = reactive<skuType>({
  category3Id: "",
  skuName: "",
  spuId: "",
  tmId: "",
  weight: 0,
  price: 0,
  skuDesc: "",
  skuDefaultImg: "",
  skuAttrValueList: [{ attrId: "", valueId: "" }],
  skuSaleAttrValueList: [
    {
      saleAttrId: "",
      saleAttrValueId: "",
    }
  ],

})
let imgTable = ref<InstanceType<typeof ElTable>>()

const $emits = defineEmits(['showScene0'])

const initHandlerAdd = async (spuId: number, tmId: number) => {
  //清空skuForm
  Object.assign(skuForm, {
    category3Id: "",
    skuName: "",
    spuId: "",
    tmId: "",
    weight: 0,
    price: 0,
    skuDesc: "",
    skuDefaultImg: "",
    skuAttrValueList: [{ attrId: "", valueId: "" }],
    skuSaleAttrValueList: [
      {
        saleAttrId: "",
        saleAttrValueId: "",
      }
    ]
  })
  let res1 = await getAttrListApi(attrsStore.cat1ID!, attrsStore.cat2ID!, attrsStore.cat3ID!);
  let flag = 0
  if (res1.code == 200) {
    comAttrList.value = res1.data
    flag++
  }
  else {
    ElMessage({
      type: "error",
      message: "获取平台属性失败"
    })
  }
  let res2 = await getComAttrListApi(spuId);
  if (res2.code == 200) {
    saleAttrList.value = res2.data
    flag++
  }
  else {
    ElMessage({
      type: "error",
      message: "获取销售属性失败"
    })
  }
  let res3 = await getSPUImgListApi(spuId);
  if (res3.code == 200) {
    imgList.value = res3.data
    flag++
  }
  else {
    ElMessage({
      type: "error",
      message: "获取SPU图片失败"
    })
  }
  if (flag == 3) {
    skuForm.category3Id = attrsStore.cat3ID!
    skuForm.tmId = tmId
  }
}
const setDefault = (row: imgType) => {
  imgList.value.forEach(item => {
    imgTable.value!.toggleRowSelection(item, false)
  })
  imgTable.value!.toggleRowSelection(row, true)
  skuForm.skuDefaultImg = row.imgUrl!
}

const addSKU = async () => {
  skuForm.skuSaleAttrValueList = saleAttrList.value.reduce((prev: any, next: any) => {
    if (next.saleAttrIdAndVid) {
      const [saleAttrId, saleAttrValueId] = next.saleAttrIdAndVid.split(":");
      prev.push({
        saleAttrId, saleAttrValueId
      })
    }
    return prev
  }, [])

  skuForm.skuAttrValueList = comAttrList.value.reduce((prev: any, next: any) => {
    if (next.comAttrIdAndVid) {
      const [attrId, valueId] = next.comAttrIdAndVid.split(":");
      prev.push({
        attrId, valueId
      })
    }
    return prev
  }, [])

  let res = await addSKUApi(skuForm);


  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "添加SKU成功"
    })
    $emits("showScene0", { flag1: 0, pageNo: 0 })
  }
  else {
    ElMessage({
      type: "error",
      message: "添加SKU失败"
    })
  }
}
const cancel = () => {
  $emits("showScene0", { flag1: 0, pageNo1: 0 })
}
defineExpose({
  initHandlerAdd,
})

</script>


<style lang="scss" scoped></style>