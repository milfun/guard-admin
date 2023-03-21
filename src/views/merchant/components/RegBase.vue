<template>
  <el-card class="mt20">
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="资质地" prop="cmId">
        <el-select v-model="form.cmId" placeholder="请选择">
          <el-option label="福建岚融科技有限公司" value="10010"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="mcName">
        <el-input v-model="form.mcName" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写企业名称</span> -->
      </el-form-item>
      <el-form-item label="企业统一信用代码" prop="mcCode">
        <el-input v-model="form.mcCode" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写企业统一信用代码</span> -->
      </el-form-item>
      <el-form-item label="企业对公邮箱" prop="mcEmail">
        <el-input v-model="form.mcEmail" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写企业对公邮箱</span> -->
      </el-form-item>
      <el-form-item label="公司注册地址" prop="mcAddress">
        <el-input v-model="form.mcAddress" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="法人姓名" prop="mcLegalName">
        <el-input v-model="form.mcLegalName" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="法人证件类型" prop="mcLegalType">
        <el-select v-model="form.mcLegalType" placeholder="请选择">
          <el-option label="身份证" value="身份证"> </el-option>
          <el-option label="护照" value="护照"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="法人证件号" prop="mcLegal">
        <el-input v-model="form.mcLegal" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="联系人姓名" prop="mcContractName">
        <el-input v-model="form.mcContractName" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="联系人手机号" prop="mcContractMobile">
        <el-input v-model="form.mcContractMobile" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="mcContractEmail">
        <el-input v-model="form.mcContractEmail" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="企业主要业务收入" prop="mcMajor">
        <el-input v-model="form.mcMajor" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="企业注册时间" prop="mcRegTime">
        <el-date-picker
          type="date"
          placeholder="选择注册时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="form.mcRegTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="注册资本" prop="mcRegMoney">
        <el-input v-model="form.mcRegMoney" style="width: 420px">
          <span class="text-primary" slot="append"> (万元)</span>
        </el-input>
        <span class="text-200 ml20 f12">* 请填写阿拉伯数字</span>
      </el-form-item>
      <el-form-item label="所在行业" prop="mcTrade">
        <el-input v-model="form.mcTrade" style="width: 420px" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="企业年收入规模" prop="mcIncome">
        <el-input v-model="form.mcIncome" style="width: 420px">
          <span class="text-primary" slot="append"> (元)</span>
        </el-input>
        <span class="text-200 ml20 f12">* 请填写阿拉伯数字</span>
      </el-form-item>
      <el-form-item label="企业纳税人身份" prop="mcTaxType">
        <el-radio-group v-model="form.mcTaxType" size="medium">
          <el-radio border :label="1">一般纳税人</el-radio>
          <el-radio border :label="2">小规模纳税人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// import MobileLogin from "./components/MobileLogin.vue";
// import AccountLogin from "./components/AccountLogin.vue";
import validate from "./validate.js";
import { merchantAddBase, merchantBase } from "@/api/merchant";

export default {
  name: "Login",
  components: {
    // MobileLogin,
    // AccountLogin,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      step: 1,
      form: {
        cmId: "10010",
        mcCode: "",
        mcEmail: "",
        mcAddress: "",
        mcLegalName: "",
        mcLegalType: "",
        mcLegal: "",
        mcContractName: "",
        mcContractMobile: "",
        mcContractEmail: "",
        mcMajor: "",
        mcRegTime: "",
        mcRegMoney: "",
        mcTrade: "",
        mcIncome: 0,
        mcTaxType: 1,
      },
      rules: {
        cmId: [{ required: true, message: "请选择资质地", trigger: "blur" }],
        mcName: [
          { required: true, message: "请填写企业名称", trigger: "blur" },
        ],
        mcCode: [
          {
            required: true,
            message: "请填写企业统一信用代码",
            trigger: "blur",
          },
        ],
        mcEmail: [
          {
            required: true,
            validator: validate.checkEmail,
            trigger: "blur",
          },
        ],
        mcAddress: [
          { required: true, message: "公司注册地址", trigger: "blur" },
        ],
        mcLegalName: [
          { required: true, message: "请填写法人姓名", trigger: "blur" },
        ],
        mcLegalType: [
          { required: true, message: "请选择法人证件类型", trigger: "blur" },
        ],
        mcLegal: [
          { required: true, message: "请填写法人证件号", trigger: "blur" },
        ],
        mcContractName: [
          { required: true, message: "请填写联系人姓名", trigger: "blur" },
        ],
        mcContractMobile: [
          { required: true, validator: validate.checkMobile, trigger: "blur" },
        ],
        mcContractEmail: [
          { required: true, validator: validate.checkEmail, trigger: "blur" },
        ],
        mcMajor: [
          {
            required: true,
            message: "请填写企业主要业务收入",
            trigger: "blur",
          },
        ],
        mcRegTime: [
          { required: true, message: "请选择企业注册时间", trigger: "blur" },
        ],
        mcRegMoney: [
          { required: true, message: "请填写注册资本", trigger: "blur" },
        ],
        mcTrade: [
          { required: true, message: "请选择所在行业", trigger: "blur" },
        ],
        mcIncome: [
          { required: true, message: "请填写企业年收入规模", trigger: "blur" },
        ],
        mcTaxType: [
          {
            required: true,
            message: "请选择纳税人身份",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.onMcSave();
          // console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 商户自己注册
    onMcSave() {
      let form = JSON.parse(JSON.stringify(this.form));

      form.cmId = +form.cmId;
      form.mcIncome = +form.mcIncome;

      merchantAddBase({
        ...form,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功");
            this.$emit("confirm", res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 管理员注册
    onSystemSave() {},
  },
};
</script>

<style lang="scss"></style>
