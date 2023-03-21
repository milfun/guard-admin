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
        <el-form-item label="服务费率" prop="mbServe">
          <el-input v-model="value.mbServe" />
        </el-form-item>

        <el-form-item label="总结算费用" prop="mbCoin">
          <el-input v-model="value.mbCoin" />
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
import { taskAdjust } from "@/api/task.js";

const statusData = [
  { text: "待审核", color: "text-yellow", type: "", value: 1 },
  { text: "审核通过", color: "text-primary", type: "info", value: 2 },
  { text: "进行中", color: "text-500", type: "danger", value: 3 },
  { text: "已完成", color: "text-green", type: "danger", value: 4 },
  { text: "已结算", color: "text-500", type: "danger", value: 5 },
];

export default {
  name: "TaskAdjustModal",
  props: {
    value: Object,
  },
  data() {
    return {
      statusData,
      loading: false,
    };
  },
  watch: {},
  methods: {
    onConfirm() {
      const { value } = this;

      if (value.tmId) {
        this.loading = true;
        taskAdjust({
          tmId: value.tmId,
          tmStatus: value.tmStatus,
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
        this.$message.error("出错，tmId 不存在");
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
