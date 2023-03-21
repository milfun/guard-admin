<template>
  <div class="p16">
    <el-card>
      <el-steps :active="detail.mcStep - 1" simple align-center>
        <el-step
          title="基本信息"
          icon="el-icon-edit"
          @click="onStep(1)"
        ></el-step>
        <el-step
          title="业务信息"
          icon="el-icon-suitcase-1"
          @click="onStep(2)"
        ></el-step>
        <el-step
          title="税务信息"
          icon="el-icon-data-analysis"
          @click="onStep(3)"
        ></el-step>
      </el-steps>
    </el-card>

    <div v-if="detail.mcStep == 99">
      <el-empty description="您已完成商户基本信息填写，点击按钮查看详情">
        <el-button type="primary" size="small" @click="onMine">
          前往查看
        </el-button>
      </el-empty>
    </div>

    <!-- 表单 -->
    <div class="flex-1" v-else>
      <reg-base v-if="detail.mcStep == 1" @confirm="onUpdate"></reg-base>
      <reg-business
        v-if="detail.mcStep == 2"
        @confirm="onUpdate"
      ></reg-business>
      <reg-tax v-if="detail.mcStep == 3" @confirm="onUpdate"></reg-tax>
    </div>
  </div>
</template>

<script>
import RegBase from "./components/RegBase.vue";
import RegBusiness from "./components/RegBusiness.vue";
import RegTax from "./components/RegTax.vue";
import { merchantMine } from "@/api/merchant.js";
// import AccountLogin from "./components/AccountLogin.vue";

export default {
  name: "Login",
  components: {
    RegBase,
    RegBusiness,
    RegTax,
  },
  data() {
    return {
      detail: {},
    };
  },
  mounted(e) {
    // console.log(this.$router);
    this.getDetail();
  },
  methods: {
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
    onStep(step) {
      if (this.step != step) {
        this.step = step;
      }
    },
    onMine() {
      this.$router.push({
        name: "merchantMine",
        params: { step: this.detail.mcStep },
      });
    },
    // 子组件更新
    onUpdate() {
      this.getDetail();
    },
  },
};
</script>

<style lang="scss" scope>
.wraper {
  min-height: calc(100vh - 50px);
  overflow-y: scroll;
}
</style>
