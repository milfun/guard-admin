<template>
  <div class="p16">
    <div class="tc-form" v-if="settleList.length > 0">
      <el-table
        ref="multipleTable"
        :data="settleList"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column prop="TRSREF" label="结算单号" />
        <el-table-column prop="TRXREF" label="子批次号" />
        <el-table-column prop="EACNAM" label="账户名称" />
        <el-table-column prop="EACNBR" label="账号" />
        <el-table-column prop="EACBNK" label="开户银行" />
        <el-table-column prop="EACCTY" label="开户地" />
        <el-table-column prop="EACTYP" label="账户类型">
          <template slot-scope="scope">
            {{ ["借记卡", "信用卡"][scope.row.EACTYP] }}
          </template>
        </el-table-column>
        <el-table-column prop="ERRTXT" label="错误原因" />
      </el-table>
    </div>

    <el-empty v-else description="暂无数据"></el-empty>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 关闭 </el-button>
    </div>
  </div>
</template>

<script>
import { taskSettleXftDetail } from "@/api/task.js";

export default {
  name: "XftDetailModal",
  props: {
    value: Object,
  },
  data() {
    return {
      settleList: [],
    };
  },
  mounted() {
    this.getSettleDetail(this.value.tsId);
  },
  methods: {
    getSettleDetail(tsId) {
      if (!tsId) {
        return this.$message.info("请传入tsId");
      }
      taskSettleXftDetail({
        tsId: tsId,
      })
        .then((res) => {
          this.settleList = res.data;
        })
        .catch((err) => {
          return this.$message.error(err.message);
        });
    },
    onCancel() {
      this.$drawer.close();
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
