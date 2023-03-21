<template>
  <div class="app-container">
    <el-card><el-button @click="onBack">返回</el-button></el-card>
    <div class="p16 bg-600">
      <el-tabs v-model="mode" type="card" @tab-click="onMode">
        <el-tab-pane label="支付数据" name="pay"></el-tab-pane>
        <el-tab-pane label="开票数据" name="invoice"></el-tab-pane>
      </el-tabs>

      <div class="money">
        <count-to
          :start-val="0"
          :end-val="total"
          :duration="3000"
          :decimals="2"
          separator=","
          prefix="¥"
          autoplay
        />
      </div>

      <!-- 筛选表单 -->
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
            v-model="form.tpStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span class="mx10">-</span>
          <el-date-picker
            type="date"
            placeholder="截止日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            v-model="form.tpEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="flex item-center">
        <el-radio-group
          v-model="form.tpDate"
          style="margin-bottom: 30px"
          @input="onDateSelect"
        >
          <el-radio-button :label="1">今日</el-radio-button>
          <el-radio-button :label="2">本周</el-radio-button>
          <el-radio-button :label="3">本月</el-radio-button>
          <el-radio-button :label="4">今年</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column type="selection" width="55" /> -->
          <template v-if="mode == 'pay'">
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
          </template>

          <template v-else>
            <el-table-column prop="miId" label="ID" />
            <el-table-column prop="mcId" label="商户id" />
            <el-table-column prop="mcName" label="商户名称" />
            <el-table-column prop="miCoin" label="开票金额">
              <template slot-scope="scope">
                {{ formatFloatNo(scope.row.miCoin / 100) }}
              </template>
            </el-table-column>
            <el-table-column prop="miTime" label="时间" />
            <el-table-column prop="miType" label="类型" />
          </template>
        </el-table>
      </div>

      <div class="flex item-center">
        <div class="text-right bg-600 p12">
          <el-pagination
            :current-page.sync="filter.page"
            :page-size="filter.size"
            layout="prev, pager, next, jumper"
            :total="filter.total"
            background
            @current-change="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import SettleDetail from "./components/SettleDetail.vue";

import countTo from "vue-count-to";
import { channelPay, channelInvoice } from "@/api/channel.js";
import {
  getDate,
  getMonday,
  getMonth,
  getYear,
  formatFloatNo,
} from "@/utils/index.js";

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
  components: { countTo },
  data() {
    return {
      formatFloatNo,
      loading: false,
      statusData,
      form: {
        tpStart: "",
        tpEnd: "",
        tpStatus: 2,
        tpDate: 1,
      },
      filter: {
        page: 0,
        size: 20,
        total: 0,
      },
      total: 0,
      mode: "pay",
      list: [],
    };
  },
  computed: {
    //
    ...mapGetters(["taskPayList", "taskPayPage", "taskPayFilter"]),
  },
  async mounted() {
    this.mcId = this.$route.query.id;

    await this.onDateSelect(); // 默认今天
    this.getMerchantDetail();
    // this.getDetail();
  },
  methods: {
    // 获取商户支付数据,默认今天
    getMerchantDetail() {
      if (this.mcId) {
        let params = {};
        this.loading = true;

        params.mcId = this.mcId;
        params.tpStart = this.form.tpStart;
        params.tpEnd = this.form.tpEnd;
        params.tpStatus = +this.form.tpStatus;

        channelPay({
          mcId: params.mcId,
          tpStart: params.tpStart,
          tpEnd: params.tpEnd,
          tpStatus: params.tpStatus,
        })
          .then((res) => {
            if (res.code == 200) {
              if (res.data.length > 0) {
                this.list = res.data;
                let total = res.data
                  .map((item) => {
                    return item.tpTotal;
                  })
                  .reduce((x, y) => x + y);
                this.total = formatFloatNo(total / 100);
                this.filter.total = res.total;
              } else {
                this.list = [];
                this.total = 0;
                this.filter.total = 0;
              }
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
    // 获取开票数据
    getInvoiceDetail() {
      if (this.mcId) {
        let params = {};
        this.loading = true;

        params.mcId = this.mcId;
        params.miStart = this.form.tpStart;
        params.miEnd = this.form.tpEnd;
        params.miStatus = +this.form.tpStatus;

        channelInvoice({
          mcId: params.mcId,
          miStart: params.miStart,
          miEnd: params.miEnd,
          miStatus: params.miStatus,
        })
          .then((res) => {
            if (res.code == 200) {
              if (res.data.length > 0) {
                this.list = res.data;

                let total = res.data
                  .map((item) => {
                    return item.miCoin;
                  })
                  .reduce((x, y) => x + y);
                this.total = formatFloatNo(total / 100);
                this.filter.total = res.total;
              } else {
                this.list = [];
                this.total = 0;
                this.filter.total = 0;
              }
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
    // 刷新页面
    onRefresh() {
      if (this.mode == "pay") {
        this.getMerchantDetail();
      } else {
        this.getInvoiceDetail();
      }
    },
    // 切换模式
    onMode(tab, event) {
      // console.log(tab, event);
      this.onRefresh();
      // 重置日期
      this.form.tpDate = 1;
      this.onDateSelect();
      this.mode = tab.name;
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskPayPage", val).then(() => {
        this.getTaskPayList();
      });
    },
    // 时间筛选
    onDateSelect() {
      if (this.form.tpDate == 1) {
        this.form.tpStart = getDate(0); //今天
        this.form.tpEnd = getDate(1); // 明天
      } else if (this.form.tpDate == 2) {
        this.form.tpStart = getMonday("s"); //本周一
        this.form.tpEnd = getMonday("s", 1); // 下周一
      } else if (this.form.tpDate == 3) {
        this.form.tpStart = getMonth("s", 0); //本周一
        this.form.tpEnd = getMonth("s", 1); // 下周一
      } else if (this.form.tpDate == 4) {
        this.form.tpStart = getYear("s"); //本周一
        this.form.tpEnd = getYear("s", 1); // 下周一
      } else {
        this.form.tpStart = getDate(0); //今天
        this.form.tpEnd = getDate(1); // 明天
      }
      // console.log(this.form);
      this.onRefresh();
    },
    // 查询数据
    onSearch() {
      this.onRefresh();
    },
    onBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.money {
  font-size: 40px;
  // color: #f6416c;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}
</style>
