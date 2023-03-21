<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form :inline="true" :model="form" class="flex">
        <el-form-item label="交易流水号">
          <div class="flex">
            <el-input
              v-model="rechargeFilter.mrNo"
              placeholder="请输入交易流水号"
            />
          </div>
        </el-form-item>
        <el-form-item label="商户号">
          <div class="flex">
            <el-input
              v-model="rechargeFilter.mcId"
              placeholder="请输入商户号"
            />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="rechargeFilter.mrStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="全部" value="" />
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="9" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选表单 -->
    <el-card class="mt20" shadow="hover">
      <!-- <div class="flex just-between item-center">
        <div class="flex-1">
          <el-button type="primary" @click="onInvoice()">
            <i class="el-icon-plus" />批量申请开票
          </el-button>
        </div>
      </div> -->

      <!-- 列表数据 -->
      <div class="form-list mt10">
        <el-table
          ref="multipleTable"
          :data="rechargeList"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="mrId" label="编号" />
          <el-table-column prop="mcId" label="商户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.mrMerchant.mcName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mrNo" label="交易流水号" />
          <el-table-column prop="mrCoin" label="交易金额">
            <template slot-scope="scope">
              {{ formatFloat(scope.row.mrCoin / 100) }}
            </template>
          </el-table-column>

          <el-table-column prop="mrTime" label="交易时间" />
          <el-table-column prop="smName" label="管理员" />

          <!-- <el-table-column prop="mrStatus" label="交易状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.mrStatus] }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="flex item-center" v-permission="'invoiceMerchant'">
                <span
                  class="flex-1 pointer f14 text-center"
                  @click="onInvoice(scope.row)"
                >
                  <i class="el-icon-tickets" /> 申请开票
                </span>
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="rechargePage.page"
          :page-size="rechargePage.size"
          layout="prev, pager, next, jumper"
          :total="rechargePage.total"
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
import InvoiceDrawer from "./components/InvoiceDrawer.vue";

import { formatFloat } from "@/utils/index.js";
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
      statusData: ["", "待开票", "已申请", "被驳回"],
      multipleSelection: [],
    };
  },
  computed: {
    ...mapGetters(["rechargeList", "rechargePage", "rechargeFilter"]),
  },
  mounted() {
    this.getRechargeList();
  },
  methods: {
    // 获取列表
    getRechargeList() {
      this.$store.dispatch("merchant/getRechargeList", {});
    },
    // 页数改变
    onPageChange(val) {
      // console.log(`当前页: ${val}`);
      this.$store.dispatch("merchant/editRechargePage", val).then(() => {
        this.getRechargeList();
      });
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getRechargeList();
    }, // 查询数据
    onSelect() {
      this.getRechargeList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 开票申请
    onInvoice(item) {
      let params = {};
      if (item) {
        if (item.mrStatus != 1) {
          return this.$message.error(
            "已申请开票的记录，无法再次申请，请取消该项"
          );
        }
        params = item;

        params.miCoin = item.mrCoin;
      } else {
        if (this.multipleSelection.length <= 0) {
          return this.$message.error("请先选择要开票的记录，再点击批量申请");
        }
        //
        if (
          this.multipleSelection.findIndex((item) => item.mrStatus != 1) > -1
        ) {
          return this.$message.error(
            "已申请开票的记录，无法再次申请，请取消该项"
          );
        }

        // 选中后点击申请开票
        if (this.multipleSelection.length > 0) {
          let mrIds = [];
          let miCoin = 0;
          this.multipleSelection.map((item) => {
            mrIds.push(item.mrId);
            miCoin += item.mrCoin + miCoin;
          });

          params.mrId = mrIds.length > 0 ? mrIds.join(",") : params.mrId;
          params.miCoin = miCoin;
        } else {
          this.$message.error("请先选中后才能申请开票");
        }
      }
      console.log(params);
      this.$drawer.open({
        width: "60%",
        title: "申请开票",
        component: InvoiceDrawer,
        value: params,
        callback: (res) => {
          this.getRechargeList();
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
