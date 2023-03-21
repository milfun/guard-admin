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
        <el-form-item label="结算批次" prop="tsNo">
          <el-input placeholder="请输入结算批次" v-model="value.tsNo" />
        </el-form-item>
        <el-form-item label="结算单号" prop="tsOrder">
          <el-input placeholder="请输入结算单号" v-model="value.tsOrder" />
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
import { taskSettleOrder } from "@/api/task.js";

const statusData = [
  { text: "通过", color: "text-primary", type: "info", value: 2 },
  { text: "不通过", color: "text-500", type: "danger", value: 3 },
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
      // console.log(value);
      if (value.tsNo || value.tsOrder) {
        this.loading = true;
        taskSettleOrder({
          tsNo: value.tsNo,
          tsOrder: value.tsOrder,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("结算成功！");
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
        this.$message.error("出错，tsNo 不存在");
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
