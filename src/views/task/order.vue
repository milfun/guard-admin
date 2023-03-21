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
            v-model="taskSettleFilter.tsStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="待审核" :value="1"> </el-option>
            <el-option label="待支付" :value="2"> </el-option>
            <el-option label="审核不通过" :value="3"> </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="批次号">
          <div class="flex">
            <el-input
              v-model="taskSettleAllFilter.tsNo"
              placeholder="请输入批次号"
            />
          </div>
        </el-form-item>
        <el-form-item label="子批次号">
          <div class="flex">
            <el-input
              v-model="taskSettleAllFilter.tsCno"
              placeholder="请输入任务名称"
            />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <div class="flex item-center">
        <el-radio-group
          v-model="taskSettleAllFilter.tsStatus"
          style="margin-bottom: 30px"
          @input="onSelect"
        >
          <el-radio-button :label="1">待审核</el-radio-button>
          <el-radio-button :label="2">待支付</el-radio-button>
          <el-radio-button :label="6">已支付</el-radio-button>
          <el-radio-button :label="3">审核不通过</el-radio-button>
          <el-radio-button :label="5">BIN失败</el-radio-button>
          <el-radio-button :label="7">直接扣款</el-radio-button>
          <el-radio-button :label="8">待退款</el-radio-button>
          <el-radio-button :label="11">支付完成</el-radio-button>
          <el-radio-button :label="12">退款完成</el-radio-button>
        </el-radio-group>
      </div>

      <div>
        <el-button v-permission="'exportTaskSettleDetail'" @click="onExport"
          >导出结算明细
        </el-button>
      </div>
      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="taskSettleAllList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column prop="tsNo" label="批次号" />
          <el-table-column prop="tsCno" label="子批次号" />
          <!-- <el-table-column prop="tsOrder" label="结算单号" /> -->
          <el-table-column prop="mcId" label="商户名称">
            <template slot-scope="scope">
              <span class="flex-1 f14 text-center">
                {{ scope.row.mcName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="mmId" label="姓名">
            <template slot-scope="scope">
              <span class="flex-1 f14 text-center">
                {{ scope.row.mmName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="mmCard" label="证件号" />
          <el-table-column prop="mmMember" label="签约状态">
            <template slot-scope="scope">
              <span class="text-green" v-if="scope.row.mmMember.mmStep == 99"
                >已完成</span
              >
              <span v-else>{{ stepData[scope.row.mmMember.mmStep] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mmMobile" label="手机号" />
          <el-table-column prop="mmBank" label="收款号" />
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
          <el-table-column prop="tsStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.tsStatus] }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <span
                v-permission="'AdminDeleteTaskSettle'"
                class="pointer f14"
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="onDelete(scope.row)"
              >
                <i class="el-icon-tickets" /> 删除
              </span>

              <span v-show="scope.row.tsStatus == 8">
                <span
                  v-permission="'AdminQuitTaskSettle'"
                  class="pointer f14"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  @click="onQuit(scope.row)"
                >
                  <i class="el-icon-tickets" /> 退款
                </span>
              </span>

              <span v-show="scope.row.tsStatus >= 6">
                <span
                  class="pointer f14 mx10"
                  v-permission="'AdminSeeOrderDesc'"
                  @click="onXftDesc(scope.row)"
                >
                  <i class="el-icon-tickets" /> 概要
                </span>

                <span
                  class="pointer f14 mx10"
                  v-permission="'AdminSeeOrderDetail'"
                  @click="onXftDetail(scope.row)"
                >
                  <i class="el-icon-tickets" /> 明细
                </span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="flex item-center">
        <div class="text-right bg-600 p12">
          <el-pagination
            :current-page.sync="taskSettleAllPage.page"
            :page-size="taskSettleAllPage.size"
            layout="prev, pager, next, jumper"
            :total="taskSettleAllPage.total"
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
import XftDetailModal from "./components/XftDetailModal.vue";
import XftDescModal from "./components/XftDescModal.vue";
import { taskSettleQuitCoin, taskSettleDel } from "@/api/task.js";
import { formatFloatNo } from "@/utils/index.js";
import { stepData } from "./staticData.js";

let that;
const statusData = [
  "",
  "待商户审核",
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
export default {
  data() {
    return {
      formatFloatNo,
      stepData,
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
    ...mapGetters([
      "taskSettleAllList",
      "taskSettleAllPage",
      "taskSettleAllFilter",
    ]),
  },
  mounted() {
    this.getTaskSettleAllList();
    that = this;
    // this.getDetail();
  },
  methods: {
    // 获取列表数据
    getTaskSettleAllList() {
      this.loading = true;

      this.$store
        .dispatch("task/getTaskSettleAllList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskSettleAllPage", val).then(() => {
        this.getTaskSettleAllList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getTaskSettleAllList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getTaskSettleAllList();
    },
    // 查看明细
    onSettleDetail(item) {
      this.$drawer.open({
        title: "结算明细",
        width: "70%",
        component: SettleDetail,
        value: { tsNo: item.tsNo },
        callback: (res) => {
          this.getTaskSettleAllList();
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
    // 支付
    onQuit(item) {
      if (item.tsStatus != 8) {
        return this.$message.error("状态错误");
      }

      this.fullscreenLoading = true;
      taskSettleQuitCoin({
        tsId: item.tsId, // 批次号
      })
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            that.$message.info("退款成功");
            that.getTaskSettleList();
          }
        })
        .catch((err) => {
          return that.$message.error("退款失败", err.message);
        })
        .finally(() => {
          this.fullscreenLoading = false;
        });
    },
    onXftDetail(item) {
      this.$drawer.open({
        title: "薪福通代发明细",
        width: "70%",
        value: { tsId: item.tsId },
        component: XftDetailModal,
      });
    },
    onXftDesc(item) {
      this.$drawer.open({
        title: "薪福通代发概要",
        width: "70%",
        value: { tsId: item.tsId },
        component: XftDescModal,
      });
    },
    // 删除申请
    onDelete(item) {
      if (!item.tsCno) {
        return this.$message.error("子批次号不存在");
      }
      this.$confirm("删除后，数据将无法恢复，是否确认删除？")
        .then((_) => {
          taskSettleDel({
            tsCno: item.tsCno,
          }).then((res) => {
            this.$message.info("删除成功");
            this.getTaskSettleAllList();
          });
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
