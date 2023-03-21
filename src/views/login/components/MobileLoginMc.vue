<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="手机号码">
        <el-input
          ref="mobile"
          v-model="form.mobile"
          placeholder="手机号码"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="密码">
        <el-input
          ref="code"
          v-model="form.code"
          type="text"
          placeholder="验证码"
          name="code"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="onLogin"
        >
          <span class="text-primary" slot="append" @click="onCode">
            {{ btnText }}</span
          >
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="onMcLogin"
        >立即登录</el-button
      >

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { merchantMobileLogin, merchantCode } from "@/api/merchant";

export default {
  props: {
    mode: String,
    default: "system",
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
    const validateCode = (rule, value, callback) => {
      if (value.length != 6) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        mobile: "",
        code: "",
      },
      rules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateMobile },
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
      },
      loading: false,
      redirect: undefined,
      limits: 60,
      btnText: "发送验证码",
      codeDisabled: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    onCode() {
      this.codeDisabled = true;
      if (
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.form.mobile
        )
      ) {
        merchantCode({
          bcPhone: this.form.mobile,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.info("发送成功");
              let timer = setTimeout(() => {
                clearTimeout(timer);
                this.cutDownSecond();
              }, 1000);
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        return this.$message.info("请输入正确的手机号");
      }
    },
    // 计时
    cutDownSecond() {
      const { limits } = this;
      if (limits > 0) {
        let timer = setTimeout(() => {
          (this.limits = limits - 1), (this.btnText = `${limits}s后重试`);
          this.cutDownSecond();
          clearTimeout(timer);
        }, 1000);
      } else {
        this.limits = 60;
        this.btnText = "重新发送";
        this.codeDisabled = false;
      }
    },
    onMcLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/mcMobilelogin", this.form)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style></style>
