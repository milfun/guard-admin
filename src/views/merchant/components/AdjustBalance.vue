<template>
  <div class="">
    <div class="tc-form">
      <el-form v-loading="loading" :model="value" hide-required-mark ref="form">
        <el-form-item label="商家ID" prop="mcId">
          <el-input v-model="value.mcId" style="width: 400px" />
        </el-form-item>

        <el-form-item label="调整内容" prop="mcType">
          <el-select v-model="value.mcType" placeholder="请选择">
            <el-option label="收入" :value="1"> </el-option>
            <el-option label="支出" :value="2"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调整类型" prop="mcName">
          <el-select v-model="value.mcName" placeholder="请选择">
            <el-option label="调节服务费差额" value="调节服务费差额">
            </el-option>
            <el-option label="充值" value="充值"> </el-option>
            <el-option label="代发" value="代发"> </el-option>
            <el-option label="管理员扣款" value="管理员扣款"> </el-option>
            <el-option label="管理员退款" value="管理员退款"> </el-option>
            <el-option label="代发失败退款" value="代发失败退款"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调整金额" prop="mbNo">
          <el-input v-model="value.mcCoin" style="width: 400px" />
          <!-- <span class="text-200 ml20 f12">* 请填写银行账号</span> -->
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
import { balanceAdjust } from "@/api/merchant.js";

export default {
  name: "BalanceAdjustModal",
  props: {
    value: Object,
  },
  data() {
    return {
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
      if (this.value.mcId) {
        this.loading = true;

        params.mcId = this.value.mcId;
        params.mcType = +this.value.mcType;
        params.mcCoin = +this.value.mcCoin;
        params.mcName = this.value.mcName;

        balanceAdjust({
          mcId: params.mcId,
          mcType: params.mcType,
          mcCoin: params.mcCoin,
          mcName: params.mcName,
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
        this.$message.error("出错，mcId 不存在");
      }
    },
    onCancel() {
      this.$modal.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
