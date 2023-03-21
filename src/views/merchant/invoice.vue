<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form :inline="true" :model="form" class="flex">
        <el-form-item label="商户号">
          <div class="flex">
            <el-input v-model="invoiceFilter.mcId" placeholder="请输入商户号" />
          </div>
        </el-form-item>
        <el-form-item label="商户名称">
          <div class="flex">
            <el-input
              v-model="invoiceFilter.mcName"
              placeholder="请输入商户名称"
            />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="invoiceFilter.miStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option
              v-for="(item, index) in statusData"
              :key="index"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选表单 -->
    <el-card class="mt20" shadow="hover">
      <!-- <div class="flex just-between item-center">
        <div class="flex-1">
          <el-button type="primary" @click="onInvoice()">
            <i class="el-icon-plus" />预开票
          </el-button>
        </div>
      </div> -->

      <!-- 列表数据 -->
      <div class="form-list mt10">
        <el-table
          ref="multipleTable"
          :data="invoiceList"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="miId" label="ID" />
          <el-table-column prop="mrId" label="编号" />
          <el-table-column prop="mcId" label="商户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.mcName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="miPaper" label="发票类型">
            <template slot-scope="scope">
              <span>{{ ["", "纸质发票", "电子发票"][scope.row.miPaper] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="miCoin" label="开票金额">
            <template slot-scope="scope">
              {{ formatFloat(scope.row.miCoin / 100) }}
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column prop="miType" label="开票项目" />
          <el-table-column prop="miTime" label="时间" />
          <el-table-column prop="miStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.miStatus].text }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="miStatus" label="原因">
            <template slot-scope="scope">
              <span v-show="scope.row.miStatus == 2">{{
                scope.row.miReason
              }}</span>
              <span v-show="scope.row.miStatus == 6">{{
                scope.row.miReadjust
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="flex item-center" v-permission="'invoiceAdjust'">
                <span
                  class="flex-1 pointer f14 text-center"
                  @click="onAdjust(scope.row)"
                >
                  <i class="el-icon-tickets" /> 审核
                </span>
                <el-divider direction="vertical" class="mx10" />
                <span
                  class="flex-1 pointer f14 text-center"
                  @click="onEdit(scope.row)"
                  ><i class="el-icon-tickets" /> 编辑
                </span>
              </div>

              <div v-permission="'merchantInvoiceOpterate'">
                <span
                  v-show="scope.row.miStatus == 4"
                  class="flex-1 pointer f14 text-center"
                  @click="onReAdjust(scope.row)"
                >
                  <i class="el-icon-tickets" /> 复核
                </span>

                <span
                  v-show="[7, 8].includes(scope.row.miStatus)"
                  class="flex-1 pointer f14 text-center"
                  @click="onPost(scope.row)"
                >
                  <i class="el-icon-tickets" /> 查看快递
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="invoicePage.page"
          :page-size="invoicePage.size"
          layout="prev, pager, next, jumper"
          :total="invoicePage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>

    <!-- 弹窗 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdjustInvoice from "./components/AdjustInvoice.vue";
import EditInvoice from "./components/EditInvoice.vue";
import ReAdjustInvoice from "./components/ReAdjustInvoice.vue";
import InvoicePostModal from "./components/InvoicePostModal.vue";

import {  formatFloat } from "@/utils/index.js";
const statusData = [
  { text: "全部", color: "text-green", type: "", value: "" },
  { text: "待审核", color: "text-yellow", type: "", value: 1 },
  { text: "被驳回", color: "text-red", type: "", value: 2 },
  { text: "开票中", color: "text-green", type: "", value: 3 },
  { text: "复核中", color: "text-orange", type: "", value: 4 },
  { text: "复核通过", color: "text-blue", type: "", value: 5 },
  { text: "复核驳回", color: "text-cyan", type: "", value: 6 },
  { text: "发票寄出", color: "text-primary", type: "", value: 7 },
  { text: "已结束", color: "text-300", type: "", value: 8 },
];

export default {
  components: {
    // AddCertificateModal,
  },
  data() {
    return {
      formatFloat,
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isAdmin: "0",
      },
      statusData: statusData,
      multipleSelection: [],
    };
  },
  computed: {
    ...mapGetters(["invoiceList", "invoicePage", "invoiceFilter"]),
  },
  mounted() {
    this.getInvoiceList();
  },
  methods: {
    // 获取列表
    getInvoiceList() {
      this.$store.dispatch("merchant/getInvoiceList", {});
    },
    // 页数改变
    onPageChange(val) {
      // console.log(`当前页: ${val}`);
      this.$store.dispatch("merchant/editInvoicePage", val).then(() => {
        this.getInvoiceList();
      });
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getInvoiceList();
    }, // 查询数据
    onSelect() {
      this.getInvoiceList();
    },
    onAdjust(item) {
      this.$modal.open({
        width: "500px",
        title: "审核结果",
        component: AdjustInvoice,
        value: item,
        callback: (res) => {
          this.getInvoiceList();
        },
      });
    },
    // 商家复核
    onReAdjust(item) {
      this.$modal.open({
        width: "500px",
        title: "商家复核",
        component: ReAdjustInvoice,
        value: item,
        callback: (res) => {
          this.getInvoiceList();
        },
      });
    },
    // 查看快递
    onPost(item) {
      this.$modal.open({
        width: "500px",
        title: "查看快递",
        component: InvoicePostModal,
        value: item,
        callback: (res) => {
          this.getInvoiceList();
        },
      });
    },
    onEdit(item) {
      item.miCoin = formatFloat(item.miCoin / 100)
      this.$drawer.open({
        width: "600px",
        title: "编辑开票",
        component: EditInvoice,
        value: item,
        callback: (res) => {
          this.getInvoiceList();
        },
      });
    },
  },
};
</script>

<style scoped>
.form-list {
  text-align: center;
}
.footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  color: #212121;
}
</style>
