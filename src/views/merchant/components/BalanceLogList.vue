<template>
  <div class="p16">
    <div class="tc-form" v-if="list.length > 0">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column prop="blId" label="ID" />
        <el-table-column prop="blName" label="项目" />
        <el-table-column prop="blCoin" label="金额">
          <template slot-scope="scope">
            <span
              class="f18 bold"
              :class="scope.row.blType == 1 ? 'text-green' : 'text-red'"
              >{{ scope.row.blType == 1 ? "+" : "-"
              }}{{ scope.row.blCoin / 100 }}</span
            >
          </template>
        </el-table-column>
        <!-- <el-table-column prop="blNow" label="操作后金额" /> -->

        <el-table-column prop="blTime" label="时间" />
        <!-- <el-table-column prop="blRemark" label="备注" /> -->
      </el-table>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="page.page"
          :page-size="page.size"
          layout="prev, pager, next, jumper"
          :total="page.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </div>

    <el-empty v-else description="暂无数据"></el-empty>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 关闭 </el-button>
    </div>
  </div>
</template>

<script>
import { merchantBalanceLogList } from "@/api/merchant.js";

export default {
  name: "BalanceLogList",
  props: {
    value: Object,
  },
  data() {
    return {
      list: [],
      page: {
        page: 0,
        size: 10,
        total: 0,
      },
    };
  },
  mounted() {
    this.getBalanceLogList();
  },
  methods: {
    getBalanceLogList() {
      const { page } = this;
      merchantBalanceLogList({
        mcId: this.value.mcId,
        page: page.page,
        size: page.size,
      })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data;
            this.page.total = res.total;
          }
        })
        .catch((err) => {
          return this.$message.error(err.message);
        });
    },
    onCancel() {
      this.$drawer.close();
    },
    onPageChange() {
      this.getBalanceLogList();
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
