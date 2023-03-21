<template>
  <div class="p16">
    <div class="tc-form">
      <el-table
        ref="multipleTable"
        :data="settleList"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <!-- <el-table-column prop="tsNo" label="批次号" /> -->
        <!-- <el-table-column prop="tsCno" label="子批次号" /> -->
        <el-table-column prop="tsIds" label="任务id集" />
        <el-table-column prop="mmName" label="姓名" />
        <el-table-column prop="mmCard" label="身份证" />
        <el-table-column prop="mmMobile" label="手机号" />
        <el-table-column prop="mmBank" label="银行卡" />
        <el-table-column prop="tsCoin" label="金额">
          <template slot-scope="scope">
            {{ formatFloat(scope.row.tsCoin / 100) }}
          </template>
        </el-table-column>
        <el-table-column prop="tsTotal" label="结算金额">
          <template slot-scope="scope">
            {{ formatFloat(scope.row.tsTotal / 100) }}
          </template>
        </el-table-column>
        <el-table-column prop="tsStatus" label="状态">
          <template slot-scope="scope">
            <span>{{ statusData[scope.row.tsStatus] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-form
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        hide-required-mark
        ref="form"
      >
        <el-form-item label="发放金额" prop="tsCoin">
          <el-input v-model="tsCoin" />
        </el-form-item>

        <el-form-item label="服务费" prop="tsRate">
          <el-input v-model="tsRate" />
        </el-form-item>

        <el-form-item label="结算金额" prop="tsTotal">
          <el-input v-model="tsTotal" />
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 关闭 </el-button>
    </div>
  </div>
</template>

<script>
import { taskSettleDetail } from "@/api/task.js";
import { formatFloatNo } from "@/utils/index.js";

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
  name: "FinishReceive",
  props: {
    value: Object,
  },
  data() {
    return {
      formatFloatNo,
      form: {},
      statusData,
      settleList: [],
    };
  },
  computed: {
    tsCoin: {
      get() {
        if (this.settleList.length > 0) {
          let num = this.settleList
            .map((item) => item.tsCoin)
            .reduce((a, b) => a + b);
          return formatFloatNo(num / 100);
        } else {
          return 0;
        }
      },
      set() {},
    },
    tsRate: {
      get() {
        if (this.settleList.length > 0) {
          let num = this.settleList
            .map((item) => item.tsRate)
            .reduce((a, b) => a + b);
          return formatFloatNo(num / 100);
        } else {
          return 0;
        }
      },
      set() {},
    },
    tsTotal: {
      get() {
        if (this.settleList.length > 0) {
          let num = this.settleList
            .map((item) => item.tsTotal)
            .reduce((a, b) => a + b);

          return formatFloatNo(num / 100);
        } else {
          return 0;
        }
      },
      set() {},
    },
  },
  mounted() {
    this.getSettleDetail(this.value.tsNo);
  },
  methods: {
    getSettleDetail(tsNo) {
      if (!tsNo) {
        return this.$message.info("请传入tsNo");
      }
      taskSettleDetail({
        tsNo: tsNo,
      })
        .then((res) => {
          this.settleList = res.data;
        })
        .catch((err) => {
          return this.$message.error(err.message);
        });
    },
    onCancel() {
      this.$drawer.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.textArea {
  background: #f1f6ff;
  border-radius: 5px;
  border: 0;
}

.textNum {
  position: relative;
  text-align: right;
  top: -50px;
  right: 10px;
}
</style>
