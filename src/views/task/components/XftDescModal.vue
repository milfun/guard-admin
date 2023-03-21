<template>
  <div class="p16">
    <div class="tc-form">
      <el-descriptions v-if="detail" class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            代发编号
          </template>
          {{ detail.TRSREF }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            代发说明
          </template>
          {{ detail.TRXRMK }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            付款账号
          </template>
          {{ detail.PAYEAC }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            付款户名
          </template>
          {{ detail.PAYNAM }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            总金额
          </template>
          {{ detail.TRXAMT }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            成功金额
          </template>
          {{ detail.SUCAMT }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            失败金额
          </template>
          {{ detail.FAIAMT }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            代发笔数
          </template>
          {{ detail.TRXNUM }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            代发企业
          </template>
          {{ detail.PRJNAM }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            代发协议
          </template>
          {{ detail.PAYCNV }}
          {{ detail.TRSAGN }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            批次状态
          </template>
          {{ statusData[detail.STSCOD] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            业务参考号
          </template>
          {{ detail.BUSREF }}
        </el-descriptions-item>
      </el-descriptions>
      <el-empty v-else description="暂无数据"></el-empty>
    </div>
    <div class="text-right mt20">
      <el-button class="mr10" @click="onCancel"> 关闭 </el-button>
    </div>
  </div>
</template>

<script>
import { taskSettleXftDesc } from "@/api/task.js";
const statusData = {
  WOP: "待提交（临时暂存，未提交代发申请）",
  DEL: "	已作废（目前只是暂存的数据可以作废）",
  WCK: "审批中",
  REJ: "已否决（审批否决）",
  RVK: "已撤销（待审批，待付款，以及付完款没到预约时间的数据可以在薪福通代发这边撤销代发批次）",
  WSD: "待支付（调用付款API之后将会变成待支付状态）",
  CPY: "取消支付（api代发批次支付过期之后会自动取消代发批次，也可以在薪福通代发手工取消代发批次）",
  WSB: "	预约待发送银行（预约支付，已经付完款，但是未到预约时间）",
  WAT: "银行处理中",
  BNK: "银行处理中",
  FIN: "支付完成（存在一笔代发明细成功即为代发完成）",
  FAL: "支付失败（全部代发明细失败，即为代发失败）",
  UPD: "数据上传状态(openapi 大批量代发使用)新代发付款也会使用，代发明细上传状态",
  OUT: "	删除状态（作废之后删除记录，薪福通这边无法查询）",
};
export default {
  name: "XftDetailModal",
  props: {
    value: Object,
  },
  data() {
    return {
      statusData,
      detail: {},
    };
  },
  mounted() {
    this.getSettleDetail(this.value.tsId);
  },
  methods: {
    getSettleDetail(tsId) {
      if (!tsId) {
        return this.$message.info("请传入tsId");
      }
      taskSettleXftDesc({
        tsId: tsId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.detail = res.data[0];
          }
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
