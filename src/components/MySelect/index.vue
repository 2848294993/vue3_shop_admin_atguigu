<template>
  <div class="select-container">
    <!-- inline设置表单项水平放置 -->
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="attrsStore.cat1ID" @change="cat1IDChange" :disabled="!flag">
          <el-option v-for="item in attrsStore.category1List" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select v-model="attrsStore.cat2ID" @change="cat2IDChange" :disabled="!flag">
          <el-option v-for="item in attrsStore.category2List" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select v-model="attrsStore.cat3ID" :disabled="!flag">
          <el-option v-for="item in attrsStore.category3List" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup lang="ts">
import { onBeforeUnmount } from "vue"
import { useAttrsStore } from "@/store/modules/attrsStore.ts"
const attrsStore = useAttrsStore();

defineProps(["flag"])

const getCat1ListData = () => {
  attrsStore.getCat1List();
}

const cat1IDChange = () => {
  attrsStore.getCat2List();
  attrsStore.cat2ID = undefined
  attrsStore.cat3ID = undefined
  attrsStore.category3List = []

}

const cat2IDChange = () => {
  attrsStore.getCat3List();
  attrsStore.cat3ID = undefined
}
getCat1ListData();

onBeforeUnmount(() => {
  attrsStore.category1List = []
  attrsStore.category2List = []
  attrsStore.category3List = []
  attrsStore.cat1ID = undefined
  attrsStore.cat2ID = undefined
  attrsStore.cat3ID = undefined

})

</script>


<style lang="scss" scoped></style>