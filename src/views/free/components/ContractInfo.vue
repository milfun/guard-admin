<template>
  <div>
    <el-form ref="form" :model="value" :rules="rules" label-width="100px">
      <el-form-item label="id" prop="mcId" style="width: 420px">
        <el-input readonly v-model="value.mcId" />
      </el-form-item>
      <el-form-item label="合同编号" prop="mcNo" style="width: 420px">
        <el-input readonly v-model="value.mcNo" />
      </el-form-item>
      <el-form-item label="合同连接" prop="mcLink" style="width: 420px">
        <el-input readonly v-model="value.mcLink" />
      </el-form-item>
      <el-form-item label="签约日期" prop="mcDate" style="width: 420px">
        <el-input v-model="value.mcDate" />
      </el-form-item>
      <el-form-item label="合同状态" prop="mcStatus" style="width: 420px">
        <el-input v-model="value.mcStatus" />
      </el-form-item>
    </el-form>
    <div class="flex just-end mt20">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="onConfirm">更新</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
  },
  data() {
    return {
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
    if (this.value) {
      this.form = JSON.parse(JSON.stringify(this.value));
    }
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
