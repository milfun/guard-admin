<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form :inline="true" :model="form" class="flex">
        <el-form-item label="商户号">
          <div class="flex">
            <el-input v-model="balanceFilter.mcId" placeholder="请输入商户号" />
          </div>
        </el-form-item>
        <el-form-item label="商户名称">
          <div class="flex">
            <el-input
              v-model="balanceFilter.mcName"
              placeholder="请输入商户名称"
            />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="balanceFilter.mbStatus"
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
          <el-button type="primary" @click="onbalance()">
            <i class="el-icon-plus" />预开票
          </el-button>
        </div>
      </div> -->

      <!-- 列表数据 -->
      <div class="form-list mt10">
        <el-table
          ref="multipleTable"
          :data="balanceList"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="mbId" label="账户" />
          <el-table-column prop="mcId" label="商户Id" />
          <el-table-column prop="mcName" label="商户名称">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onDetail(scope.row.mcId)"
              >
                {{ scope.row.mcName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="mbTotal" label="余额">
            <template slot-scope="scope">
              {{ formatFloat(scope.row.mbTotal / 100) }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="mbBank" label="银行" /> -->
          <!-- <el-table-column prop="mbNo" label="账号" /> -->
          <el-table-column prop="mbStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.mbStatus].text }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="flex item-center">
                <span
                  class="flex-1 pointer f14 text-center"
                  @click="onLogList(scope.row)"
                >
                  <i class="el-icon-tickets" /> 查看流水
                </span>
                <el-divider direction="vertical" class="mx10" />
                <span
                  v-permission="'AdminChangeMerchantBalance'"
                  class="flex-1 pointer f14 text-center"
                  @click="onChange(scope.row)"
                >
                  <i class="el-icon-tickets" /> 管理对账
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="balancePage.page"
          :page-size="balancePage.size"
          layout="prev, pager, next, jumper"
          :total="balancePage.total"
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
import BalanceLogList from "./components/BalanceLogList.vue";
import AdjustBalance from "./components/AdjustBalance.vue";

import { formatFloat } from "@/utils/index.js";
const statusData = [
  { text: "全部", color: "", type: "", value: "" },
  { text: "正常", color: "text-green", type: "", value: 1 },
  { text: "封禁", color: "text-red", type: "", value: 2 },
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
    ...mapGetters(["balanceList", "balancePage", "balanceFilter"]),
  },
  mounted() {
    this.getBalanceList();
  },
  methods: {
    // 获取列表
    getBalanceList() {
      this.$store.dispatch("merchant/getBalanceList", {});
    },
    // 页数改变
    onPageChange(val) {
      // console.log(`当前页: ${val}`);
      this.$store.dispatch("merchant/editBalancePage", val).then(() => {
        this.getBalanceList();
      });
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getBalanceList();
    }, // 查询数据
    onSelect() {
      this.getBalanceList();
    },
    // 跳转详情页
    onDetail(mcId) {
      this.$router.push({ name: "merchantDetail", query: { id: mcId } });
    },
    onLogList(item) {
      this.$drawer.open({
        width: "60%",
        title: "流水列表",
        component: BalanceLogList,
        value: item,
        callback: (res) => {
          this.getBalanceList();
        },
      });
    },
    // 对账
    onChange(item) {
      this.$modal.open({
        width: "60%",
        title: "管理对账",
        component: AdjustBalance,
        value: {
          mcId: item.mcId,
          mcName: "",
          mcType: 2,
          mcCoin: item.mbTotal / 100,
        },
        callback: (res) => {
          this.getBalanceList();
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
