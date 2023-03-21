<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form
        v-loading="loading"
        :inline="true"
        :model="form"
        class="demo-form-inline flex"
      >
        <!-- <el-form-item label="结算状态">
          <el-select
            v-model="taskPayFilter.tpStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="待审核" :value="1"> </el-option>
            <el-option label="待支付" :value="2"> </el-option>
            <el-option label="审核不通过" :value="3"> </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="选择日期" prop="tsStart">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="taskPayFilter.tpStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span class="mx10">-</span>
          <el-date-picker
            type="date"
            placeholder="截止日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            v-model="taskPayFilter.tpEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <div class="flex item-center">
        <el-radio-group
          v-model="taskPayFilter.tpStatus"
          style="margin-bottom: 30px"
          @input="onSelect"
        >
          <el-radio-button :label="1">订单提交成功</el-radio-button>
          <el-radio-button :label="2">支付成功，已完结</el-radio-button>
          <el-radio-button :label="3">支付成功，更新状态失败</el-radio-button>
          <el-radio-button :label="4">发生退款</el-radio-button>
          <el-radio-button :label="5">退款，更新状态失败</el-radio-button>
          <el-radio-button :label="5">结算失败</el-radio-button>
        </el-radio-group>
      </div>

      <!-- <div>
        <el-button v-permission="'exportTaskSettleDetail'" @click="onExport"
          >导出结算明细
        </el-button>
      </div> -->
      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="taskPayList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column prop="tpId" label="ID" />
          <el-table-column prop="mcId" label="商户id" />
          <el-table-column prop="tpNo" label="批次号" />
          <el-table-column prop="tpOrder" label="结算单号" />
          <el-table-column prop="tpTotal" label="结算金额">
            <template slot-scope="scope">
              {{ formatFloatNo(scope.row.tpTotal / 100) }}
            </template>
          </el-table-column>
          <el-table-column prop="tpTime" label="时间" />
          <el-table-column prop="tpStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.tpStatus] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="flex item-center">
        <div class="text-right bg-600 p12">
          <el-pagination
            :current-page.sync="taskPayPage.page"
            :page-size="taskPayPage.size"
            layout="prev, pager, next, jumper"
            :total="taskPayPage.total"
            background
            @current-change="onPageChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ExportSettle from "./components/ExportSettle.vue";
import SettleDetail from "./components/SettleDetail.vue";
import { formatFloatNo } from "@/utils/index.js";
let that;
const statusData = [
  "",
  "订单提交成功",
  "支付成功，已完结",
  "支付成功，更新结算状态失败",
  "发生退款",
  "发生退款，更新结算状态失败",
  "结算失败",
];
export default {
  data() {
    return {
      formatFloatNo,
      form: {},
      detail: {},
      statusData,
      loading: false,
      fullscreenLoading: false,
      tableData: [],
      tableHeader: [],
      multipleSelection: [],
    };
  },
  computed: {
    //
    ...mapGetters(["taskPayList", "taskPayPage", "taskPayFilter"]),
  },
  mounted() {
    this.getTaskPayList();
    that = this;
    // this.getDetail();
  },
  methods: {
    // 获取列表数据
    getTaskPayList() {
      this.loading = true;

      this.$store
        .dispatch("task/getTaskPayList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskPayPage", val).then(() => {
        this.getTaskPayList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getTaskPayList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getTaskPayList();
    },
    // 查看明细
    onSettleDetail(item) {
      this.$drawer.open({
        title: "结算明细",
        width: "70%",
        component: SettleDetail,
        value: { tsNo: item.tsNo },
        callback: (res) => {
          this.getTaskPayList();
        },
      });
    },
    // 导出数据
    onExport() {
      this.$modal.open({
        title: "导出结算明细",
        width: "50%",
        component: ExportSettle,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
