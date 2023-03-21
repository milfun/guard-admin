<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :loading="loading"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="mmName" style="width: 420px">
        <el-input v-model="form.mmName" />
      </el-form-item>
      <el-form-item label="卡号" prop="mbNo" style="width: 420px">
        <el-input v-model="form.mbNo" />
      </el-form-item>
      <el-form-item label="开户银行" prop="mbBank" style="width: 420px">
        <el-input v-model="form.mbBank" />
      </el-form-item>
      <el-form-item label="开户支行" prop="mbBranch" style="width: 420px">
        <el-input v-model="form.mbBranch" />
      </el-form-item>
      <el-form-item label="支付宝" prop="mbAlipay" style="width: 420px">
        <el-input v-model="form.mbAlipay" />
      </el-form-item>
      <el-form-item label="识别银行" prop="mbName" style="width: 420px">
        <el-input readonly v-model="form.mbName" />
      </el-form-item>
      <el-form-item label="次数" prop="mbTimes" style="width: 420px">
        <el-input readonly v-model="form.mbTimes" />
      </el-form-item>
      <!-- <el-form-item label="ocr订单" prop="mbOrder" style="width: 420px">
        <el-input readonly v-model="form.mbOrder" />
      </el-form-item>
      <el-form-item label="ocr执行" prop="mbExcute" style="width: 420px">
        <el-input readonly v-model="form.mbExcute" />
      </el-form-item>
      <el-form-item label="ocr结果" prop="mbVerify" style="width: 420px">
        <el-input readonly v-model="form.mbVerify" />
      </el-form-item> -->
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="onConfirm">保存修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
  },
  data() {
    return {
      form: {},
      loading: false,
      rules: {
        nmTitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        nmNumber: [
          { required: true, message: "请输入文件号", trigger: "blur" },
        ],
        nmWay: [{ required: true, message: "请选择跳转方式", trigger: "blur" }],
        nmType: [{ required: true, message: "请选择模块", trigger: "blur" }],
        nmContent: [
          { required: true, message: "请输入正文内容", trigger: "blur" },
        ],
        nmLink: [
          { required: true, message: "请输入跳转连接", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    value(val) {
      this.form = JSON.parse(JSON.stringify(val));
    },
  },
  mounted() {
    // console.log(this.value);
    if (this.value) {
      this.form = JSON.parse(JSON.stringify(this.value));
    }
  },
  methods: {
    onClose() {
      this.$modal.close();
    },
    // 校验
    onConfirm() {
      const { form, value } = this;
      const keys = ["mbName", "mbNo", "mbBank", "mbBranch", "mbAlipay"];
      let flag = false;
      for (const item of keys) {
        // console.log(form[item] == value[item]);
        if (form[item] != value[item]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return this.$message.info("数据没有修改，无需保存");
      }
      console.log("等待修改");
      // this.onSave();
    },
    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          userEdit({
            ...this.form,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$modal.confirm(res.data);
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

<style></style>
