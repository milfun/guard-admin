<template>
  <div class="publish p16">
    <el-form
      v-loading="loading"
      ref="form"
      :model="value"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="商户ID" prop="mcId">
        <el-input placeholder="请输入商户Id" v-model="value.mcId" />
      </el-form-item>

      <el-form-item label="渠道名称" prop="mcChannel">
        <el-select v-model="value.mcChannel" placeholder="请选择">
          <el-option
            v-for="(item, index) in channelList"
            :key="index"
            :label="item.cmName"
            :value="item.cmKey"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onConfirm">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import { merchantInvoice } from "@/api/merchant.js";
import { channelAll, channelBind } from "@/api/channel.js";
export default {
  name: "InvoiceDrawer",
  props: {
    value: Object,
  },
  data() {
    return {
      // value: {},
      rules: {
        mcId: [{ required: true, message: "请选择商户id", trigger: "blur" }],
        mcChannel: [{ required: true, message: "请选择渠道", trigger: "blur" }],
      },
      channelList: [],
      loading: false,
      disabled: false,
    };
  },
  mounted() {
    this.getLevelList();
  },
  methods: {
    // 获取渠道数据
    getLevelList() {
      channelAll({})
        .then((res) => {
          if (res.code == 200) {
            this.channelList = res.data;
            // 自动选中自己
            // if (this.user.role == "channel") {
            //   this.value.cmPid = res.data[0].cmId;
            // }
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
          this.disabled = true;
          let params = this.value;

          channelBind({
            mcId: params.mcId,
            mcChannel: params.mcChannel,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("绑定成功");
                this.$drawer.confirm(res.data);
              }
            })
            .catch((err) => {
              this.$message.error(err.message || "出错，请重试");
            })
            .finally(() => {
              this.loading = false;
              this.disabled = false;
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
