<template>
  <el-card class="mt20">
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="开票类型" prop="mtType">
        <el-radio-group v-model="form.mtType" size="medium">
          <el-radio border :label="1">普票</el-radio>
          <el-radio border :label="2">专票</el-radio>
        </el-radio-group>
        <span class="text-200 ml20 f12">* 请填写开票类型</span>
      </el-form-item>
      <el-form-item label="开票科目" prop="mtLabel">
        <el-input v-model="form.mtLabel" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写开票科目</span>
      </el-form-item>
      <el-form-item label="开票地址" prop="mtTaxAddress">
        <el-input v-model="form.mtTaxAddress" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写开票地址</span>
      </el-form-item>
      <el-form-item label="开票电话" prop="mtTaxMobile">
        <el-input v-model="form.mtTaxMobile" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写开票电话</span>
      </el-form-item>
      <el-form-item label="开户行" prop="mtBank">
        <el-input v-model="form.mtBank" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="开户账户" prop="mtNo">
        <el-input v-model="form.mtNo" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="邮寄地址" prop="mtMailAddress">
        <el-input v-model="form.mtMailAddress" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="收件人姓名" prop="mtMailName">
        <el-input v-model="form.mtMailName" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="收件人手机号" prop="mtMailMobile">
        <el-input v-model="form.mtMailMobile" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item>
        <div class="w100 flex item-center">
          <el-button type="primary" block @click="onSubmit">完成注册</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// import MobileLogin from "./components/MobileLogin.vue";
// import AccountLogin from "./components/AccountLogin.vue";
import validate from "./validate.js";
import { merchantAddTax, merchantTax } from "@/api/merchant";

export default {
  name: "Login",
  components: {
    // MobileLogin,
    // AccountLogin,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      step: 1,
      form: {
        mtType: 1,
        mtLabel: "",
        mtTaxAddress: "",
        mtTaxMobile: "",
        mtBank: "",
        mtNo: "",
        mtMailAddress: "",
        mtMailName: "",
        mtMailMobile: "",
      },
      rules: {
        mtType: [
          {
            required: true,
            message: "请填写服务费率",
            trigger: "blur",
          },
        ],
        mtLabel: [
          {
            required: true,
            message: "请填写开票科目",
            trigger: "blur",
          },
        ],
        mtTaxAddress: [
          { required: true, message: "请填写开票地址", trigger: "blur" },
        ],
        mtTaxMobile: [
          {
            required: true,
            message: "请填写开票电话",
            // validator: validate.checkMobile,
            trigger: "blur",
          },
        ],
        mtBank: [{ required: true, message: "请填写开户行", trigger: "blur" }],
        mtNo: [{ required: true, message: "请填写开户账户", trigger: "blur" }],
        mtMailAddress: [
          {
            required: true,
            message: "请填写邮寄地址",
            trigger: "blur",
          },
        ],
        mtMailName: [
          { required: true, message: "请填写收件人姓名", trigger: "blur" },
        ],
        mtMailMobile: [
          { required: true, message: "请填写收件人电话", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.onMcSave();
          // console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 商户自己注册
    onMcSave() {
      let form = JSON.parse(JSON.stringify(this.form));

      form.mtType = +form.mtType;
      merchantAddTax({
        ...form,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功");
            this.$emit("confirm", res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 管理员注册
    onSystemSave() {},
  },
};
</script>

<style lang="scss"></style>
