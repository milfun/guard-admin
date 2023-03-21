<template>
  <div class="p16">
    <!-- 基本信息 -->
    <el-card class="mt20">
      <el-descriptions class="margin-top" title="基本信息" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="onModal('first')">
            编辑
          </el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ detail.mmName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            Id
          </template>
          {{ detail.mmId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            手机号
          </template>
          {{ detail.mmMobile }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            当前步骤
          </template>
          <span v-if="detail.mmStep == 99">已完成</span>
          <span v-else>{{ stepData[detail.mmStep] }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            当前状态
          </template>
          <span v-if="detail.mmStatus == 9">封禁</span>
          <span v-else>{{ statusData[detail.mmStatus] }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 身份信息 -->
    <el-card class="mt20" v-if="detail.mmCards && detail.mmCards.mcId != 0">
      <el-descriptions class="margin-top" title="身份信息" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="onModal('second')"
            >编辑</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            身份证号码
          </template>
          {{ detail.mmCards.mcNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            地址
          </template>
          {{ detail.mmCards.mcAddress }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            机关
          </template>
          {{ detail.mmCards.mcCity }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            有效期
          </template>
          {{ detail.mmCards.mcStart }} -
          {{ detail.mmCards.mcEnd }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            人像面
          </template>
          <el-image
            style="width: 80px; height: 80px"
            fit="fill"
            :preview-src-list="[detail.mmCards.mcFront, detail.mmCards.mcBack]"
            :src="detail.mmCards.mcFront"
          ></el-image>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            国徽面
          </template>
          <el-image
            style="width: 80px; height: 80px"
            fit="fill"
            :preview-src-list="[detail.mmCards.mcBack, detail.mmCards.mcFront]"
            :src="detail.mmCards.mcBack"
          ></el-image>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 银行信息 -->
    <el-card class="mt20" v-if="detail.mmBanks && detail.mmBanks.mbId != 0">
      <el-descriptions class="margin-top" title="银行信息" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="onModal('third')"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="onDeleteBank(detail.mmBanks)"
            >删除银行信息</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            银行卡号
          </template>
          {{ detail.mmBanks.mbNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            开户银行
          </template>
          {{ detail.mmBanks.mbBank }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            开户支行
          </template>
          {{ detail.mmBanks.mbBranch }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            识别银行
          </template>
          {{ detail.mmBanks.mbName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            ocr订单号
          </template>
          {{ detail.mmBanks.mbOrder }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            ocr执行
          </template>
          {{ detail.mmBanks.mbExcute }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            ocr验证
          </template>
          {{ detail.mmBanks.mbVerify }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            次数
          </template>
          {{ detail.mmBanks.mbTimes }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 合同信息 -->
    <el-card
      class="mt20"
      v-if="detail.mmContracts && detail.mmContracts.mcId != 0"
    >
      <el-descriptions class="margin-top" title="合同信息" :column="2" border>
        <template slot="extra">
          <el-button
            type="primary"
            size="small"
            @click="onDownload(detail.mmContracts.mcNo)"
          >
            下载合同
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="onUpdate(detail.mmContracts.mcNo)"
          >
            更新合同数据
          </el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            合同编号
          </template>
          {{ detail.mmContracts.mcNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            合同连接
          </template>
          {{ detail.mmContracts.mcLink }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            签约日期
          </template>
          {{ detail.mmContracts.mcDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            签约状态
          </template>
          {{ contractStatusData[detail.mmContracts.mcStatus] }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import UserDetailModal from "./components/UserDetailModal.vue";
import { stepData, statusData, contractStatusData } from "./staticData.js";
import { downloadContract, updateContract } from "@/api/contract.js";

import { userDetail, userDelBank } from "@/api/user.js";
export default {
  data() {
    return {
      mmId: 0,
      stepData,
      statusData,
      contractStatusData,
      detail: {},
    };
  },
  mounted(e) {
    // console.log(this.$route.query.id);
    this.mmId = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      if (this.mmId) {
        userDetail({
          mmId: this.mmId,
        })
          .then((res) => {
            this.detail = res.data;
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }
    },
    // 打开编辑窗口
    onModal(name) {
      this.$modal.open({
        width: "50%",
        component: UserDetailModal,
        maskClosable: false,
        value: { mmId: this.mmId, activeName: name },
        callback: (res) => {
          this.getDetail();
        },
      });
    },
    // 删除银行信息
    onDeleteBank(item) {
      console.log(item);
      if (!item.mmId) {
        return this.$message.info("mmId不能为空");
      }
      this.$confirm("删除后，数据将无法回复，是否确认删除？")
        .then((_) => {
          userDelBank({
            mmId: item.mmId,
          })
            .then((res) => {
              this.$message.info("删除成功");
              this.getDetail();
            })
            .catch((err) => {
              this.$message.info(err.message);
            });
        })
        .catch((_) => {});
    },
    // 更新合同
    onUpdate(mcNo) {
      if (mcNo) {
        updateContract({
          mcNo: mcNo,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.info("已更新");
              this.getDetail();
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        this.$message.error("mcNo不能为空");
      }
    },
    // 下载合同
    onDownload(mcNo) {
      if (mcNo) {
        downloadContract({
          mcNo: mcNo,
        })
          .then((res) => {
            if (res.code == 200) {
              window.open(res.data);
              this.getDetail();
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        this.$message.error("mcNo不能为空");
      }
    },
  },
};
</script>

<style></style>
