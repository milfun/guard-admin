<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="交易ID" prop="mrId">
        <el-input placeholder="请输入交易Id" v-model="value.mrId" />
      </el-form-item>

      <el-form-item label="开票项目" prop="miType">
        <el-input placeholder="请输入开票项目" v-model="value.miType" />
      </el-form-item>

      <el-form-item label="开票金额" prop="miCoin">
        <el-input placeholder="请输入开票金额" v-model="value.miCoin">
          <span class="text-primary" slot="append"> (元)</span>
        </el-input>
      </el-form-item>

      <el-form-item label="发票类型" prop="miPaper">
        <el-radio-group v-model="value.miPaper" size="medium">
          <el-radio border :label="1">纸质发票</el-radio>
          <el-radio border :label="2">电子发票</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onConfirm">
        确定开票
      </el-button>
    </div>
  </div>
</template>

<script>
import { merchantInvoice } from "@/api/merchant.js";
export default {
  name: "InvoiceDrawer",
  props: {
    value: Object,
  },
  data() {
    return {
      // value: {},
      rules: {
        mrId: [{ required: true, message: "请输入交易Id", trigger: "blur" }],
        miType: [
          { required: true, message: "请输入开票项目", trigger: "blur" },
        ],
        miCoin: [
          { required: true, message: "请输入开票金额", trigger: "blur" },
        ],
        miPaper: [
          { required: true, message: "请选择发票类型", trigger: "blur" },
        ],
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

          params.miCoin = +this.value.miCoin;
          merchantInvoice({
            mrId: params.mrId,
            mcId: params.mcId,
            mcName: params.mcName,
            miType: params.miType,
            miCoin: params.miCoin,
            miPaper: params.miPaper,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("开票成功，请等待审核");
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
