<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <!-- <el-card shadow="hover">
      <el-form
        v-loading="loading"
        :inline="true"
        :model="form"
        class="demo-form-inline flex"
      >
        <el-form-item label="结算状态">
          <el-select
            v-model="taskSettleFilter.tsStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="待审核" :value="1"> </el-option>
            <el-option label="待支付" :value="2"> </el-option>
            <el-option label="审核不通过" :value="3"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card> -->

    <el-card class="mt20" shadow="hover">
      <div>
        <el-radio-group
          v-model="taskSettleFilter.tsStatus"
          style="margin-bottom: 30px"
          @input="onSelect"
        >
          <el-radio-button :label="1">待审核</el-radio-button>
          <el-radio-button :label="2">待支付</el-radio-button>
          <el-radio-button :label="6">已支付</el-radio-button>
          <el-radio-button :label="3">审核不通过</el-radio-button>
          <el-radio-button :label="5">BIN失败</el-radio-button>
          <el-radio-button :label="7">直接扣款</el-radio-button>
          <el-radio-button :label="8">退款</el-radio-button>
          <el-radio-button :label="11">支付完成</el-radio-button>
          <el-radio-button :label="12">退款完成</el-radio-button>
        </el-radio-group>
      </div>

      <div class="flex just-between item-center">
        <div class="flex-1">
          <el-button type="primary" @click="onArrInvoice()">
            <i class="el-icon-plus" />批量申请开票
          </el-button>
        </div>
        <!-- <div>
          <el-button @click="onTest">测试</el-button>
        </div> -->
      </div>

      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="taskSettleList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <el-table-column type="selection" width="55" />
          <el-table-column prop="tsNo" label="批次号" />
          <!-- <el-table-column prop="tsIds" label="结算单号" /> -->
          <el-table-column prop="mcId" label="商户名称">
            <!-- @click="onDetail(scope.row)" -->
            <!-- pointer text-primary -->
            <template slot-scope="scope">
              <span class="flex-1 f14 text-center">
                {{ scope.row.mcName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="tsCoin" label="发放金额">
            <template slot-scope="scope">
              {{ formatFloatNo(scope.row.tsCoin / 100) }}
            </template>
          </el-table-column>
          <el-table-column prop="tsRate" label="服务费">
            <template slot-scope="scope">
              {{ formatFloatNo(scope.row.tsRate / 100) }}
            </template>
          </el-table-column>
          <el-table-column prop="tsTotal" label="结算金额">
            <template slot-scope="scope">
              {{ formatFloatNo(scope.row.tsTotal / 100) }}
            </template>
          </el-table-column>
          <el-table-column prop="tsOrder" label="结算订单" />
          <el-table-column prop="tsStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.tsStatus] }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover trigger="click">
                <span class="pointer" slot="reference">
                  <i class="el-icon-setting"></i> 操作
                </span>
                <div class="flex flex-col" v-show="scope.row.tsStatus == 1">
                  <div
                    v-permission="'AdjustTaskSettleList'"
                    class="pointer f14 py10 border-bottom"
                    @click="onAdjust(scope.row)"
                  >
                    <i class="el-icon-document-checked mr8"></i>审核
                  </div>
                  <div
                    class="pointer f14 py10 border-bottom"
                    @click="onSettleDetail(scope.row)"
                  >
                    <i class="el-icon-document mr8"></i>查看明细
                  </div>
                </div>

                <div v-show="scope.row.tsStatus == 2">
                  <div
                    class="pointer f14 py10 border-bottom text-primary"
                    v-permission="'PayTaskSettleList'"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="onPay(scope.row)"
                  >
                    <i class="el-icon-bank-card mr8"></i>薪福通扣款
                  </div>
                  <div
                    class="pointer f14 py10 border-bottom"
                    v-permission="'AdminPayTaskSettleList'"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="onAdminPay(scope.row)"
                  >
                    <i class="el-icon-wallet mr8"></i>直接扣款
                  </div>
                </div>

                <!-- 已取消此功能 -->
                <!-- <div v-show="scope.row.tsStatus < 7 && scope.row.tsStatus > 1">
                  <div
                    class="pointer f14 py10 border-bottom"
                    v-permission="'AdminPayTaskSettleByOrder'"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="onOrderPay(scope.row)"
                  >
                    <i class="el-icon-money mr8"></i> 单号扣款
                  </div>
                </div> -->

                <div
                  class="pointer f14 py10 border-bottom text-red"
                  @click="onDelete(scope.row)"
                  v-show="scope.row.tsStatus < 5 && scope.row.tsStatus >= 1"
                >
                  <i class="el-icon-delete mr8"></i> 删除
                </div>

                <div
                  v-show="scope.row.tsStatus == 11 || scope.row.tsStatus == 7"
                >
                  <div
                    class="pointer f14 py10 border-bottom"
                    v-permission="'merchantApplyInvoice'"
                    @click="onInvoice(scope.row)"
                  >
                    <i class="el-icon-tickets mr8"></i> 开票
                  </div>
                  <div
                    class="pointer f14 py10 border-bottom"
                    v-permission="'AdminChangeMerchantBalance'"
                    @click="onChange(scope.row)"
                  >
                    <i class="el-icon-tickets mr8"></i> 管理对账
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="flex item-center">
        <div class="text-right bg-600 p12">
          <el-pagination
            :current-page.sync="taskSettlePage.page"
            :page-size="taskSettlePage.size"
            layout="prev, pager, next, jumper"
            :total="taskSettlePage.total"
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
import SettleModal from "./components/SettleModal.vue";
import SettleOrder from "./components/SettleOrder.vue";
import InvoiceDrawer from "./components/InvoiceDrawer.vue";
import AdjustBalance from "./components/AdjustBalance.vue";
import { taskPay, taskSettleCostCoin, taskSettleDel } from "@/api/task.js";
import { systemCallback } from "@/api/system.js";
import SettleDetail from "./components/SettleDetail.vue";
import { throttle, formatFloatNo } from "@/utils/index.js";

const statusData = [
  "",
  "待客服审核",
  "审核通过，等待支付",
  "审核不通过",
  "已禁止",
  "bin解析失败",
  "支付完成,等待银行返回",
  "管理员直接扣款",
  "退款，等待管理员处理",
  "支付成功，扣款失败",
  "退款失败",
  "支付成功，已完成",
  "退款成功，已完成",
];
let that;
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
    ...mapGetters(["taskSettleList", "taskSettlePage", "taskSettleFilter"]),
  },
  mounted() {
    this.getTaskSettleList();
    that = this;
    // this.getDetail();
  },
  methods: {
    // 获取列表数据
    getTaskSettleList() {
      this.loading = true;

      this.$store
        .dispatch("task/getTaskSettleList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskSettlePage", val).then(() => {
        this.getTaskSettleList();
      });
    },
    // 菜单被点击
    handleCommand(comand) {
      console.log(comand);
    },
    // 状态筛选
    onSelect() {
      this.getTaskSettleList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getTaskSettleList();
    },
    // 商户详情
    onDetail(item) {
      if (item.mcId) {
        this.$router.push({ name: "merchantDetail", query: { id: item.mcId } });
      }
    },
    // 查看明细
    onSettleDetail(item) {
      this.$drawer.open({
        title: "结算明细",
        width: "70%",
        component: SettleDetail,
        value: { tsNo: item.tsNo },
        callback: (res) => {
          this.getTaskSettleList();
        },
      });
    },
    // 支付
    onPay: throttle((item) => {
      that.fullscreenLoading = true;
      // this.$message.info("等待开发");
      if (item.tsStatus != 2) {
        return that.$message.info("状态出错");
      }
      taskPay({
        tsNo: item.tsNo, // 批次号
        mcId: item.mcId, // 商户号
      })
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            window.open(res.data.url);

            // 有失败记录
            let len = res.data.fails.length;
            if (len > 0) {
              that.$message.error(`失败${len}条记录`);
            }
          }
        })
        .finally(() => {
          that.fullscreenLoading = false;
        });
    }, 500),
    // 支付宝付款
    onAdminPay: throttle((item) => {
      that.fullscreenLoading = true;
      // this.$message.info("等待开发");
      if (item.tsStatus != 2) {
        return that.$message.info("状态出错");
      }
      taskSettleCostCoin({
        tsNo: item.tsNo, // 批次号
      })
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            that.$message.info("扣款成功");
            that.getTaskSettleList();
          }
        })
        .catch((err) => {
          return that.$message.error("扣款失败", err.message);
        })
        .finally(() => {
          that.fullscreenLoading = false;
        });
    }, 500),
    // 全选
    toggleSelection(flag) {
      if (flag) {
        this.value.form.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
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
          mcCoin: item.tsCoin / 100,
        },
        callback: (res) => {
          this.getBalanceList();
        },
      });
    },
    // 审核任务
    onAdjust(item) {
      this.$modal.open({
        title: "审核申请",
        component: SettleModal,
        maskClosable: false,
        value: item,
        callback: (res) => {
          this.getTaskSettleList();
        },
      });
    },
    // 根据单号付款
    onOrderPay(item) {
      this.$modal.open({
        title: "填写单号",
        component: SettleOrder,
        maskClosable: false,
        value: item,
        callback: (res) => {
          this.getTaskSettleList();
        },
      });
    },
    // 开票申请
    onInvoice(item) {
      let params = {};
      // if (this.multipleSelection.length <= 0) {
      //   return this.$message.error("请先选择要开票的记录，再点击批量申请");
      // }
      //
      // if (this.multipleSelection.findIndex((item) => item.mrStatus != 1) > -1) {
      //   return this.$message.error(
      //     "已申请开票的记录，无法再次申请，请取消该项"
      //   );
      // }

      // 选中后点击申请开票
      // if (this.multipleSelection.length > 0) {
      //   let mrIds = [];
      //   let miCoin = 0;
      //   this.multipleSelection.map((item) => {
      //     mrIds.push(item.mrId);
      //     miCoin += item.mrCoin + miCoin;
      //   });

      //   params.mrId = mrIds.length > 0 ? mrIds.join(",") : params.mrId;
      //   params.miCoin = miCoin;
      // } else {
      //   this.$message.error("请先选中后才能申请开票");
      // }
      if (item) {
        // 单选
        params.mrId = item.tsIds;
        params.miCoin = item.tsTotal;
      }

      if (item.tsInvoice) {
        return this.$message.error("该记录已经开过票了，无法操作");
      }

      // console.log(params);
      this.$drawer.open({
        width: "60%",
        title: "申请开票",
        component: InvoiceDrawer,
        value: params,
        callback: (res) => {
          this.getTaskSettleList();
        },
      });
    },

    // 开票申请
    onArrInvoice() {
      let params = {};
      if (this.multipleSelection.length <= 0) {
        return this.$message.error("请先选择要开票的记录，再点击批量申请");
      }

      if (
        this.multipleSelection.findIndex((item) => item.tsInvoice != 0) > -1
      ) {
        return this.$message.error(
          "已申请开票的记录，无法再次申请，请取消该项"
        );
      }

      //选中后点击申请开票
      if (this.multipleSelection.length > 0) {
        let mrIds = [];
        let miCoin = 0;
        this.multipleSelection.map((item) => {
          mrIds.push(item.trIds);
          miCoin = formatFloatNo(item.tsTotal + miCoin);
        });

        params.mrId = mrIds.length > 0 ? mrIds.join(",") : params.mrId;
        params.miCoin = miCoin;
      } else {
        this.$message.error("请先选中后才能申请开票");
      }

      // console.log(params);
      this.$drawer.open({
        width: "60%",
        title: "申请开票",
        component: InvoiceDrawer,
        value: params,
        callback: (res) => {
          this.getTaskSettleList();
        },
      });
    },
    // 删除申请
    onDelete(item) {
      if (!item.tsNo) {
        return this.$message.error("批次号不存在");
      }
      this.$confirm("删除后，数据将无法恢复，是否确认删除？")
        .then((_) => {
          taskSettleDel({
            tsNo: item.tsNo,
          }).then((res) => {
            this.$message.info("删除成功");
            this.getTaskSettleList();
          });
          done();
        })
        .catch((_) => {});
    },
    //测试
    // onCallBack() {
    //   systemCallback().then((res) => {
    //     console.log(res);
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555;
  line-height: 18px;
  padding: 6px 15px;
  border-radius: 2px;
  cursor: pointer;
  &.cur {
    background: #ffe300;
    color: #212121;
    font-weight: 700;
  }
}
.footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  color: #212121;
}
.el-dialog__body {
  padding: 0 !important;
}
</style>
