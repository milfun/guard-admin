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
        <el-form-item label="用户结算天数" prop="trUserDay">
          <el-input
            readonly
            v-model="value.trUserDay"
            type="number"
            style="width: 300px"
          />
        </el-form-item>

        <el-form-item label="商户结算天数" prop="trMerchantDay">
          <div class="flex item-center">
            <el-input v-model="totalDay" type="number" style="width: 200px" />
            <span class="mx10">*</span>
            <span
              >单价： {{ value.trTask.tmCoin
              }}{{ value.trTask.tmUnit || "元" }} /
              {{ value.trTask.tmUnitName || "天" }}</span
            >
          </div>
        </el-form-item>

        <el-form-item label="结算金额" prop="trCoin">
          <el-input
            placeholder="请输入充值金额"
            v-model="totalCoin"
            style="width: 300px"
          >
            <span class="text-primary" slot="append">
              ({{ value.trTask.tmUnit || "元" }})</span
            >
          </el-input>
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
      totalDay: 0,
      // totalCoin: 0,
    };
  },
  computed: {
    totalCoin() {
      return this.totalDay * this.value.trTask.tmCoin;
    },
  },
  watch: {},
  methods: {
    onConfirm() {
      const { value, totalDay, totalCoin } = this;

      if (value.trId) {
        this.loading = true;
        taskReceiveEdit({
          trId: value.trId,
          trMerchantDay: +totalDay,
          trTotal: totalCoin,
          trStatus: 4, // 已结算
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("结算 成功！");
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
