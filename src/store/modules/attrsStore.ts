import { defineStore } from "pinia"
import { ref } from "vue"
import type { categoryType } from "@/api/goods/AttrsManage/type"
import { getCat1ListApi, getCat2ListApi, getCat3ListApi } from "@/api/goods/AttrsManage/index"
import { ElMessage } from "element-plus"
export const useAttrsStore = defineStore("attrsStore", () => {
  let category1List = ref<categoryType[]>([])
  let category2List = ref<categoryType[]>([])
  let category3List = ref<categoryType[]>([])
  let cat1ID = ref<number>();
  let cat2ID = ref<number>();
  let cat3ID = ref<number>();
  async function getCat1List() {
    let res = await getCat1ListApi();
    if (res.code == 200) {
      category1List.value = res.data
    }
    else {
      ElMessage({
        type: "error",
        message: "获取一级分类数据失败"
      })
    }
  }

  async function getCat2List() {
    let res = await getCat2ListApi(cat1ID.value!)
    if (res.code == 200) {
      category2List.value = res.data
    }
    else {
      ElMessage({
        type: "error",
        message: "获取二级分类数据失败"
      })
    }
  }

  async function getCat3List() {
    let res = await getCat3ListApi(cat2ID.value!);
    if (res.code == 200) {
      category3List.value = res.data
    }
    else {
      ElMessage({
        type: "error",
        message: "获取三级分类数据失败"
      })
    }
  }
  return {
    cat1ID,
    cat2ID,
    cat3ID,
    category1List,
    category2List,
    category3List,
    getCat1List,
    getCat2List,
    getCat3List
  }
})