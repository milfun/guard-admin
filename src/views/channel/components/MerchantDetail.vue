<template>
  <div class="p16">
    <div>
      <el-form
        v-loading="loading"
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        hide-required-mark
        ref="form"
      >
        <el-form-item label="选择日期" prop="tsStart">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="form.tpStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            style="width: 150px"
          ></el-date-picker>
          <span class="mx10">-</span>
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            style="width: 150px"
            v-model="form.tpEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="mr10">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-tabs v-model="mode" type="card" @tab-click="onMode">
        <el-tab-pane label="支付数据" name="pay">支付数据</el-tab-pane>
        <el-tab-pane label="开票数据" name="invoice">开票数据</el-tab-pane>
      </el-tabs>
    </div>

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

    <div class="text-right mt20">
      <el-button
        class="confirm-btn"
        key="submit"
        type="primary"
        @click="onCancel"
      >
        关闭
      </el-button>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import { channelPay } from "@/api/channel.js";

export default {
  name: "MerchantDetail",
  props: {
    value: Object,
  },
  components: { countTo },
  data() {
    return {
      loading: false,
      form: {
        tpStart: "",
        tpEnd: "",
      },
      mode: "pay",
      total: 0,
    };
  },
  watch: {},
  created() {
    // console.log(this.value);
    this.getMerchantDetail();
  },
  methods: {
    // 获取商户支付数据,默认今天
    getMerchantDetail() {
      if (this.value.mcId) {
        let params = {};
        this.loading = true;

        params.mcId = this.value.mcId;
        params.tpStart = this.form.tpStart;
        params.tpEnd = this.form.tpEnd;

        channelPay({
          mcId: params.mcId,
          tpStart: params.tpStart,
          tpEnd: params.tpEnd,
        })
          .then((res) => {
            if (res.code == 200) {
              this.total = res.data.tpPay;
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
    getInvoiceDetail() {},
    onSearch() {
      if (this.mode == "pay") {
        this.getMerchantDetail();
      } else {
        this.getInvoiceDetail();
      }
    },
    onCancel() {
      this.$drawer.close();
    },
    // 切换模式
    onMode(tab, event) {
      // console.log(tab, event);
      if (this.mode == "pay") {
        this.getMerchantDetail();
      } else {
        this.getInvoiceDetail();
      }
      this.mode = tab.name;
    },
  },
};
</script>

<style lang="scss" scoped>
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
