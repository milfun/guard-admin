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
        <el-form-item label="审核结果" prop="mcStatus">
          <el-radio-group v-model="value.mcStatus">
            <el-radio
              v-for="(item, index) in statusData"
              :key="index"
              :label="item.value"
            >
              {{ item.text }}
            </el-radio>
          </el-radio-group>
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
import { merchantBase } from "@/api/merchant.js";

const statusData = [
  { text: "待审核", color: "text-300", type: "", value: 1 },
  { text: "正常", color: "text-green", type: "", value: 2 },
  { text: "禁用", color: "text-yellow", type: "info", value: 9 },
];

export default {
  name: "FreeUserAdjustModal",
  props: {
    value: Object,
  },
  data() {
    return {
      statusData,
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
      if (this.value.mcId) {
        this.loading = true;

        params.mcId = this.value.mcId;
        params.mcStatus = +this.value.mcStatus;
        if (this.value.mcStatus == 2) {
          params.mcStep = 99;
        }
        merchantBase({
          ...params,
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
        this.$message.error("出错，mcId 不存在");
      }
    },
    onCancel() {
      this.$modal.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.textArea {
  background: #f1f6ff;
  border-radius: 5px;
  border: 0;
}

.textNum {
  position: relative;
  text-align: right;
  top: -50px;
  right: 10px;
}
</style>
