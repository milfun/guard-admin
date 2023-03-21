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
        <el-form-item label="审核结果" prop="miStatus">
          <el-select v-model="value.miStatus" placeholder="请选择">
            <el-option
              v-for="(item, index) in statusData"
              :key="index"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="驳回原因"
          prop="miReason"
          placeholder="请填写驳回原因"
          v-if="[2, 6].includes(value.miStatus)"
        >
          <el-input v-model="value.miReason" />
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
import { invoiceEdit } from "@/api/merchant.js";

const statusData = [
  { text: "", color: "text-green", type: "", value: 1 },
  { text: "待审核", color: "text-yellow", type: "", value: 1 },
  { text: "被驳回", color: "text-red", type: "", value: 2 },
  { text: "开票中", color: "text-green", type: "", value: 3 },
  { text: "复核中", color: "text-orange", type: "", value: 4 },
  { text: "复核通过", color: "text-blue", type: "", value: 5 },
  { text: "复核驳回", color: "text-cyan", type: "", value: 6 },
  { text: "发票寄出", color: "text-primary", type: "", value: 7 },
  { text: "已结束", color: "text-300", type: "", value: 8 },
];

export default {
  name: "FreeUserAdjustModal",
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
  mounted() {
    // console.log(this.value);
  },
  methods: {
    onConfirm() {
      let params = {};

      // console.log(this.value);
      if (this.value.miId) {
        this.loading = true;

        params.miId = this.value.miId;
        params.miStatus = +this.value.miStatus;
        params.miReason = this.value.miReason;

        invoiceEdit({
          miId: params.miId,
          miStatus: params.miStatus,
          miReason: params.miReason,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("保存成功！");
              this.$modal.confirm(res.data);
              this.$modal.close();
            }
          })
          .catch((err) => {
            this.$message.error(err.message || "出错，请重试");
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$message.error("出错，miId 不存在");
      }
    },
    onCancel() {
      this.$modal.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
