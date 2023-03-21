<template>
  <div class="">
    <div class="tc-form">
      <el-form
        v-loading="loading"
        :model="value"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        hide-required-mark
        ref="form"
      >
        <el-form-item label="发票文件" prop="miStatus">
          <el-input placeholder="管理员未上传发票文件" v-model="value.miImage">
            <span
              class="text-primary"
              slot="append"
              @click="onDownLoad(value.miImage)"
            >
              下载文件</span
            >
          </el-input>
        </el-form-item>

        <el-form-item label="商家复核结果" prop="miStatus">
          <el-select v-model="value.miStatus" placeholder="请选择">
            <el-option label="复核中" :value="4"></el-option>
            <el-option label="复核通过" :value="5"></el-option>
            <el-option label="复核驳回" :value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="驳回原因"
          prop="miReason"
          placeholder="请填写驳回原因"
          v-show="value.miStatus == 6"
        >
          <el-input v-model="value.miReadjust" />
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 取消 </el-button>
      <el-button
        class="confirm-btn"
        key="submit"
        type="primary"
        @click="onConfirm"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import { invoiceEdit } from "@/api/merchant.js";

export default {
  name: "FreeUserAdjustModal",
  props: {
    value: Object,
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {},
  mounted() {
    // console.log(this.value);
  },
  methods: {
    onConfirm() {
      let params = {};

      // console.log(this.value);
      if (this.value.miId) {
        this.loading = true;

        params.miId = this.value.miId;
        params.miStatus = +this.value.miStatus;
        params.miReadjust = this.value.miReadjust;

        invoiceEdit({
          miId: params.miId,
          miStatus: params.miStatus,
          miReadjust: params.miReadjust,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("保存成功！");
              this.$modal.confirm(res.data);
              this.$modal.close();
            }
          })
          .catch((err) => {
            this.$message.error(err.message || "出错，请重试");
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$message.error("出错，miId 不存在");
      }
    },
    onCancel() {
      this.$modal.close();
    },
    onDownLoad(url) {
      if (url) {
        window.open(url);
      } else {
        this.$message.error("url不能为空");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
