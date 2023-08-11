<template>
  <div class="spumanage-container">
    <el-card style="margin: 20px;">
      <my-select :flag="flag == 0"></my-select>

      <!-- 主体区域 -->
      <el-card>
        <div v-show="flag == 0">
          <el-button type="primary" icon="Plus" :disabled="!attrsStore.cat3ID" @click="addSPU"
            v-has="'btn.Spu.add'">添加SPU</el-button>

          <el-table :data="SPUList">
            <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
            <el-table-column label="SPU名称" prop="spuName"></el-table-column>
            <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
            <el-table-column label="SPU操作" align="center">
              <template #="scoped">
                <el-button type="primary" circle title="修改SPU" icon="Edit" @click="editSPU(scoped.row.id)"
                  v-has="'btn.Spu.update'"></el-button>
                <el-button type="success" circle title="添加SKU" icon="Plus" @click="addSKU(scoped.row.id, scoped.row.tmId)"
                  v-has="'btn.Spu.addsku'"></el-button>
                <el-button type="info" circle title="查看SKU" icon="View" @click="getSKUListBySPUId(scoped.row.id)"
                  v-has="'btn.Spu.skus'"></el-button>

                <el-popconfirm title="您确定删除该SPU吗?" width="200" @confirm="deleteSPU(scoped.row.id)">
                  <template #reference>
                    <el-button type="danger" circle title="删除SPU" icon="Delete" v-has="'btn.Spu.delete'"></el-button>
                  </template>

                </el-popconfirm>

              </template>
            </el-table-column>
          </el-table>

          <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 10]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
            style="margin-top: 20px;" />
        </div>

        <!-- 新增或者修改SPU的页面 -->
        <SPUForm v-show="flag == 1" ref="spuform" @showScene0="changeflag"></SPUForm>

        <SKUForm v-show="flag == 2" ref="skuform" @showScene0="changeflag"></SKUForm>

        <el-dialog v-model="skuDialogTableVisible" title="SKU列表">
          <el-table :data="skuList">
            <el-table-column property="skuName" label="SKU名称" width="150" />
            <el-table-column property="price" label="SKU价格" width="200" />
            <el-table-column property="weight" label="SKU重量" />
            <el-table-column label="SKU图片">
              <template #="{ row }">
                <div style="width: 100px;height: 100px;border: 1px solid lightgrey;">
                  <img :src="row.skuDefaultImg" alt="加载不出来" style="width: 100px; height: 100px;">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-card>
    </el-card>

  </div>
</template>


<script setup lang="ts">
import SPUForm from "./SPUForm.vue"
import SKUForm from "./SKUForm.vue";
import { ref, watch } from "vue"
import { useAttrsStore } from "@/store/modules/attrsStore";
import { getSPUListApi, getSKUListBySPUIdApi, deleteSPUApi } from "@/api/goods/SPUManage/index"
import type { SPUType, skuListType } from "@/api/goods/SPUManage/type"
import { ElMessage } from "element-plus";

const attrsStore = useAttrsStore();

let spuform = ref()
let skuform = ref()
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let flag = ref<number>(0)
let SPUList = ref<SPUType[]>([])
let skuList = ref<skuListType[]>([])
let skuDialogTableVisible = ref<boolean>(false)



const getSPUList = async (pager = 1) => {
  pageNo.value = pager
  let res = await getSPUListApi(pageNo.value, pageSize.value, attrsStore.cat3ID!)
  if (res.code == 200) {
    SPUList.value = res.data.records;
    total.value = res.data.total
  }
  else {
    ElMessage({
      type: "error",
      message: "获取SPU列表数据失败"
    })
  }
}
const addSPU = () => {
  flag.value = 1
  spuform.value.initHandlerAdd()
}
const editSPU = (spuId: number) => {
  flag.value = 1
  spuform.value.initHandlerUpdate(spuId)
}

const addSKU = (spuId: number, tmId: number) => {
  flag.value = 2
  skuform.value.initHandlerAdd(spuId, tmId)

}

const getSKUListBySPUId = async (spuId: number) => {
  let res = await getSKUListBySPUIdApi(spuId)
  if (res.code == 200) {
    skuList.value = res.data
    skuDialogTableVisible.value = true
  }
  else {
    ElMessage({
      type: "error",
      message: "获取SKU数据失败"
    })
  }
}

const deleteSPU = async (spuId: number) => {
  let res = await deleteSPUApi(spuId)
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除该SPU成功"
    })
    if (SPUList.value.length < 2 && pageNo.value > 1) {
      pageNo.value = pageNo.value - 1;
    }
    getSPUList(pageNo.value)
  }
  else {
    ElMessage({
      type: "error",
      message: "删除该SPU失败"
    })
  }
}

const changeflag = (param: { flag1: number, pageNo1: number }) => {

  if (param.pageNo1) {
    pageNo.value = param.pageNo1
  }
  getSPUList(pageNo.value);
  flag.value = param.flag1
}

watch(pageNo, () => {
  getSPUList(pageNo.value)
})

watch(pageSize, () => {
  getSPUList()
})

watch(() => attrsStore.cat3ID, () => {
  SPUList.value = [];
  if (attrsStore.cat3ID) {
    getSPUList()
  }
}, { immediate: true })

if (attrsStore.cat3ID) {
  getSPUList()
}


</script>


<style lang="scss" scoped></style>