<template>
  <div class="p16">
    <div class="tc-form">
      <el-table
        ref="multipleTable"
        :data="value.form"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="mmName" label="姓名" />
        <el-table-column prop="trTotal" label="发放金额">
          <template slot-scope="scope">
            {{ formatFloatNo(scope.row.trTotal / 100) }}
          </template>
        </el-table-column>
        <el-table-column prop="trTotal" label="服务费">
          <template slot-scope="scope">
            {{ formatFloatNo((scope.row.trTotal * mbServe) / 10000) }}
          </template>
        </el-table-column>
        <el-table-column prop="trTotal" label="结算金额">
          <template slot-scope="scope">
            {{ formatFloatNo((scope.row.trTotal * (100 + mbServe)) / 10000) }}
          </template>
        </el-table-column>
        <el-table-column prop="trStatus" label="状态">
          <template slot-scope="scope">
            <span>等待提交结算</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(true)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>

      <el-form
        v-loading="loading"
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        hide-required-mark
        ref="form"
      >
        <el-form-item label="服务费率" prop="mbServe">
          <el-input v-model="mbServe" readonly />
        </el-form-item>

        <el-form-item label="总服务费" prop="mbTotalServe">
          <el-input v-model="mbTotalServe" />
        </el-form-item>

        <el-form-item label="总结算金额" prop="mbTotal">
          <el-input v-model="mbTotal" />
        </el-form-item>

        <el-form-item label="结算备注" prop="mbRemark">
          <el-input v-model="mbRemark" />
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 取消 </el-button>
      <el-button
        class="confirm-btn"
        key="submit"
        type="primary"
        @click="onSubmit"
      >
        提交申请
      </el-button>
    </div>
  </div>
</template>

<script>
import { taskSettleApply } from "@/api/task.js";
import { formatFloat, formatFloatNo } from "@/utils/index.js";

const statusData = [
  { text: "待审核", color: "text-yellow", type: "", value: 1 },
  { text: "审核通过", color: "text-primary", type: "info", value: 2 },
  { text: "进行中", color: "text-500", type: "danger", value: 3 },
  { text: "已完成", color: "text-green", type: "danger", value: 4 },
  { text: "已结算", color: "text-500", type: "danger", value: 5 },
];

export default {
  name: "FinishReceive",
  props: {
    value: Object,
  },
  data() {
    return {
      formatFloatNo,
      formatFloat,
      form: {},
      detail: {},
      statusData,
      loading: false,
      multipleSelection: [],
      mbRemark: "",
    };
  },
  computed: {
    mbServe: {
      get() {
        return this.value.detail.mcBusiness.mbServe;
      },
      set() {},
    },
    // mbCoin: {
    //   get() {},
    //   set() {},
    // },
    mbTotalServe: {
      get() {
        if (this.multipleSelection.length > 0) {
          let num = this.multipleSelection
            .map((item) => formatFloatNo((item.trTotal * this.mbServe) / 10000))
            .reduce((a, b) => a + b);
          // console.log(num);
          // ;
          return formatFloatNo(num);
        } else {
          return 0;
        }
      },
      set() {},
    },
    mbTotal: {
      get() {
        if (this.multipleSelection.length > 0) {
          let num = this.multipleSelection
            .map((item) =>
              formatFloatNo((item.trTotal * (100 + this.mbServe)) / 10000)
            )
            .reduce((a, b) => a + b);
          return formatFloatNo(num);
        } else {
          return 0;
        }
      },
      set() {},
    },
  },
  mounted() {
    // this.multipleSelection = this.value.form;
    this.toggleSelection(true);
  },
  methods: {
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
    onSubmit() {
      if (!this.mbTotal) {
        return this.$message.error("结算金额不能为空");
      }
      // if (!this.mbRemark) {
      //   return this.$message.error("结算备注不能为空");
      // }
      if (this.multipleSelection.length <= 0) {
        return this.$message.error("请选择要结算的任务");
      }

      this.onConfirm();
    },

    onConfirm() {
      const { value } = this;
      const { mcWallet } = this.value.detail;

      if (mcWallet.mbTotal < this.mbTotal) {
        return this.$message.error(
          "账户余额不足，请先保证余额充足，再提交结算申请"
        );
      }

      const tsids =
        this.multipleSelection.length > 0
          ? this.multipleSelection
              .map((item) => {
                return item.trIds ? item.trIds : item.trId;
              })
              .join(",")
          : "";

      const data = JSON.stringify(this.multipleSelection);
      // return console.log(this.multipleSelection);
      this.loading = true;
      taskSettleApply({
        tsIds: tsids,
        tsData: data,
        tsTotal: +this.mbTotal,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("保存成功！");
            this.$drawer.confirm(res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message || "出错，请重试");
        })
        .finally(() => {
          this.loading = false;
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
