<template>
  <div class="p16">
    <upload-excel-component
      :transformData="transformData"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="(item, index) of tableHeader"
        :key="item"
        :prop="item"
        :label="Array.from(transformData.keys())[index]"
      />

      <el-table-column prop="isImportant" label="导入结果"></el-table-column>
    </el-table>

    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 关闭 </el-button>
      <el-button
        class="confirm-btn"
        key="submit"
        type="primary"
        @click="onConfirm"
      >
        确定导入
      </el-button>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { taskReceiveImport } from "@/api/task.js";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      transformData: new Map([
        ["姓名", "mmName"],
        ["身份证", "mmCard"],
        ["手机号", "mmMobile"],
        ["银行卡号", "mmBank"],
        ["单位", "trUnit"],
        ["单价", "trCoin"],
        ["数量", "trMerchantDay"],
        ["金额", "trTotal"],
        ["备注", "trRemark"],
      ]),
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
    onConfirm() {
      // console.log(this.tableData);
      // return;
      const { tableData } = this;

      tableData.map((item) => {
        item.mmMobile = "" + item.mmMobile;
        item.mmCard = "" + item.mmCard;
        item.mmBank = "" + item.mmBank;
        item.tmTotal = item.trTotal; // 这里因后端是整形，前端须在这字段中
      });

      if (tableData.length > 0) {
        this.loading = true;
        taskReceiveImport({
          tsData: JSON.stringify(tableData),
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("导入成功！");

              // 导入结果
              this.tableData = res.data;

              this.$alert(`已成功导入条${res.data.length}数据`, "导入结果", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$drawer.confirm(res.data);
                },
              });
            }
          })
          .catch((err) => {
            this.$message.error(err.message || "出错，请重试");
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$message.error("出错，");
      }
    },
    onCancel() {
      this.$drawer.close();
    },
  },
};
</script>
