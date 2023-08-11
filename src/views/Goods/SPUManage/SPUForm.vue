<template>
  <div class="spuform-container">
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="SPUBaseInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="SPUBaseInfo.tmId">
          <el-option v-for="item in trademarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述" v-model="SPUBaseInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU照片">
        <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlBeforeUpload">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="picDialogVisible">
          <img w-full :src="dialogImageUrl" alt="预览图片" style="width: 100%;height: 100%;" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="SPU销售属性">
        <el-select v-model="saleAttrIdAndName"
          :placeholder="unSelectedSaleAttrList.length ? `还有${unSelectedSaleAttrList.length}个属性可供选择` : `没有属性可供选择`">
          <el-option v-for="item in unSelectedSaleAttrList" :key="item.id" :value="`${item.id}:${item.name}`"
            :label="item.name"></el-option>
        </el-select>
        <el-button type="primary" icon="Plus" style="margin-left: 10px;" :disabled="!saleAttrIdAndName"
          @click="addSaleAttr(saleAttrIdAndName)">添加属性</el-button>

        <el-table :data="SPUBaseInfo.spuSaleAttrList">
          <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
          <el-table-column label="销售属性名字" width="200" prop="saleAttrName"></el-table-column>
          <el-table-column label="销售属性值">
            <template #="scoped">
              <el-tag v-for="(item, index) in scoped.row.spuSaleAttrValueList" :key="item.id" closable
                @close="scoped.row.spuSaleAttrValueList.splice(index, 1)">{{ item.saleAttrValueName
                }}</el-tag>
              <el-input size="small" style="width: 100px;margin-left: 10px;"
                v-if="scoped.row.currentIndex == scoped.row.spuSaleAttrValueList.length" v-focus
                @blur="addSaleAttrValueInput(scoped)" v-model="saleAttrValue"></el-input>
              <el-button type="primary" icon="Plus" style="margin-left: 10px;" size="small"
                @click="addSaleAttrValue(scoped)" v-else></el-button>

            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #="scoped">
              <el-popconfirm title="您确定删除该销售属性吗？" width="200" @confirm="deleteSaleAttr(scoped.$index)">
                <template #reference>
                  <el-button type="danger" circle icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="updateorAddSPU">保存</el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue"
import { getSaleAttrsInfoApi, getTrademarkListApi, getSaleAttrsListApi, getSPUImgListApi, updateorAddSPUApi } from "@/api/goods/SPUManage/index"
import type { SPUType, trademarkType, saleAttrType, imgType, saleAttrValueType, SPUBaseInfoType } from "@/api/goods/SPUManage/type"
import { ElMessage, UploadFile, UploadRawFile } from "element-plus";
import { useAttrsStore } from "@/store/modules/attrsStore";

let SPUBaseInfo = ref<SPUType>({
  id: undefined,
  spuName: "",
  description: "",
  category3Id: "",
  tmId: "",
  spuSaleAttrList: [],
  spuImageList: [],
})
let trademarkList = ref<trademarkType[]>([])
let saleAttrList = ref<saleAttrType[]>([])
let imgList = ref<imgType[]>([])
let picDialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>("")
let saleAttrIdAndName = ref<string>("")
let saleAttrValue = ref<string>("")

const $emits = defineEmits(["showScene0"])

const cancel = () => {
  imgList.value = []
  $emits("showScene0", { flag1: 0, pageNo1: 0 })
}

const initHandlerAdd = async () => {
  SPUBaseInfo.value = {
    id: undefined,
    spuName: "",
    description: "",
    category3Id: useAttrsStore().cat3ID!,
    tmId: "",
    spuSaleAttrList: [],
    spuImageList: [],
  };
  imgList.value = [];
  let flag = 0


  let res1 = await getTrademarkListApi();
  if (res1.code == 200) {
    trademarkList.value = res1.data
    flag++
  }
  let res2 = await getSaleAttrsListApi();
  if (res2.code == 200) {
    saleAttrList.value = res2.data
    flag++
  }
  if (flag != 2) {
    ElMessage({
      type: "error",
      message: "获取数据失败"
    })
  }
}

const initHandlerUpdate = async (spuId: number) => {
  let flag = 0;
  let res1 = await getSaleAttrsInfoApi(spuId);
  if (res1.code == 200) {
    SPUBaseInfo.value = res1.data
    flag++
  }
  let res2 = await getTrademarkListApi();
  if (res2.code == 200) {
    trademarkList.value = res2.data
    flag++
  }
  let res3 = await getSaleAttrsListApi();
  if (res3.code == 200) {
    saleAttrList.value = res3.data
    flag++
  }
  let res4 = await getSPUImgListApi(spuId);
  if (res4.code == 200) {
    imgList.value = res4.data.map(item => {
      return {
        id: item.id,
        url: item.imgUrl,
        name: item.imgName
      }
    })
    flag++
  }
  if (flag != 4) {
    ElMessage({
      type: "error",
      message: "获取SPU数据失败"
    })
  }
}

let unSelectedSaleAttrList = computed(() => {
  let unSelectedSaleAttr = saleAttrList.value.filter(item => {
    return SPUBaseInfo.value.spuSaleAttrList?.every(item1 => item1.saleAttrName != item.name)
  })
  return unSelectedSaleAttr
})

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  picDialogVisible.value = true
}

//定义该回调即可
const handleRemove = () => {
}

const handlBeforeUpload = (file: UploadRawFile) => {
  if (file.type != "image/jpeg" && file.type != "image/png" && file.type != "image/gif") {
    ElMessage({
      type: 'error',
      message: '上传文件必须是jpg或者png或者gif类型'
    })
    return false
  }
  if (file.size > 3 * 1024 * 1024) {
    ElMessage({
      type: "error",
      message: "上传的图片不得超过3M"
    })
    return false
  }
  return true

}

const addSaleAttr = (saleAttr: string) => {
  const [baseSaleAttrId, saleAttrName] = saleAttr.split(":");
  SPUBaseInfo.value.spuSaleAttrList?.push({
    baseSaleAttrId, saleAttrName, spuSaleAttrValueList: []
  })
  saleAttrIdAndName.value = ""
}


const addSaleAttrValue = (scoped: any) => {
  saleAttrValue.value = ""
  scoped.row.currentIndex = scoped.row.spuSaleAttrValueList.length
}

const addSaleAttrValueInput = (scoped: any) => {
  if (saleAttrValue.value.trim() == "") {
    ElMessage({
      type: "error",
      message: "属性值不允许为空"
    })
  }
  else {
    let flag = scoped.row.spuSaleAttrValueList.find((item: saleAttrValueType) => {
      return item.saleAttrValueName == saleAttrValue.value.trim()
    })
    if (flag) {
      ElMessage({
        type: "error",
        message: "属性值不允许重复"
      })
    }
    else {


      scoped.row.spuSaleAttrValueList.push({
        baseSaleAttrId: scoped.row.baseSaleAttrId,
        saleAttrValueName
          : saleAttrValue.value
      })
      ElMessage({
        type: "success",
        message: "添加属性值成功"
      })
    }
  }
  scoped.row.currentIndex = undefined
}

const deleteSaleAttr = (index: number) => {
  SPUBaseInfo.value.spuSaleAttrList?.splice(index, 1)
  ElMessage({
    type: "success",
    message: "删除属性成功"
  })

}

const updateorAddSPU = async () => {

  let tmpImgList = imgList.value.map((item: any) => {
    return {
      imgUrl: item.response ? item.response.data : item.url,
      imgName: item.name
    }
  });
  SPUBaseInfo.value.spuImageList = tmpImgList
  let res: SPUBaseInfoType;
  res = await updateorAddSPUApi(SPUBaseInfo.value)


  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: SPUBaseInfo.value.id ? '更新SPU成功' : "新增SPU成功"
    })
    $emits("showScene0", { flag1: 0, pageNo1: SPUBaseInfo.value.id ? 0 : 1 })
  }
  else {
    ElMessage({
      type: "error",
      message: SPUBaseInfo.value.id ? '更新SPU失败' : "新增SPU失败"
    })
  }
}

defineExpose({
  initHandlerUpdate,
  initHandlerAdd
})


</script>


<style lang="scss" scoped></style>