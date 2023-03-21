<template>
  <div class="wraper">
    <div class="header">后台管理中心</div>
    <div class="body">
      <!-- 左边 -->
      <div class="left">
        <img src="../../assets/login-ad.png" />
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="login-box">
          <div class="title">
            <h2>登录后台管理中心</h2>
          </div>
          <div class="flex-1 p16">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="账号登录" name="account">
                <account-login></account-login>
              </el-tab-pane>

              <el-tab-pane label="手机号登录" name="mobile">
                <mobile-login></mobile-login>
              </el-tab-pane>
            </el-tabs>
          </div>

          <div class="foot">登录即代表同意用户协议和隐私条款 无法登录？</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div></div>
      <div></div>
      客服电话 0591-38716888 工作时间：9:30-18:30 Copy Right Serve
    </div>
  </div>
</template>

<script>
import MobileLogin from "./components/MobileLogin.vue";
import AccountLogin from "./components/AccountLogin.vue";

export default {
  name: "Login",
  components: {
    MobileLogin,
    AccountLogin,
  },
  data() {
    return {
      activeName: "account",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="scss">
.wraper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #2983bb;
  height: 100vh;
}
.header {
  position: absolute;
  top: 20px;
  left: 60px;
  color: #fff;
  font-size: 20px;
}
.body {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgb(12 40 103 / 10%);
  box-sizing: border-box;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    height: 100%;
    background: #f8fcff;
    border-right: 1px solid #f6f6f8;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 550px;
    height: 100%;
    padding: 20px;
    background: #fff;
  }
}
.login-box {
  // position: absolute;
  // right: calc(50vw - 580px);
  // top: 90px;
  position: relative;
  // top: 50px;
  color: #444;
  display: flex;
  flex-direction: column;
  height: 452px;
  overflow: hidden;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  width: 352px;
  z-index: 1;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgb(12 40 103 / 10%);

  .title {
    height: auto;
    width: 100%;
    padding: 0;
    text-align: center;
  }

  .foot {
    padding: 16px;
    font-size: 12px;
    background: #f6f6f8;
  }
}

.footer {
  position: absolute;
  bottom: 50px;
  right: 100px;
  font-size: 12px;
  color: #fff;
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
