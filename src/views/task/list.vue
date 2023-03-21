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
        <el-form-item label="任务名称">
          <div class="flex">
            <el-input
              v-model="taskFilter.tmName"
              placeholder="请输入任务名称"
            />
          </div>
        </el-form-item>
        <el-form-item label="任务Id">
          <div class="flex">
            <el-input v-model="taskFilter.tmId" placeholder="请输入任务ID" />
          </div>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="taskFilter.tmStatus"
            placeholder="请选择状态"
            @change="onSelect"
          >
            <el-option label="全部" value="" />
            <el-option label="未审核" :value="-1" />
            <el-option label="待审核" :value="1" />
            <el-option label="待领取" :value="2" />
            <el-option label="进行中" :value="3" />
            <el-option label="待结算" :value="4" />
            <el-option label="已结算" :value="5" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="taskList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="tmId" label="任务ID" width="120" />
          <el-table-column prop="tmName" label="任务名称" width="120">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onDetail(scope.row.tmId)"
              >
                {{ scope.row.tmName }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="tmCompany" label="商户名称" width="120">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onMerchantDetail(scope.row.mcId)"
              >
                {{ scope.row.tmCompany.mcName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="tmAddress" label="工作地址" width="120" />
          <el-table-column prop="tmCoin" label="发包单价" width="120">
            <template slot-scope="scope">
              <span>
                {{ scope.row.tmCoin / 100 }}{{ scope.row.tmUnit }}
                /
                {{ scope.row.tmUnitName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="tmEnd" label="截止日期" width="120" />
          <el-table-column prop="tmStatus" label="状态">
            <template slot-scope="scope">
              <span>{{ statusData[scope.row.tmStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span
                v-permission="'editTask'"
                class="pointer f14"
                @click="onEdit(scope.row)"
              >
                <i class="el-icon-tickets" /> 编辑
              </span>

              <span
                v-permission="'adjustTask'"
                class="pointer f14"
                @click="onAdjust(scope.row)"
              >
                <i class="el-icon-tickets" /> 审核
              </span>

              <span
                v-permission="'inviteTaskQrcode'"
                class="pointer f14"
                @click="onQrcode(scope.row)"
              >
                <i class="el-icon-tickets" /> 邀请码
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="taskPage.page"
          :page-size="taskPage.size"
          layout="prev, pager, next, jumper"
          :total="taskPage.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import PublishModal from "./components/PublishModal.vue";
import AdjustModal from "./components/AdjustModal.vue";
import DetailModal from "./components/DetailModal.vue";
import EditModal from "./components/EditModal.vue";
import QrcodeModal from "./components/QrcodeModal.vue";
// import { taskStatusData } from "./staticData.js";
import { taskInviteQrcode } from "@/api/task";

const statusData = ["", "待审核", "审核通过", "审核不通过"];
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
    ...mapGetters(["taskList", "taskPage", "taskFilter"]),
  },
  mounted() {
    this.getTaskList();
  },
  methods: {
    // 获取列表数据
    getTaskList() {
      this.loading = true;

      this.$store
        .dispatch("task/getTaskList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskPage", val).then(() => {
        this.getTaskList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getTaskList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getTaskList();
    },
    // 任务详情
    onDetail(tmId) {
      // this.$router.push({ name: "taskDetail", query: { id: mmId } });
      // console.log(mmId);
      this.$modal.open({
        title: "任务详情",
        width: "70%",
        component: DetailModal,
        maskClosable: false,
        value: { tmId },
      });
    },
    // 商户详情
    onMerchantDetail(mcId) {
      console.log(this.$router);
      this.$router.push({ name: "merchantDetail", query: { id: mcId } });
    },
    // 编辑任务
    onEdit(item) {
      this.$drawer.open({
        title: "编辑任务",
        width: "60%",
        component: EditModal,
        value: item,
        callback: (res) => {
          console.log(res);
          location.reload();
          // if (res.tmId) {
          //   this.getTaskList();
          // }
        },
      });
    },
    // 审核任务
    onAdjust(item) {
      this.$modal.open({
        title: "审核任务",
        component: AdjustModal,
        maskClosable: false,
        value: item,
        callback: (res) => {
          if (res.tmId) {
            this.getTaskList();
          }
        },
      });
    },
    // 生成小程序二维码
    onQrcode(item) {
      taskInviteQrcode({
        tmId: item.tmId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$modal.open({
              title: "小程序邀请码",
              width: "50%",
              component: QrcodeModal,
              maskClosable: false,
              value: { url: res.data },
            });
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
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
