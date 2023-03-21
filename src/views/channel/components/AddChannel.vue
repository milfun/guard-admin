<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="上级渠道" prop="cmMobile">
        <el-select v-model="value.cmPid" placeholder="请选择上级">
          <el-option label="一级渠道" :value="-1" v-if="user.role == 'admin'" />
          <el-option
            v-for="(item, index) in levelList"
            :key="index"
            :label="item.cmName"
            :value="item.cmId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="渠道名称" prop="cmName">
        <el-input placeholder="请输入渠道名称" v-model="value.cmName" />
      </el-form-item>

      <el-form-item label="手机号码" prop="cmMobile">
        <el-input placeholder="请输入手机号" v-model="value.cmMobile" />
      </el-form-item>

      <el-form-item label="密码" prop="cmPassword" v-if="value.mode == 'add'">
        <el-input placeholder="请输入密码" v-model="value.cmPassword" />
        <div class="f12 text-300">密码请自行保管，平台不保存原始密码</div>
      </el-form-item>

      <!-- <el-form-item label="等级" prop="cmLevel">
        <el-input
          placeholder="请输入等级"
          type="number"
          v-model="value.cmLevel"
        />
      </el-form-item> -->

      <!-- <el-form-item label="角色权限" prop="smRole">
        <el-select v-model="value.smRole" placeholder="请选择角色">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.srName"
            :value="item.srId"
          />
        </el-select>
      </el-form-item> -->
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
import { channelAdd, channelEdit, channelLevel } from "@/api/channel.js";

export default {
  name: "PublishModal",
  props: {
    value: Object,
  },
  data() {
    return {
      levelList: [],
      rules: {
        cmName: [
          { required: true, message: "请输入渠道名称", trigger: "blur" },
        ],
        cmMobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        cmPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        cmRole: [{ required: true, message: "请选择角色", trigger: "blur" }],
        cmLevel: [{ required: true, message: "请输入权限", trigger: "blur" }],
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getLevelList();
    console.log(this.user);
  },
  methods: {
    // 获取上级数据
    getLevelList() {
      channelLevel({
        cmPid: -1, // 这里必须是-1
      })
        .then((res) => {
          if (res.code == 200) {
            this.levelList = res.data;
            // 自动选中自己
            if (this.user.role == "channel") {
              this.value.cmPid = res.data[0].cmId;
            }
          }
        })
        .catch((err) => {
          this.$message.error(err.message || "出错，请重试");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onClose() {
      this.$drawer.close();
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.value.cmHash = "" + this.value.cmHash;
          this.value.cmRole = +5;
          channelAdd({
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

          this.value.cmPid = this.value.cmPid ? this.value.cmPid : -1;

          channelEdit({
            cmId: value.cmId,
            cmName: value.cmName,
            cmMobile: value.cmMobile,
            cmPid: value.cmPid,
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
