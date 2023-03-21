<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="mmName">
        <el-input placeholder="请输入姓名" v-model="value.mmName" />
      </el-form-item>

      <el-form-item label="手机" prop="mmMobile">
        <el-input placeholder="请输入手机号" v-model="value.mmMobile" />
      </el-form-item>
      <el-form-item label="证件ID" prop="mmCard">
        <el-input placeholder="请输入证件ID" v-model="value.mmCard" />
      </el-form-item>
      <el-form-item label="银行ID" prop="mmBank">
        <el-input placeholder="请输入银行ID" v-model="value.mmBank" />
      </el-form-item>
      <el-form-item label="合同Id" prop="mmContract">
        <el-input placeholder="请输入合同Id" v-model="value.mmContract" />
      </el-form-item>
      <el-form-item label="当前步骤" prop="mmStep">
        <el-input placeholder="请输入当前步骤" v-model="value.mmStep" />
      </el-form-item>

      <el-form-item label="状态" prop="mmStatus">
        <el-input placeholder="请输入状态" v-model="value.mmStatus" />
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button v-if="value.mode == 'add'" type="primary" @click="onConfirm"
        >确定新增</el-button
      >
      <el-button v-else type="primary" @click="onSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { systemAddAdmin, systemEditAdmin } from "@/api/system.js";
export default {
  name: "PublishModal",
  props: {
    value: Object,
  },
  data() {
    return {
      rules: {
        mmName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mmMobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        mmCard: [{ required: true, message: "请输入证件ID", trigger: "blur" }],
        mmBank: [{ required: true, message: "请输入银行ID", trigger: "blur" }],
        mmContract: [
          { required: true, message: "请输入合同ID", trigger: "blur" },
        ],
        mmStep: [
          { required: true, message: "请输入当前步骤", trigger: "blur" },
        ],
        mmStatus: [
          { required: true, message: "请选择当前状态", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["roleList"]),
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$store.dispatch("system/getRoleList", {});
    },
    onClose() {
      this.$drawer.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;

          this.value.smHash = "" + this.value.smHash;
          systemAddAdmin({
            ...this.value,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功");
                this.$drawer.confirm(res.data);
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
    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          let value = this.value;
          systemEditAdmin({
            smId: value.smId,
            smName: value.smName,
            smMobile: value.smMobile,
            smRole: +value.smRole,
            smPassword: value.smPassword,
            smHash: value.smHash + "",
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("保存成功");
                this.$drawer.confirm(res.data);
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

<style>
.publish {
  width: 100%;
}
</style>
