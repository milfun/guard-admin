<template>
  <div class="app-container">
    <!-- 筛选表单 -->
    <el-card shadow="hover">
      <el-form :inline="true" :model="form" class="flex">
        <el-form-item label="数据来源">
          <el-select
            v-model="taskFinishFilter.trType"
            placeholder="请选择来源"
            @change="onSelect"
          >
            <el-option label="正常数据" :value="1"> </el-option>
            <el-option label="导入数据" :value="2"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-button @click="onDownload">下载导入表格模板</el-button>
      <el-button type="primary" @click="onImport">导入表格</el-button>
    </el-card>

    <el-card class="mt20" shadow="hover">
      <!-- <el-button v-permission="'adjustTask'">测试</el-button> -->
      <!-- 列表数据 -->
      <div class="form-list mt20">
        <el-table
          ref="multipleTable"
          :data="taskFinishList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <!-- <el-table-column prop="mcId" label="商户ID" /> -->
          <el-table-column prop="trIds" label="接单集合" />
          <el-table-column prop="mmName" label="自由者名称">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer text-primary f14 text-center"
                @click="onDetail(scope.row)"
              >
                {{ scope.row.mmName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="mmCard" label="身份证" />
          <el-table-column prop="mmBank" label="银行卡" />
          <el-table-column prop="mmMobile" label="手机号" />
          <el-table-column prop="trCoin" label="单价">
            <template slot-scope="scope">
              {{ scope.row.trCoin }}
              {{ scope.row.trUnit }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="trUnit" label="单位" /> -->
          <el-table-column prop="trMerchantDay" label="数量" />
          <el-table-column prop="trTotal" label="金额">
            <template slot-scope="scope">
              {{ formatFloatNo(scope.row.trTotal / 100) }}
              <!-- <span v-if="scope.row.trType == 2">{{
                formatFloat(scope.row.trTotal / 100)
              }}</span> -->
              <!-- <span v-else>{{ formatFloat(scope.row.trTotal) }}</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="mmStep" label="当前步骤">
            <template slot-scope="scope">
              <span class="text-green" v-if="scope.row.mmStep == 99">
                已完成
              </span>
              <span v-else>未完成</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="pointer f14" @click="onPay(scope.row)">
                <i class="el-icon-tickets" /> 提交结算
              </span>

              <span
                v-if="scope.row.trType == 2"
                class="pointer f14"
                @click="onDelete(scope.row)"
              >
                <i class="el-icon-tickets" /> 删除
              </span>

              <span
                v-permission="'McTaskFinishList'"
                v-if="scope.row.trType == 1"
                class="pointer f14"
                @click="onTabel(scope.row)"
              >
                <i class="el-icon-tickets" /> 查看明细
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="flex item-center">
        <div class="flex-1">
          <el-button type="primary" @click="onArrayPay">批量提交结算</el-button>
          <el-button type="primary" @click="onArrayDel">批量删除</el-button>
        </div>
        <div class="text-right bg-600 p12">
          <el-pagination
            :current-page.sync="taskFinishPage.page"
            :page-sizes="[10, 50, 100, 200, 500]"
            :page-size="taskFinishPage.size"
            layout="prev, sizes, pager, next, jumper"
            :total="taskFinishPage.total"
            background
            @current-change="onPageChange"
            @size-change="onPageSize"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FinishModal from "./components/FinishModal.vue";
import FinishReceive from "./components/FinishReceive.vue";
import ImportSettle from "./components/ImportSettle.vue";

import { formatFloatNo } from "@/utils/index.js";
import { merchantMine } from "@/api/merchant.js";
import {
  taskFinishReceive,
  taskReceiveDelete,
  taskReceiveDeleteArr,
} from "@/api/task.js";

const statusData = [
  "",
  "待商户审核",
  "任务进行中",
  "待结算",
  "已结算",
  "用户取消",
  "商户审核不通过",
  "商户拒绝付款",
  "管理员关停",
];

export default {
  data() {
    return {
      formatFloatNo,
      form: {},
      detail: {},
      statusData,
      loading: false,
      multipleSelection: [],
    };
  },
  computed: {
    //
    ...mapGetters(["taskFinishList", "taskFinishPage", "taskFinishFilter"]),
  },
  mounted() {
    this.getTaskFinishList();
    this.getDetail();
  },
  methods: {
    // 获取列表数据
    getTaskFinishList() {
      this.loading = true;

      this.$store
        .dispatch("task/getTaskFinishList", {})
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // 获取商户数据
    getDetail() {
      merchantMine()
        .then((res) => {
          if (res.code == 200) {
            this.detail = res.data;
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 页数改变
    onPageChange(val) {
      this.$store.dispatch("task/editTaskFinishPage", val).then(() => {
        this.getTaskFinishList();
      });
    },
    onPageSize(val) {
      this.$store.dispatch("task/editTaskFinishPageSize", val).then(() => {
        this.getTaskFinishList();
      });
    },
    // 状态筛选
    onSelect() {
      this.getTaskFinishList();
    },
    // 查询数据
    onSearch() {
      // this.$message("submit!");
      this.getTaskFinishList();
    },
    // 用户详情
    onDetail(item) {
      if (item.trType == 2) {
        if (item.mmId.indexOf("Ipm") > -1) {
          return this.$message.info("暂无详情");
        }
      }
      if (item.mmId) {
        this.$router.push({ name: "freeDetail", query: { id: item.mmId } });
      }
    },
    // 删除记录
    onDelete(item) {
      if (item.trType != 2) {
        return this.$message.error("非导入数据无法删除");
      }
      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          taskReceiveDelete({
            trId: item.trId,
          })
            .then((res) => {
              if (res.code == 200) {
                this.$message.info("删除成功");
                this.getTaskFinishList();
              }
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        })
        .catch((_) => {});
    },
    // 获取该次结算所有接单列表
    onTabel(item) {
      if (item.mmId) {
        return taskFinishReceive({
          mmId: item.mmId,
          trType: item.trType,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$drawer.open({
                title: "结算明细",
                component: FinishReceive,
                width: "70%",
                value: {
                  mmId: item.mmId,
                  form: res.data,
                  detail: this.detail,
                },
                callback: (res) => {
                  this.getTaskFinishList();
                },
              });
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        return this.$message.info("暂无明细");
      }
    },
    // 提交结算
    onPay(item) {
      this.$drawer.open({
        title: "结算明细",
        component: FinishReceive,
        width: "70%",
        value: {
          mmId: item.mmId,
          form: [item],
          detail: this.detail,
        },
        callback: (res) => {
          this.getTaskFinishList();
        },
      });
    },
    // 批量提交结算
    onArrayPay(item) {
      if (this.multipleSelection.length <= 0) {
        return this.$message.error("请先选择后，再提交");
      }

      this.$drawer.open({
        title: "结算明细",
        component: FinishReceive,
        width: "70%",
        value: {
          form: this.multipleSelection,
          detail: this.detail,
        },
        callback: (res) => {
          this.getTaskFinishList();
        },
      });
    },
    // 批量删除
    onArrayDel() {
      if (this.multipleSelection.length <= 0) {
        return this.$message.error("请先选择后，再提交");
      }
      let ids = this.multipleSelection
        .map((item) => {
          return item.trId;
        })
        .join(",");
      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          taskReceiveDeleteArr({
            trIds: ids,
          })
            .then((res) => {
              if (res.code == 200) {
                if (res.data) {
                  this.$message.info(`删除成功,${res.data} 操作失败，未删除`);
                } else {
                  this.$message.info("删除成功");
                }
                this.getTaskFinishList();
              }
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        })
        .catch((_) => {});
    },
    // 下载模板表格
    onDownload() {
      let url = "http://kf.lanrongkj.com/importReceiveDemo.xlsx";
      window.open(url);
    },
    // 导入结算
    onImport() {
      this.$drawer.open({
        title: "导入结算",
        width: "70%",
        component: ImportSettle,
        value: {},
        callback: (res) => {
          this.getTaskFinishList();
        },
      });
    },
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
