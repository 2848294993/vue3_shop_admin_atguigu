<template>
  <div class="trademark-container">
    <el-card style="margin:10px;">
      <el-button type="primary" icon="Plus" @click="addTrademarkShow" v-has="'btn.Trademark.add'">
        添加品牌
      </el-button>
      <!-- 主体区域 -->
      <el-table :data="trademarkData" style="width: 80%;margin-top: 10px;">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="tmName" label="品牌名称" align="center" />
        <el-table-column label="品牌Logo" align="center">
          <template #="scoped">
            <div
              style="width: 100px;height: 100px;border:1px solid lightgray;border-radius: 10px; padding: 10px;margin: 0 auto;">
              <el-image :src="scoped.row.logoUrl" style="width: 100%;height: 100%;">
                <template #error>
                  <el-icon style="margin-top:30px;">
                    <Picture></Picture>
                  </el-icon>
                </template>
              </el-image>
            </div>

          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="scoped">
            <el-button type="primary" icon="Edit" circle style="vertical-align: top;"
              @click="editTrademark(scoped.row.id)" v-has="'btn.Trademark.update'" />
            <el-popconfirm title="您确定删除这个品牌吗?" width="200" :hide-after="0" @confirm="deleteTrademark(scoped.row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" circle style="vertical-align:top;"
                  v-has="'btn.Trademark.remove'" />
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 8, 10]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>


    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" :title="trademarkForm.id ? '修改品牌' : '添加品牌'" width="30%" @close="closeDialog"
      :before-close="handleClose">
      <el-form :model="trademarkForm" style="width: 90%; margin: 0 auto;" ref="trademarkFormRef"
        :rules="trademarkFormRules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkForm.tmName">
          </el-input>
        </el-form-item>
        <el-form-item label="品牌图片" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" width="178" height="178" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelBtnCloseDialog">取消</el-button>
          <el-button type="primary" @click="addtrademark">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { trademarkType, trademarkFormType } from "@/api/goods/trademark/type.ts"
import { getTrademarkData, addTrademark, getOneTrademarkData, editTrademarkApi, deleteTrademarkApi } from "@/api/goods/trademark/index.ts"
import { ElMessage, UploadProps, ElMessageBox, FormInstance } from 'element-plus';


let trademarkData = ref<trademarkType[]>([])
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);
let dialogVisible = ref(false);
const trademarkFormRef = ref<FormInstance>();
let trademarkForm = reactive<trademarkFormType>({ id: 0, tmName: "", logoUrl: '' })


//rule为该item定义的校验规则，value为item的值
const tmNameCheck = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error("品牌名称至少为2位"))
  }
  else if (value.trim().length > 15) {
    callback(new Error("品牌的名称要小于15位"))
  }
  //一定要记得callback()
  callback();
}

const logoUrlCheck = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  }
  else {
    callback(new Error("请选择图片"))
  }
}

const trademarkFormRules = {
  tmName: [{ validator: tmNameCheck, trigger: 'blur', required: true }],
  //注意由于品牌图片的el-form-item的内容不是input框，是upload，所以设置blur是无效的，其触发时机只能是在点击按钮，调用整个表格的validate方法时
  logoUrl: [{ validator: logoUrlCheck, required: true }]
}
const getTrademarkTableData = async (pager = 1) => {
  pageNo.value = pager;
  let res = await getTrademarkData(pageNo.value, pageSize.value)
  if (res.code == 200) {
    trademarkData.value = res.data.records
    total.value = res.data.total
  }
  else {

    ElMessage({
      type: "error",
      message: "获取品牌数据失败"
    })
  }
}

const closeDialog = () => {
  trademarkFormRef.value?.resetFields()
  trademarkForm.id = 0;
  trademarkForm.logoUrl = "";
  trademarkForm.tmName = "";
}

// 点击"X"关闭对话框的情况
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定关闭该对话框吗?')
    .then(() => {
      done()
    })
    //点击取消时的回调
    .catch(() => {
    })
}

//点击取消按钮关闭对话框的情况
const cancelBtnCloseDialog = () => {
  ElMessageBox.confirm('确定关闭该对话框吗?')
    .then(() => {
      dialogVisible.value = false
    })
    .catch(() => {

    })
}



//文件上传成功之前的钩子，用来对文件的类型和大小做出限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == "image/png" || rawFile.type == "image/gif") {
    // 图片的大小要小于4M
    if (rawFile.size < 4 * 1024 * 1024) {
      return true
    }
    else {
      ElMessage({
        type: "error",
        message: "图片的大小要小于4M"
      });
      return false
    }
  }
  else {
    ElMessage({
      type: "error",
      message: "上传的文件格式必须为jpg或者png或者gif"
    })
    return false
  }
}

//文件上传成功之后的钩子,第一个参数为服务器响应回来的数据，第二个参数为文件对象
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkForm.logoUrl = response.data
}

const addTrademarkShow = () => {
  dialogVisible.value = true
}

const addtrademark = () => {
  trademarkFormRef.value!.validate(async (valid) => {
    //所有字段验证通过
    if (valid) {
      //id为0，证明是添加品牌。否则为修改品牌
      if (!trademarkForm.id) {
        let res = await addTrademark(trademarkForm)
        if (res.code == 200) {
          getTrademarkTableData();
          ElMessage({
            type: "success",
            message: "添加品牌成功"
          })
          dialogVisible.value = false
        }
        else {
          ElMessage({
            type: "error",
            message: "添加品牌失败"
          })
        }

      }
      else {
        let res = await editTrademarkApi(trademarkForm)
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "修改品牌信息成功"
          })
          getTrademarkTableData(pageNo.value);
          dialogVisible.value = false
        }
        else {
          ElMessage({
            type: "error",
            message: "修改品牌信息失败"
          })
        }
      }
    }
    else {
      ElMessage({
        type: "error",
        message: "填写数据不符合要求"
      })
    }
  })

}

const editTrademark = async (id: number) => {
  let res = await getOneTrademarkData(id);
  if (res.code == 200) {
    trademarkForm.tmName = res.data.tmName
    trademarkForm.logoUrl = res.data.logoUrl
    trademarkForm.id = id;
    dialogVisible.value = true
  }
  else {
    ElMessage({
      type: "error",
      message: "获取该品牌数据失败"
    })
  }
}

const deleteTrademark = async (id: number) => {
  let res = await deleteTrademarkApi(id);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除品牌成功"
    })
    if (trademarkData.value.length <= 1 && pageNo.value > 1) {
      pageNo.value = pageNo.value - 1;
      getTrademarkTableData(pageNo.value);
    }
    else {
      getTrademarkTableData(pageNo.value);
    }
  }
  else {
    ElMessage({
      type: "error",
      message: "删除品牌失败"
    })
  }
}

watch(pageNo, () => {
  getTrademarkTableData(pageNo.value);
})

watch(pageSize, () => {
  getTrademarkTableData();
})


//页面创建的时候获取品牌数据

getTrademarkTableData();



</script>


<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>