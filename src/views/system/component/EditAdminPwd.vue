<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="新密码" prop="smPassword">
        <el-input placeholder="请输入新密码" v-model="value.smPassword" />
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { systemEditPwd } from "@/api/system.js";
export default {
  name: "EditAdminPwdModal",
  props: {
    value: Object,
  },
  data() {
    return {
      rules: {
        smPassword: [
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
    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          let value = this.value;
          systemEditPwd({
            smId: value.smId,
            smPassword: value.smPassword,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("保存成功");
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
