<template>
  <div class="p16">
    <el-form ref="form" :model="value" :rules="rules" label-width="100px">
      <el-form-item label="资质地" prop="cmId">
        <el-select v-model="value.cmId" placeholder="请选择">
          <el-option label="福建岚融科技有限公司" value="10010"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="mcName">
        <el-input v-model="value.mcName" />
        <!-- <span class="text-200 ml20 f12">* 请填写企业名称</span> -->
      </el-form-item>
      <el-form-item label="企业统一信用代码" prop="mcCode">
        <el-input v-model="value.mcCode" />
        <!-- <span class="text-200 ml20 f12">* 请填写企业统一信用代码</span> -->
      </el-form-item>
      <el-form-item label="企业对公邮箱" prop="mcEmail">
        <el-input v-model="value.mcEmail" />
        <!-- <span class="text-200 ml20 f12">* 请填写企业对公邮箱</span> -->
      </el-form-item>
      <el-form-item label="公司注册地址" prop="mcAddress">
        <el-input v-model="value.mcAddress" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="法人姓名" prop="mcLegalName">
        <el-input v-model="value.mcLegalName" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="法人证件类型" prop="mcLegalType">
        <el-select v-model="value.mcLegalType" placeholder="请选择">
          <el-option label="身份证" value="身份证"> </el-option>
          <el-option label="护照" value="护照"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="法人证件号" prop="mcLegal">
        <el-input v-model="value.mcLegal" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="联系人姓名" prop="mcContractName">
        <el-input v-model="value.mcContractName" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="联系人手机号" prop="mcContractMobile">
        <el-input v-model="value.mcContractMobile" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="mcContractEmail">
        <el-input v-model="value.mcContractEmail" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="企业主要业务收入" prop="mcMajor">
        <el-input v-model="value.mcMajor" />
      </el-form-item>
      <el-form-item label="企业注册时间" prop="mcRegTime">
        <el-date-picker
          type="date"
          placeholder="选择注册时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="value.mcRegTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="注册资本" prop="mcRegMoney">
        <el-input v-model="value.mcRegMoney">
          <span class="text-primary" slot="append"> (万元)</span>
        </el-input>
      </el-form-item>
      <el-form-item label="所在行业" prop="mcTrade">
        <el-input v-model="value.mcTrade" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item label="企业年收入规模" prop="mcIncome">
        <el-input v-model="value.mcIncome">
          <span class="text-primary" slot="append"> (万元)</span>
        </el-input>
      </el-form-item>
      <el-form-item label="企业纳税人身份" prop="mcTaxType">
        <el-radio-group v-model="value.mcTaxType" size="medium">
          <el-radio border :label="1">一般纳税人</el-radio>
          <el-radio border :label="2">小规模纳税人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邀请码" prop="mcInvite">
        <el-input v-model="value.mcInvite" />
        <!-- <span class="text-200 ml20 f12">* 请填写</span> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import MobileLogin from "./components/MobileLogin.vue";
// import AccountLogin from "./components/AccountLogin.vue";
import validate from "./validate.js";
import { merchantEditBase, merchantBase } from "@/api/merchant";

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
          if (this.value.mode == "system") {
            this.onSave();
          } else {
            this.onMcSave();
          }
          // console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 商户自己注册
    onMcSave() {
      let value = JSON.parse(JSON.stringify(this.value));

      value.cmId = +value.cmId;
      value.mcIncome = +value.mcIncome;

      // return;
      merchantEditBase({
        cmId: value.cmId,
        mcCode: value.mcCode,
        mcEmail: value.mcEmail,
        mcAddress: value.mcAddress,
        mcLegalName: value.mcLegalName,
        mcLegalType: value.mcLegalType,
        mcLegal: value.mcLegal,
        mcContractName: value.mcContractName,
        mcContractMobile: value.mcContractMobile,
        mcContractEmail: value.mcContractEmail,
        mcMajor: value.mcMajor,
        mcRegTime: value.mcRegTime,
        mcRegMoney: value.mcRegMoney,
        mcTrade: value.mcTrade,
        mcIncome: value.mcIncome,
        mcInvite: value.mcInvite,
        mcTaxType: value.mcTaxType,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功");
            this.$drawer.confirm(res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 管理员保存
    onSave() {
      let value = JSON.parse(JSON.stringify(this.value));

      value.cmId = +value.cmId;
      value.mcIncome = +value.mcIncome;

      // return;
      merchantBase({
        mcId: value.mcId,
        cmId: value.cmId,
        mcCode: value.mcCode,
        mcEmail: value.mcEmail,
        mcAddress: value.mcAddress,
        mcLegalName: value.mcLegalName,
        mcLegalType: value.mcLegalType,
        mcLegal: value.mcLegal,
        mcContractName: value.mcContractName,
        mcContractMobile: value.mcContractMobile,
        mcContractEmail: value.mcContractEmail,
        mcMajor: value.mcMajor,
        mcRegTime: value.mcRegTime,
        mcRegMoney: value.mcRegMoney,
        mcTrade: value.mcTrade,
        mcIncome: value.mcIncome,
        mcInvite: value.mcInvite,
        mcTaxType: value.mcTaxType,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功");
            this.$drawer.confirm(res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style lang="scss"></style>
