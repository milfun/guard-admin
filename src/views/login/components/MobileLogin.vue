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
      <el-form-item prop="用户名">
        <el-input
          ref="mobile"
          v-model="form.smMobile"
          placeholder="手机号码"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="验证码">
        <el-input
          ref="code"
          v-model="form.smCode"
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
        @click.native.prevent="onLogin"
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
import { systemCode } from "@/api/system";
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
        smMobile: "",
        smCode: "",
      },
      rules: {
        smMobile: [
          { required: true, trigger: "blur", validator: validateMobile },
        ],
        smCode: [{ required: true, trigger: "blur", validator: validateCode }],
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
          this.form.smMobile
        )
      ) {
        systemCode({
          bcPhone: this.form.smMobile,
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
    onLogin() {
      // console.log(11);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/mobileLogin", this.form)
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
