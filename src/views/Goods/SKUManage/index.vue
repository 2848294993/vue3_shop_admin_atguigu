<template>
  <div class="skumanage-container">
    <el-card>
      <el-table :data="skuList" border>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="名称" prop="skuName" show-overflow-tooltip></el-table-column>
        <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px;
            height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="重量" prop="weight"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button :type="row.isSale ? 'primary' : 'success'" :icon="row.isSale ? 'Bottom' : 'Top'"
              @click="changSale(row.isSale, row.id)" v-has="'btn.Sku.updown'"></el-button>
            <el-button type="info" icon="InfoFilled" @click="checkSKUInfo(row.id)" v-has="'btn.Sku.detail'"></el-button>
            <el-popconfirm title="您确定删除该SKU吗?" width="200" @confirm="deleteSKU(row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" v-has="'btn.Sku.remove'"></el-button>
              </template>

            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>

    <el-drawer v-model="drawerVisible" title="商品的详情信息" direction="ltr">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="19">
          <span v-if="skuform.skuName" style="line-height: 25px;">
            {{ skuform.skuName }}
          </span>
          <span v-else style="color:gray">没有数据</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="19">
          <span v-if="skuform.skuDesc" style="line-height: 25px;">
            {{ skuform.skuDesc }}
          </span>
          <span v-else style="color:gray">没有数据</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="19">
          <span v-if="skuform.price">
            <span style="color: red;">{{ skuform.price }}</span>元
          </span>
          <span v-else style="color:gray">没有数据</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="19">
          <div v-if="skuform.skuAttrValueList.length">
            <el-tag v-for="item in skuform.skuAttrValueList" :key="item.id"
              style="margin-left: 10px;margin-bottom: 10px;">{{
                item.valueName }}</el-tag>
          </div>
          <span v-else>没有数据</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">销售属性</el-col>
        <el-col :span="19">
          <div v-if="skuform.skuSaleAttrValueList.length">
            <el-tag v-for="item in skuform.skuSaleAttrValueList" :key="item.id" type="success"
              style="margin-bottom: 10px;margin-left: 10px;">{{
                item.saleAttrName
              }}</el-tag>
          </div>
          <span v-else>没有数据</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">产品图片</el-col>
        <el-col :span="19">
          <el-carousel height="150px" v-if="skuform.skuImageList.length" type="card">
            <el-carousel-item v-for="item in skuform.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="height: 100%;width: 100%;">
            </el-carousel-item>
          </el-carousel>
          <span v-else>没有数据</span>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue"

import { getSKUListApi, cancelSaleApi, onSaleApi, getOneSKUInfoBySkuId, deleteSKUApi } from "@/api/goods/SKUManage/index"
import type { skuListType } from "@/api/goods/SPUManage/type"
import type { skuInfoDataType } from "@/api/goods/SKUManage/type"
import { ElMessage } from "element-plus";

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuList = ref<skuListType[]>([])
let skuform = ref<skuInfoDataType>({
  price: 0,
  skuName: "",
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuImageList: []
})

let drawerVisible = ref<boolean>(false)

const getSKUList = async (pager = 1) => {
  pageNo.value = pager
  let res = await getSKUListApi(pageNo.value, pageSize.value)


  if (res.code == 200) {
    skuList.value = res.data.records
    total.value = res.data.total
  }
  else {
    ElMessage({
      type: "error",
      message: "获取sku列表数据失败"
    })
  }
}

const changSale = async (isSale: number, skuId: number) => {
  if (isSale) {
    let res = await cancelSaleApi(skuId)
    if (res.code == 200) {
      ElMessage({
        type: "info",
        message: "下架商品成功"
      })
      getSKUList(pageNo.value)
    }
    else {
      ElMessage({
        type: "error",
        message: "上架商品失败"
      })
    }
  }
  else {
    let res = await onSaleApi(skuId)
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "上架商品成功"
      })
      getSKUList(pageNo.value)
    }
    else {
      ElMessage({
        type: "error",
        message: "上架商品失败"
      })
    }
  }
}

const checkSKUInfo = async (skuId: number) => {
  let res = await getOneSKUInfoBySkuId(skuId)
  if (res.code == 200) {


    skuform.value = res.data


  }
  else {
    ElMessage({
      type: "error",
      message: "获取该SKU数据失败"
    })
    return
  }
  drawerVisible.value = true

}

const deleteSKU = async (skuId: number) => {
  let res = await deleteSKUApi(skuId);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除SKU成功"
    })
    if (skuList.value.length < 2 && pageNo.value > 1) {
      pageNo.value = pageNo.value - 1
    }
    getSKUList(pageNo.value)

  }
  else {
    ElMessage({
      type: "error",
      message: "系统数据无法删除"
    })
  }
}

watch(pageNo, () => {
  getSKUList(pageNo.value)
})

watch(pageSize, () => {
  getSKUList()
})

getSKUList()


</script>


<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>