<template>
  <div class="">
    <div class="tc-form">
      <el-form
        v-loading="loading"
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        hide-required-mark
        ref="form"
      >
        <el-form-item label="选择日期" prop="tsStart">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="form.tsStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span class="mx10">-</span>
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            v-model="form.tsEnd"
          ></el-date-picker>
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
import { taskSettleExport } from "@/api/task.js";
import { formatFloatNo } from "@/utils/index.js";

export default {
  name: "ExportSettleModal",
  props: {
    value: Object,
  },
  data() {
    return {
      loading: false,
      form: {
        tsStart: "2022-01-01",
        tsEnd: "",
      },
      list: [],
      listLoading: true,
      downloadLoading: false,
      filename: "结算明细表",
      autoWidth: true,
      bookType: "xlsx",
    };
  },
  watch: {},
  mounted() {
    // console.log(this.value);
  },
  methods: {
    onConfirm() {
      // console.log(this.value);
      if (this.form.tsEnd) {
        this.loading = true;
        taskSettleExport({
          tsStart: this.form.tsStart,
          tsEnd: this.form.tsEnd,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("导出成功！");
              this.list = res.data;
              this.onDownload();
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
        this.$message.error("请选择结算截止日期");
      }
    },
    onCancel() {
      this.$modal.close();
    },
    onDownload() {
      import("@/vendor/Export2Excel").then(async (excel) => {
        const tHeader = [
          "批次号",
          "子批次号",
          "商户名称",
          "姓名",
          "身份证号",
          "手机号",
          "银行卡",
          "发放金额",
          "服务费",
          "结算金额",
        ];
        const filterVal = [
          "tsNo",
          "tsCno",
          "mcName",
          "mmName",
          "mmCard",
          "mmMobile",
          "mmBank",
          "tsCoin",
          "tsRate",
          "tsTotal",
        ];
        const list = this.list;
        const data = await this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (["tsCoin", "tsRate", "tsTotal"].includes(j)) {
            // console.log(j, v[j]);
            return formatFloatNo(v[j] / 100);
          } else {
            return v[j];
          }
        })
      );
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
