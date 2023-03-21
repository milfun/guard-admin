<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :loading="loading"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="mmName" style="width: 420px">
        <el-input v-model="form.mmName" />
      </el-form-item>
      <el-form-item label="手机号" prop="mmMobile" style="width: 420px">
        <el-input v-model="form.mmMobile" />
      </el-form-item>
      <!-- <el-form-item label="绑定身份Id" prop="mmCard">
      <el-input v-model="value.mmCard" />
    </el-form-item>
    <el-form-item label="绑定银行卡id" prop="mmBank">
      <el-input v-model="value.mmBank" />
    </el-form-item>
    <el-form-item label="绑定合同id" prop="mmContract">
      <el-input v-model="value.mmContract" />
    </el-form-item> -->
      <el-form-item label="步骤" prop="mmStep">
        <el-select v-model="form.mmStep" placeholder="请选择">
          <el-option label="资质地" :value="1"> </el-option>
          <el-option label="基本信息" :value="2"> </el-option>
          <el-option label="身份信息" :value="3"> </el-option>
          <el-option label="银行信息" :value="4"> </el-option>
          <el-option label="已签约" :value="5"> </el-option>
          <el-option label="已完成" :value="99"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="mmStatus">
        <el-radio-group v-model="form.mmStatus" size="small">
          <el-radio border :label="1">正常</el-radio>
          <el-radio border :label="2">审核未通过</el-radio>
          <el-radio border :label="9">已封禁</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="flex just-end mt20">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="onConfirm">保存修改</el-button>
    </div>
  </div>
</template>

<script>
import { stepData, statusData } from "../staticData.js";
import { userEdit } from "@/api/user";
export default {
  props: {
    value: Object,
  },
  data() {
    return {
      stepData,
      statusData,
      form: {},
      loading: false,
      rules: {
        nmTitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        nmNumber: [
          { required: true, message: "请输入文件号", trigger: "blur" },
        ],
        nmWay: [{ required: true, message: "请选择跳转方式", trigger: "blur" }],
        nmType: [{ required: true, message: "请选择模块", trigger: "blur" }],
        nmContent: [
          { required: true, message: "请输入正文内容", trigger: "blur" },
        ],
        nmLink: [
          { required: true, message: "请输入跳转连接", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    value(val) {
      this.form = JSON.parse(JSON.stringify(val));
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.value));
  },
  methods: {
    onClose() {
      this.$modal.close();
    },
    // 校验
    onConfirm() {
      const { form, value } = this;
      const keys = ["mmName", "mmMobile", "mmStep", "mmStatus"];
      let flag = false;
      for (const item of keys) {
        // console.log(form[item] == value[item]);
        if (form[item] != value[item]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return this.$message.info("数据没有修改，无需保存");
      }
      console.log("等待修改");
      this.onSave();
    },
    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          userEdit({
            ...this.form,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$modal.confirm(res.data);
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

<style></style>
