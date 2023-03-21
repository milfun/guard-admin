<template>
  <div class="">
    <!-- 基本信息 -->
    <el-card class="">
      <el-descriptions class="margin-top" title="任务详情" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            任务名称
          </template>
          {{ detail.tmName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            任务Id
          </template>
          {{ detail.tmId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            任务内容
          </template>
          {{ detail.tmDesc || "暂无" }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            任务地址
          </template>
          {{ detail.tmAddress }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            任务日期
          </template>
          {{ detail.tmStart }}
          -
          {{ detail.tmEnd }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            任务时间
          </template>
          {{ detail.tmTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            任务要求
          </template>
          <el-tag v-for="(item, index) in detail.tmLabel" :key="index">{{
            item
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            是否指定成员
          </template>
          {{ detail.tmMember }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            需要人数
          </template>
          {{ detail.tmNumber }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            发包金额
          </template>
          {{ detail.tmCoin }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            单位
          </template>
          {{ detail.tmUnit }}
          /
          {{ detail.tmUnitName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            任务类型
          </template>
          {{ detail.tmType }}
        </el-descriptions-item>
        <el-descriptions-item v-if="detail.tmImage">
          <template slot="label">
            <i class="el-icon-office-building"></i>
            任务结果
          </template>
          <div class="flex item-center">
            <el-image
              v-for="(item, index) in detail.tmImage"
              :key="index"
              style="width: 80px; height: 80px"
              fit="fill"
              :preview-src-list="detail.tmImage"
              :src="item"
            ></el-image>
          </div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            当前状态
          </template>
          {{ detail.tmStatus }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 身份信息 -->
    <el-card class="mt20" v-if="detail.tmCompany">
      <el-descriptions class="margin-top" title="商户信息" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            商户名称
          </template>
          {{ detail.tmCompany.mcName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            商户ID
          </template>
          {{ detail.tmCompany.mcId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            商户邮箱
          </template>
          {{ detail.tmCompany.mcEmail }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            商户地址
          </template>
          {{ detail.tmCompany.mcAddress }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <div class="text-right mt20">
      <el-button @click="onCancel"> 关闭 </el-button>
    </div>
  </div>
</template>

<script>
import { taskDetail } from "@/api/task.js";
export default {
  props: {
    value: Object,
  },
  data() {
    return {
      tmId: 0,
      detail: {},
    };
  },
  mounted(e) {
    this.tmId = this.value.tmId;
    this.getDetail();
  },
  methods: {
    getDetail() {
      if (this.tmId) {
        taskDetail({
          tmId: this.tmId,
        })
          .then((res) => {
            if (res.code == 200) {
              let data = res.data;

              data.tmLabel = data.tmLabel
                ? data.tmLabel.split(",")
                : data.tmLabel;

              data.tmImage = data.tmImage
                ? data.tmImage.split(",")
                : data.tmImage;

              this.detail = data;
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }
    },

    onCancel() {
      this.$modal.close();
    },
  },
};
</script>

<style></style>
