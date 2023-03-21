<template>
  <div class="p16">
    <div v-if="detail.mcStep != 99">
      <el-empty description="您尚未完成商户基本信息填写，请点击按钮立即前往">
        <el-button type="primary" size="small" @click="onStep"
          >前往填写</el-button
        >
      </el-empty>
    </div>
    <div v-else>
      <el-card>
        <div class="flex item-center">
          <!-- <img :src="detail.mcLogo" class="img-40" /> -->
          <h2 class="ml10">{{ detail.mcName }}</h2>
        </div>
      </el-card>
      <!-- 基本信息 -->
      <el-card class="mt20">
        <el-descriptions class="margin-top" title="基本信息" :column="3" border>
          <template slot="extra">
            <el-button type="primary" size="small" @click="onEditBase()"
              >编辑</el-button
            >
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              统一社会信用代码
            </template>
            {{ detail.mcCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              企业对公邮箱
            </template>
            {{ detail.mcEmail }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              公司注册地址
            </template>
            {{ detail.mcAddress }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              法人姓名
            </template>
            {{ detail.mcLegalName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              法人证件类型
            </template>
            {{ detail.mcLegalType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              法人证件号
            </template>
            {{ detail.mcLegal }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              联系人姓名
            </template>
            {{ detail.mcContractName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              联系人手机号
            </template>
            {{ detail.mcContractMobile }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              联系人邮箱
            </template>
            {{ detail.mcContractEmail }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              企业主要业务收入
            </template>
            {{ detail.mcMajor }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              企业注册时间
            </template>
            {{ detail.mcRegTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              注册资本
            </template>
            {{ detail.mcRegMoney }} （万元）
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              所在行业
            </template>
            {{ detail.mcTrade }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              企业年收入规模
            </template>
            {{ detail.mcIncome }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              企业纳税人身份
            </template>
            {{ ["", "一般纳税人", "小规模纳税人"][detail.mcTaxType] }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <!-- 业务信息 -->
      <el-card class="mt20">
        <el-descriptions class="margin-top" title="业务信息" :column="3" border>
          <template slot="extra">
            <el-button type="primary" size="small" @click="onEditBusiness()"
              >编辑</el-button
            >
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              服务费率
            </template>
            {{ detail.mcBusiness.mbServe }}%
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              银行账号
            </template>
            {{ detail.mcBusiness.mbNo }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              开户银行
            </template>
            {{ detail.mcBusiness.mbBank }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              开户分行全称
            </template>
            {{ detail.mcBusiness.mbBranch }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              业务结算规则
            </template>
            {{ detail.mcBusiness.mbRule }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              预计发包人数
            </template>
            {{ detail.mcBusiness.mbPreNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              预计发放费用日期
            </template>
            {{ detail.mcBusiness.mbPreDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              预计单人单月所得金额
            </template>
            {{ detail.mcBusiness.mbPreIncome }}（元）
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              客户与自由职业者是否存在劳动/劳务关系
            </template>
            {{ ["", "是", "否"][detail.mcBusiness.mbIsConnect] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              自由职业者能否提供实名认证
            </template>
            {{ ["", "是", "否"][detail.mcBusiness.mbIsAuth] }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 任务列表 -->
        <div v-if="detail.mcBusiness.mbTasks">
          <el-table
            ref="multipleTable"
            :data="detail.mcBusiness.mbTasks"
            tooltip-effect="dark"
            border
            style="width: 100%"
          >
            <el-table-column prop="name" label="涉及任务" />
            <el-table-column prop="content" label="主要内容" />
            <el-table-column prop="number" label="需求数量" />
            <el-table-column prop="time" label="任务时间" />
            <el-table-column prop="daily" label="进度自控" />
            <el-table-column prop="device" label="工作设备" />
          </el-table>
        </div>
      </el-card>
      <!-- 税务信息 -->
      <el-card class="mt20">
        <el-descriptions class="margin-top" title="税务信息" :column="3" border>
          <template slot="extra">
            <el-button type="primary" size="small" @click="onEditTax()"
              >编辑</el-button
            >
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              开票类型
            </template>
            {{ ["", "普票", "专票"][detail.mcTax.mtType] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              开票科目
            </template>
            {{ detail.mcTax.mtLabel }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              开票地址
            </template>
            {{ detail.mcTax.mtTaxAddress }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              开票电话
            </template>
            {{ detail.mcTax.mtTaxMobile }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              开户行
            </template>
            {{ detail.mcTax.mtBank }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              账号
            </template>
            {{ detail.mcTax.mtNo }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              邮寄地址
            </template>
            {{ detail.mcTax.mtMailAddress }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              收件人姓名
            </template>
            {{ detail.mcTax.mtMailName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              收件人手机号
            </template>
            {{ detail.mcTax.mtMailMobile }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
import EditBase from "./components/EditBase.vue";
import EditBusiness from "./components/EditBusiness.vue";
import EditTax from "./components/EditTax.vue";

import { merchantMine } from "@/api/merchant.js";
export default {
  data() {
    return {
      mcId: 0,
      detail: {},
      taskList: [""],
    };
  },
  mounted(e) {
    this.getDetail();
  },
  methods: {
    // 获取用户基本信息
    getDetail() {
      merchantMine()
        .then((res) => {
          if (res.code == 200) {
            let result = res.data;
            let taskList = result.mcBusiness.mbTasks;
            // console.log(taskList);
            // console.log(typeof taskList);
            if (taskList) {
              taskList = JSON.parse(taskList);
              result.mcBusiness.mbTasks = taskList;
            }
            this.detail = result;
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 前往填写基本信息
    onStep() {
      this.$router.push({
        name: "merchantJoin",
        params: { step: this.detail.mcStep },
      });
    },
    // 编辑基本信息
    onEditBase() {
      this.$drawer.open({
        title: "编辑基本信息",
        component: EditBase,
        width: "50%",
        value: this.detail,
        callback: (res) => {
          this.getDetail();
        },
      });
    },
    // 编辑业务信息
    onEditBusiness() {
      this.$drawer.open({
        title: "编辑业务信息",
        component: EditBusiness,
        width: "60%",
        value: this.detail.mcBusiness,
        callback: (res) => {
          this.getDetail();
        },
      });
    },
    // 编辑税务信息
    onEditTax() {
      this.$drawer.open({
        title: "编辑税务信息",
        component: EditTax,
        width: "50%",
        value: this.detail.mcTax,
        callback: (res) => {
          this.getDetail();
        },
      });
    },
  },
};
</script>

<style></style>
