const validate = {
  // validatePass: (rule, value, callback) => {
  //   if (value === "") {
  //     callback(new Error("请输入密码"));
  //   } else {
  //     if (this.ruleForm.checkPass !== "") {
  //       this.$refs.ruleForm.validateField("checkPass");
  //     }
  //     callback();
  //   }
  // },
  checkEmail: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("邮箱不能为空"));
    } else {
      const result =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        );
      if (!result) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    }
  },
  checkMobile: (rule, value, callback) => {
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
  },
};

export default validate;
