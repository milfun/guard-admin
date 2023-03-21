<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="旧密码" prop="mcOld">
        <el-input
          placeholder="请输入旧密码"
          type="password"
          show-password
          v-model="value.mcOld"
        />
      </el-form-item>

      <el-form-item label="新密码" prop="mcNew">
        <el-input
          placeholder="请输入新密码"
          type="password"
          show-password
          v-model="value.mcNew"
        />
      </el-form-item>

      <el-form-item label="新密码" prop="mcNewCmp">
        <el-input
          placeholder="请再次输入新密码"
          type="password"
          show-password
          v-model="value.mcNewCmp"
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
import { mapGetters } from "vuex";
import { merchantChangePwd } from "@/api/merchant.js";
import { channelPassword } from "@/api/channel.js";
export default {
  name: "CoinDrawer",
  data() {
    return {
      value: {},
      rules: {
        mcOld: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        mcNew: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
      loading: false,
      disabled: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    onClose() {
      this.$modal.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.value;

          if (params.mcNew != params.mcNewCmp) {
            return this.$message.error("两次输入的密码不一致");
          }

          if (this.user.role == "merchant") {
            this.onMerchant(params);
          } else if (this.user.role == "channel") {
            console.log(this.user);
            params.cmId = +this.user.cmId;
            this.onChannel(params);
          } else {
            this.$message.error("未知错误");
          }
          this.loading = true;
          this.disabled = true;
        }
      });
    },
    // 商户修改密码
    onMerchant(params) {
      merchantChangePwd({
        mcOld: params.mcOld,
        mcNew: params.mcNew,
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
    },
    // 渠道修改密码
    onChannel(params) {
      channelPassword({
        cmId: params.cmId,
        cmOld: params.mcOld,
        cmNew: params.mcNew,
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
    },
  },
};
</script>

<style>
.publish {
  width: 100%;
}
</style>
