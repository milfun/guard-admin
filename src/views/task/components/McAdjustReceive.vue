<template>
  <div class="">
    <div class="tc-form">
      <el-form
        v-loading="loading"
        :model="value"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        hide-required-mark
        ref="form"
      >
        <el-form-item label="审核结果" prop="trStatus">
          <el-select v-model="value.trStatus" placeholder="请选择状态">
            <el-option label="待商户审核" :value="1" />
            <el-option label="任务进行中" :value="2" />
            <el-option label="任务完成" :value="3" />
            <!-- <el-option label="已结算" :value="4" /> -->
            <!-- <el-option label="用户取消" :value="5" /> -->
            <el-option label="商户审核不通过" :value="6" />
            <!-- <el-option label="商户拒绝付款" :value="7" />
            <el-option label="管理员关停" :value="8" /> -->
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 取消 </el-button>
      <el-button
        class="confirm-btn"
        key="submit"
        type="primary"
        @click="onConfirm"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import { taskReceiveEdit } from "@/api/task.js";

export default {
  name: "TaskAdjustModal",
  props: {
    value: Object,
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {},
  methods: {
    onConfirm() {
      const { value } = this;

      if (value.trId) {
        this.loading = true;
        taskReceiveEdit({
          trId: value.trId,
          trStatus: value.trStatus,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("保存成功！");
              this.$modal.confirm(res.data);
            }
          })
          .catch((err) => {
            this.$message.error(err.message || "出错，请重试");
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$message.error("出错，trId 不存在");
      }
    },
    onCancel() {
      this.$modal.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.textArea {
  background: #f1f6ff;
  border-radius: 5px;
  border: 0;
}

.textNum {
  position: relative;
  text-align: right;
  top: -50px;
  right: 10px;
}
</style>
