<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="Id" prop="smId">
        <el-input disabled placeholder="请输入Id" v-model="value.smId" />
      </el-form-item>
      <el-form-item label="父Id" prop="smPid">
        <!-- <el-input placeholder="请输入父Id" v-model="value.smPid" /> -->
        <el-select v-model="value.smPid" placeholder="请选择父级菜单">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.smName"
            :value="item.smId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="smName">
        <el-input placeholder="请输入标题" v-model="value.smName" />
      </el-form-item>

      <el-form-item label="路径" prop="smPath">
        <el-input placeholder="请输入路径" v-model="value.smPath" />
      </el-form-item>
      <el-form-item label="组件" prop="smComponent">
        <el-input placeholder="请输入路径" v-model="value.smComponent" />
      </el-form-item>
      <el-form-item label="类型" prop="smType">
        <el-radio-group v-model="value.smType" size="medium">
          <el-radio border :label="1">菜单级</el-radio>
          <el-radio border :label="2">按钮级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题" prop="smTitle">
        <el-input placeholder="请输入路径" v-model="value.smTitle" />
      </el-form-item>
      <el-form-item label="图标" prop="smIcon">
        <el-input placeholder="请输入路径" v-model="value.smIcon" />
      </el-form-item>
      <el-form-item label="重定向" prop="smRedirect">
        <el-input placeholder="请输入路径" v-model="value.smRedirect" />
      </el-form-item>
      <el-form-item label="隐藏" prop="smHidden">
        <el-radio-group v-model="value.smHidden" size="medium">
          <el-radio border :label="1">是</el-radio>
          <el-radio border :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="smStatus">
        <el-select v-model="value.smRole" placeholder="请选择角色">
          <el-option
            v-for="(item, index) in statusData"
            :key="index"
            :label="item.text"
            :value="item.value"
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
import { systemAddMenu, systemEditMenu } from "@/api/system.js";

const statusData = [
  { text: "正常", color: "text-green", type: "", value: 1 },
  { text: "禁用", color: "text-yellow", type: "info", value: 2 },
  { text: "删除", color: "text-500", type: "danger", value: 3 },
];

export default {
  name: "PublishModal",
  props: {
    value: Object,
  },
  data() {
    return {
      statusData,
      rules: {
        smName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        smPid: [{ required: true, message: "请输入父id", trigger: "blur" }],
        smName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        smPath: [{ required: true, message: "请输入路径", trigger: "blur" }],
        smComponent: [
          { required: true, message: "请输入组件", trigger: "blur" },
        ],
        smType: [{ required: true, message: "请选择类型", trigger: "blur" }],
        smTitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        smIcon: [{ required: true, message: "请输入图标", trigger: "blur" }],
        smRedirect: [
          { required: true, message: "请输入重定向名称", trigger: "blur" },
        ],
        smHidden: [
          { required: true, message: "请选择是否隐藏", trigger: "blur" },
        ],
      },
      typeList: [],
      loading: false,
    };
  },
  computed: {
    // typeList() {
    //   return this.menuList.fillter();
    // },
    ...mapGetters(["menuList"]),
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.$store.dispatch("system/getMenuList", {}).then((res) => {
        this.typeList = res.filter((item) => {
          return item.smPid == 0;
        });
        // console.log(this.typeList);
      });
    },
    onClose() {
      this.$drawer.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;

          this.value.smHash = "" + this.value.smHash;
          systemAddMenu({
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
          systemEditMenu({
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
