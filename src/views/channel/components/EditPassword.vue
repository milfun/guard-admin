<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <!-- <el-form-item label="旧密码" prop="cmOld">
        <el-input
          placeholder="请输入旧密码"
          type="password"
          show-password
          v-model="value.cmOld"
        />
      </el-form-item> -->

      <el-form-item label="新密码" prop="cmNew">
        <el-input
          placeholder="请输入新密码"
          type="password"
          show-password
          v-model="value.cmNew"
        />
      </el-form-item>

      <el-form-item label="新密码" prop="cmNewCmp">
        <el-input
          placeholder="请再次输入新密码"
          type="password"
          show-password
          v-model="value.cmNewCmp"
        />
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onConfirm"
        >确定修改</el-button
      >
    </div>
  </div>
</template>

<script>
import { channelPassword } from "@/api/channel.js";
export default {
  name: "CoinDrawer",
  data() {
    return {
      value: {},
      rules: {
        // cmOld: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        cmNew: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
      loading: false,
      disabled: false,
    };
  },
  props: {
    value: Object,
  },
  mounted() {
    console.log(this.value);
  },
  methods: {
    onClose() {
      this.$modal.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.value;

          if (params.cmNew != params.cmNewCmp) {
            return this.$message.error("两次输入的密码不一致");
          }

          this.loading = true;
          this.disabled = true;
          channelPassword({
            cmId: params.cmId,
            // cmOld: params.cmOld,
            cmNew: params.cmNew,
            // mcId: params.mrCoin,
          })
            .then(async (res) => {
              if (res.code == 200) {
                this.$message.success("修改成功");
                this.$modal.confirm();
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
