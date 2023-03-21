<template>
  <div class="p16">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <base-info :value="detail"></base-info>
      </el-tab-pane>
      <el-tab-pane label="身份信息" name="second">
        <card-info :value="detail.mmCards"></card-info>
      </el-tab-pane>
      <el-tab-pane label="银行信息" name="third">
        <bank-info :value="detail.mmBanks"></bank-info>
      </el-tab-pane>
      <!-- <el-tab-pane label="合同信息" name="four">
        <contract-info
          v-if="activeName == 'four'"
          :value="detail.mmContracts"
        ></contract-info>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { userDetail } from "@/api/user.js";
import BaseInfo from "./BaseInfo.vue";
import CardInfo from "./CardInfo.vue";
import BankInfo from "./BankInfo.vue";
// import ContractInfo from "./ContractInfo.vue";

export default {
  name: "UserDetailModal",
  props: {
    value: Object,
  },
  components: {
    BaseInfo,
    CardInfo,
    BankInfo,
    // ContractInfo,
  },
  data() {
    return {
      // activeName: "",
      detail: {},
      loading: false,
    };
  },
  computed: {
    activeName: {
      get() {
        return this.value.activeName;
      },
      set(val) {},
    },
  },
  mounted(e) {
    // console.log(this.value);
    if (this.value.mmId) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      userDetail({
        mmId: this.value.mmId,
      })
        .then((res) => {
          this.detail = res.data;
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    handleClick(e) {
      this.value.activeName = e.name;
    },
  },
};
</script>

<style></style>
