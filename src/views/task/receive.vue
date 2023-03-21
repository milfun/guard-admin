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
        <el-form-item label="姓名">
          <div class="flex">
            <el-input
              v-model="taskReceiveFilter.mmName"
              placeholder="请输入姓名"
            />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="数据来源">
          <el-select
            v-model="taskReceiveFilter.trType"
            placeholder="请选择来源"
            @change="onSelect"
          >
            <el-option label="正常数据" :value="1"> </el-option>
            <el-option label="导入数据" :value="2"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="taskReceiveFilter.trStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="全部" value="" />
            <el-option label="未审核" :value="-1" />
            <el-option label="待商户审核" :value="1" />
            <el-option label="任务进行中" :value="2" />
            <el-option label="待商户结算" :value="3" />
            <el-option label="已结算,待提交" :value="4" />
            <el-option label="用户取消" :value="5" />
            <el-option label="商户审核不通过" :value="6" />
            <el-option label="商户拒绝付款" :value="7" />
            <el-option label="管理员关停" :value="8" />
            <el-option label="管理员关停" :value="8" />
            <el-option label="已提交结算申请" :value="9" />
            <el-option label="管理员审核通过，支付" :value="10" />
            <el-option label="支付，已完结" :value="11" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <!-- <el-button v-permission="'adjustTask'">测试</el-button> -->
      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="taskReceiveList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="trId" label="ID" width="40" />

          <el-table-column prop="trType" label="任务类型" width="100">
            <template slot-scope="scope">
              {{ ["", "正常任务", "指派任务"][scope.row.trType] }}
            </template>
          </el-table-column>
          <el-table-column prop="tmId" label="任务名称" width="100">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onDetail(scope.row.tmId)"
              >
                {{ scope.row.trTask.tmName || "暂无名称" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="mcId" label="商户ID" width="120" />
          <el-table-column prop="mmId" label="接单者" width="120">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onMemberDetail(scope.row)"
              >
                {{ scope.row.mmName }}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="trUserDay" label="用工天数" width="120" /> -->
          <!-- <el-table-column prop="trMerchantDay" label="结算天数" width="120" />
          <el-table-column prop="trCoin" label="结算金额" width="120" /> -->
          <el-table-column prop="trStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.trStatus] }}</span>
            </template> </el-table-column
          ><el-table-column label="操作">
            <template slot-scope="scope">
              <span
                v-permission="'adjustTaskReceive'"
                class="pointer f14"
                @click="onAdjust(scope.row)"
              >
                <i class="el-icon-tickets" /> 审核
              </span>

              <span
                v-permission="'mcAdjustReceive'"
                v-if="scope.row.trStatus < 3"
                class="pointer f14"
                @click="onMcAdjust(scope.row)"
              >
                <i class="el-icon-tickets" /> 审核
              </span>

              <span
                v-permission="'mcFinishReceive'"
                v-if="scope.row.trStatus == 3"
                class="pointer f14"
                @click="onMcFinish(scope.row)"
              >
                <i class="el-icon-tickets" /> 结算
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="taskReceivePage.page"
          :page-size="taskReceivePage.size"
          layout="prev, pager, next, jumper"
          :total="taskReceivePage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdjustReceive from "./components/AdjustReceive.vue";
import McAdjustReceive from "./components/McAdjustReceive.vue";
import McFinishReceive from "./components/McFinishReceive.vue";
import DetailModal from "./components/DetailModal.vue";
// import { taskStatusData } from "./staticData.js";

const statusData = [
  "",
  "待商户审核",
  "任务进行中",
  "完成待结算",
  "已结算,待提交",
  "用户取消",
  "商户审核不通过",
  "商户拒绝付款",
  "管理员关停",
  "已提交结算申请",
  "管理员审核通过，待支付",
  "管理员审核不通过，请重新申请",
  "支付，已完结",
];
export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        isDriver: "0",
        isuser: "0",
      },
      statusData,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["taskReceiveList", "taskReceivePage", "taskReceiveFilter"]),
  },
  mounted() {
    this.getTaskReceiveList();
  },
  methods: {
    // 获取列表数据
    getTaskReceiveList() {
      this.loading = true;

      this.$store
        .dispatch("task/getTaskReceiveList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskReceivePage", val).then(() => {
        this.getTaskReceiveList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getTaskReceiveList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getTaskReceiveList();
    },
    // 任务详情
    onDetail(tmId) {
      // this.$router.push({ name: "taskDetail", query: { id: mmId } });
      // console.log(mmId);
      if (tmId) {
        this.$modal.open({
          title: "任务详情",
          width: "70%",
          component: DetailModal,
          maskClosable: false,
          value: { tmId },
        });
      } else {
        return this.$message.info("暂无详情");
      }
    },
    // 商户详情
    onMerchantDetail(mcId) {
      if (mcId) {
        this.$router.push({ name: "merchantDetail", query: { id: mcId } });
      }
    }, // 商户详情
    onMemberDetail(item) {
      if (item.trType == 2) {
        return this.$message.info("暂无详情");
      }
      if (mmId) {
        this.$router.push({ name: "freeDetail", query: { id: mmId } });
      }
    },
    // 审核任务
    onAdjust(item) {
      this.$modal.open({
        title: "审核任务",
        component: AdjustReceive,
        maskClosable: false,
        value: item,
        callback: (res) => {
          if (res.trId) {
            this.getTaskReceiveList();
          }
        },
      });
    },
    // 商户审核
    onMcAdjust(item) {
      this.$modal.open({
        title: "商户审核任务",
        component: McAdjustReceive,
        maskClosable: false,
        value: item,
        callback: (res) => {
          this.getTaskReceiveList();
        },
      });
    },
    // 商户结算
    onMcFinish(item) {
      if (item.trStatus === 3) {
        this.$modal.open({
          title: "结算任务",
          component: McFinishReceive,
          maskClosable: false,
          value: item,
          callback: (res) => {
            this.getTaskReceiveList();
          },
        });
      } else {
        return this.$message.error("任务当前无法进行结算");
      }
    },
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
