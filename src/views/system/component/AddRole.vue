<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="srName">
        <el-input placeholder="请输入角色名称" v-model="value.srName" />
      </el-form-item>

      <el-form-item label="角色等级" prop="srLevel">
        <el-input placeholder="请输入角色名称" v-model="value.srLevel" />
      </el-form-item>

      <el-form-item label="角色权限" prop="srMenu">
        <el-select
          v-model="value.srMenus"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择角色权限"
        >
          <el-option
            v-for="(item, index) in menuList"
            :key="index"
            :label="item.smTitle"
            :value="item.smId"
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
import { systemAddRole, systemEditRole, systemAllMenu } from "@/api/system.js";
import { isArray } from "@/utils/validate";

export default {
  name: "AddRole",
  props: {
    value: Object,
  },
  data() {
    return {
      menuList: [],
      rules: {
        srName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        srLevel: [
          { required: true, message: "请输入角色等级", trigger: "blur" },
        ],
        srMenus: [
          { required: true, message: "请选择角色拥有的权限", trigger: "blur" },
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
    this.getAllMenu();
  },
  methods: {
    getRoleList() {
      this.$store.dispatch("system/getRoleList", {}).then(() => {});
    },
    getAllMenu() {
      systemAllMenu({}).then((res) => {
        if (res.code == 200) {
          this.menuList = res.data;
        }
      });
    },
    onClose() {
      this.$drawer.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;

          this.value.srMenus = isArray(this.value.srMenus)
            ? this.value.srMenus.join(",")
            : this.value.srMenus;
          this.value.srLevel = +this.value.srLevel;

          systemAddRole({
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

          this.value.srMenus = isArray(this.value.srMenus)
            ? this.value.srMenus.join(",")
            : this.value.srMenus;
          this.value.srLevel = +this.value.srLevel;

          systemEditRole({
            ...this.value,
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
