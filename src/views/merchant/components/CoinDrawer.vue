<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="交易流水号" prop="mrNo">
        <el-input placeholder="请输入交易流水号" v-model="value.mrNo" />
      </el-form-item>

      <el-form-item label="充值金额" prop="mrCoin">
        <el-input placeholder="请输入充值金额" v-model="value.mrCoin">
          <span class="text-primary" slot="append"> (元)</span>
        </el-input>
      </el-form-item>

      <el-form-item label="交易密钥" prop="mrCode">
        <el-input
          placeholder="请输入交易密钥"
          type="password"
          show-password
          v-model="value.mrCode"
        />
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onConfirm"
        >确定充值</el-button
      >
    </div>
  </div>
</template>

<script>
import { merchantRecharge } from "@/api/merchant.js";
export default {
  name: "CoinDrawer",
  props: {
    value: Object,
  },
  data() {
    return {
      // value: {},
      rules: {
        mrNo: [{ required: true, message: "请输入交易号", trigger: "blur" }],
        mrDate: [{ required: true, message: "请输入日期", trigger: "blur" }],
        mrTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
        mrCoin: [{ required: true, message: "请输入金额", trigger: "blur" }],
      },
      loading: false,
      disabled: false,
    };
  },
  methods: {
    onClose() {
      this.$drawer.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.disabled = true;
          let params = this.value;

          params.mrCoin = +this.value.mrCoin;
          merchantRecharge({
            mcId: params.mcId,
            mrNo: params.mrNo,
            mrCoin: params.mrCoin,
            mrCode: params.mrCode,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("充值成功");
                this.$drawer.confirm(res.data);
              }
            })
            .catch((err) => {
              this.$message.error(err.message || "出错，请重试");
            })
            .finally(() => {
              this.loading = false;
              this.disabled = false;
            });
        }
      });
    },
  },
};
</script>

<style>
.publish {
  width: 100%;
}
</style>
