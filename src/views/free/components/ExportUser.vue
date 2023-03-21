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
        <el-form-item label="选择日期" prop="tmStart">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="form.mmStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span class="mx10">-</span>
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            v-model="form.mmEnd"
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
import { userExport } from "@/api/user.js";
import { formatDate } from "@/utils/index.js";

export default {
  name: "ExportUserModal",
  props: {
    value: Object,
  },
  data() {
    return {
      loading: false,
      form: {
        mmStart: "2022-01-01",
        mmEnd: "",
      },
      list: [],
      listLoading: true,
      downloadLoading: false,
      filename: "自由职业者列表",
      autoWidth: true,
      bookType: "xlsx",
    };
  },
  watch: {},
  mounted() {
    console.log(this.value);
  },
  methods: {
    onConfirm() {
      // console.log(this.value);
      if (this.form.mmEnd) {
        this.loading = true;
        userExport({
          mmStart: this.form.mmStart,
          mmEnd: this.form.mmEnd,
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
        this.$message.error("出错，smId 不存在");
      }
    },
    onCancel() {
      this.$modal.close();
    },
    onDownload() {
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "用户ID",
          "用户姓名",
          "用户手机号",
          "身份证号",
          "身份证姓名",
          "性别",
          "身份证地址",
          "机关",
          "身份证开始日期",
          "身份证截止日期",
          "银行卡识别结果",
          "开户行",
          "开户支行",
          "卡号",
          "当前步骤",
          "注册时间",
        ];
        const filterVal = [
          "mmId",
          "mmName",
          "mmMobile",
          "mcNo",
          "mcName",
          "mcSex",
          "mcAddress",
          "mcCity",
          "mcStart",
          "mcEnd",
          "mbName",
          "mbBank",
          "mbBranch",
          "mbNo",
          "mmStep",
          "createdAt",
        ];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
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
          if (j === "mcStart" || j === "mcEnd") {
            if (v[j].length == 8) {
              return this.formateNumber(v[j]);
            } else {
              return formatDate(v[j], "YYYY/MM/DD");
            }
          } else {
            return v[j];
          }
        })
      );
    },
    // 20020806 to 2002/08/06
    formateNumber(str) {
      return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6)}`;
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
