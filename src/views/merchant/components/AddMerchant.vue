<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="资质地" prop="cmId">
        <el-select v-model="form.cmId" placeholder="请选择">
          <el-option label="福建岚融科技有限公司" value="10010"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户名称" prop="mcName">
        <el-input placeholder="请输入姓名" v-model="form.mcName" />
      </el-form-item>
      <el-form-item label="商户手机" prop="mcMobile">
        <el-input placeholder="请输入手机号" v-model="form.mcMobile" />
      </el-form-item>
      <el-form-item label="登录密码" prop="mcPassword">
        <el-input placeholder="请输入登录密码" v-model="form.mcPassword" />
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定新增</el-button>
    </div>
  </div>
</template>

<script>
import { merchantAdd } from "@/api/merchant.js";
export default {
  name: "AddMerchantModal",
  props: {
    value: Object,
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号码不能为空"));
      } else {
        const result =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            value
          );
        if (!result) {
          callback(new Error("手机号码错误"));
        } else {
          callback();
        }
      }
    };

    return {
      form: {},
      rules: {
        mcName: [
          { required: true, message: "请输入商户名称", trigger: "blur" },
        ],
        mcMobile: [
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
        mcPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onClose() {
      this.$drawer.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.form.cmId = +this.form.cmId;
          merchantAdd({
            ...this.form,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功");
                this.$drawer.confirm(res.data);
              }
            })
            .catch((err) => {
              this.$message.error(err.message || "出错，请重试");
            })
            .finally(() => {
              this.loading = false;
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
