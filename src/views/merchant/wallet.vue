<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="hover" header="账户信息">
          <div class="f14">
            账户ID：
            <span>45631f604c3fedab71a13aa477a726121af9df64</span>
          </div>
          <div class="money text-primary">
            <count-to
              :start-val="0"
              :end-val="detail.mbTotal"
              :duration="3000"
              :decimals="2"
              separator=","
              prefix="¥"
              autoplay
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" header="快捷操作">
          <div class="">
            <span>账户记录</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="mt20" shadow="hover" header="账户日志">
      <el-radio-group
        v-model="limits.blType"
        style="margin-bottom: 30px"
        @input="onSelect"
      >
        <el-radio-button :label="1">收入</el-radio-button>
        <el-radio-button :label="2">支出</el-radio-button>
      </el-radio-group>

      <el-table
        :loading="loading"
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column prop="blId" label="ID" />
        <el-table-column prop="blName" label="项目" />
        <el-table-column prop="blCoin" label="金额">
          <template slot-scope="scope">
            <span
              class="f18 bold"
              :class="scope.row.blType == 1 ? 'text-green' : 'text-red'"
              >{{ scope.row.blType == 1 ? "+" : "-"
              }}{{ scope.row.blCoin / 100 }}</span
            >
          </template>
        </el-table-column>
        <!-- <el-table-column prop="blNow" label="操作后金额" /> -->

        <el-table-column prop="blTime" label="时间" />
        <el-table-column prop="blRemark" label="备注" />
      </el-table>
      <div class="text-right bg-600 p12">
        <el-pagination
          :current-page.sync="page.page"
          :page-size="page.size"
          layout="prev, pager, next, jumper"
          :total="page.total"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import { merchantBalanceDetail, merchantBalanceLogList } from "@/api/merchant";
import { formatFloat } from "@/utils/index.js";

export default {
  components: { countTo },
  data() {
    return {
      loading: false,
      startVal: 0,
      endVal: 0,

      detail: {},
      list: [],
      page: {
        page: 0,
        size: 10,
        total: 0,
      },
      limits: {
        blType: 1,
      },
    };
  },
  mounted() {
    this.getDetail();
    this.getList();
  },
  methods: {
    getDetail() {
      this.loading = true;
      merchantBalanceDetail()
        .then((res) => {
          if (res.code == 200) {
            let tmp = res.data;

            tmp.mbTotal = formatFloat(tmp.mbTotal / 100);
            this.detail = tmp;
            this.list = res.data.mbLogs;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getList() {
      const { page, limits } = this;
      this.loading = true;
      merchantBalanceLogList({
        page: page.page,
        size: page.size,
        blType: limits.blType,
      })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data;
            this.page;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onPageChange() {
      this.getList();
    },
    onSelect() {
      this.getList();
    },
  },
};
</script>

<style lang="scss" scope>
.money {
  font-size: 50px;
  // color: #f6416c;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}
</style>
