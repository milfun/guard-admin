<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="smName">
        <el-input placeholder="请输入姓名" v-model="value.smName" />
      </el-form-item>

      <el-form-item label="手机" prop="smMobile">
        <el-input placeholder="请输入手机号" v-model="value.smMobile" />
      </el-form-item>

      <el-form-item label="密码" prop="smPassword">
        <el-input placeholder="请输入密码" v-model="value.smPassword" />
      </el-form-item>

      <el-form-item label="等级" prop="smLevel">
        <el-input
          placeholder="请输入等级"
          type="number"
          v-model="value.smLevel"
        />
      </el-form-item>

      <el-form-item label="角色权限" prop="smRole">
        <el-select v-model="value.smRole" placeholder="请选择角色">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.srName"
            :value="item.srId"
          />
        </el-select>
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
        smName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        smMobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        smPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        smRole: [{ required: true, message: "请选择角色", trigger: "blur" }],
        smLevel: [{ required: true, message: "请输入权限", trigger: "blur" }],
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
          this.value.smLevel = +this.value.smLevel;
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
            smLevel: +value.smLevel,
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
