<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="姓名" prop="mcName" style="width: 420px">
        <el-input v-model="form.mcName" />
      </el-form-item>
      <el-form-item label="性别" prop="mcSex">
        <el-radio-group v-model="form.mcSex" size="small">
          <el-radio border :label="1">男</el-radio>
          <el-radio border :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="证件号" prop="mcNo" style="width: 420px">
        <el-input v-model="form.mcNo" />
      </el-form-item>
      <el-form-item label="证件地址" prop="mcAddress" style="width: 420px">
        <el-input v-model="form.mcAddress" />
      </el-form-item>
      <el-form-item label="机关" prop="mcCity" style="width: 420px">
        <el-input v-model="form.mcCity" />
      </el-form-item>
      <el-form-item label="有效期">
        <div class="flex item-center">
          <el-input v-model="form.mcStart" style="width: 180px" />
          <span class="px10">-</span>
          <el-input v-model="form.mcEnd" style="width: 180px" />
        </div>
      </el-form-item>
      <!-- <el-form-item label="身份证人像面" prop="mmStep">
        <el-image :src="form.mcFront" style="width: 220px" />
      </el-form-item>
      <el-form-item label="身份证国徽面" prop="mmStatus">
        <el-image :src="form.mcFront" style="width: 220px" />
      </el-form-item> -->
    </el-form>
    <div class="flex just-end mt20">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="onConfirm">保存修改</el-button>
    </div>
  </div>
</template>

<script>
import { userEditCard } from "@/api/user";
export default {
  props: {
    value: Object,
  },
  data() {
    return {
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
      const keys = [
        "mcName",
        "mcNo",
        "mcAddress",
        "mcCity",
        "mcStart",
        "mcEnd",
      ];
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
      // console.log("等待修改");
      this.onSave();
    },
    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          userEditCard({
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
