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
      <el-form-item prop="手机号">
        <el-input
          ref="name"
          v-model="form.mobile"
          placeholder="请输入手机号"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="密码">
        <el-input
          :key="passwordType"
          ref="pwd"
          v-model="form.pwd"
          :type="passwordType"
          placeholder="Pwd"
          name="pwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="onLogin"
        >
          <span slot="append" class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="onConfirm"
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
import { validateMobile } from "@/utils/validate";
export default {
  data() {
    const validateAccount = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        mobile: "",
        pwd: "",
      },
      rules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateAccount },
        ],
        pwd: [{ required: true, trigger: "blur", validator: validatePwd }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  props: {
    mode: String,
    default: "system",
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
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.pwd.focus();
      });
    },
    onConfirm() {
      this.onMcLogin();
    },
    onMcLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/mclogin", this.form)
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
