<template>
  <div class="p16">
    <el-form ref="form" :model="value" :rules="rules" label-width="100px">
      <el-form-item label="服务费率" prop="mbServe">
        <el-input v-model="value.mbServe">
          <span class="text-primary" slot="append"> %</span>
        </el-input>
        <!-- <span class="text-200 ml20 f12">* 保留至3位小数</span> -->
      </el-form-item>
      <el-form-item label="银行账号" prop="mbNo">
        <el-input v-model="value.mbNo" />
        <!-- <span class="text-200 ml20 f12">* 请填写银行账号</span> -->
      </el-form-item>
      <el-form-item label="开户银行" prop="mbBank">
        <el-input v-model="value.mbBank" />
        <!-- <span class="text-200 ml20 f12">* 请填写开户银行</span> -->
      </el-form-item>
      <el-form-item label="开户分行" prop="mbBranch">
        <el-input v-model="value.mbBranch" />
        <!-- <span class="text-200 ml20 f12">* 请填写开户分行</span> -->
      </el-form-item>
      <el-form-item label="业务结算规则" prop="mbRule">
        <el-input v-model="value.mbRule" />
        <!-- <span class="text-200 ml20 f12">* </span> -->
      </el-form-item>
      <el-form-item label="预计发包人数" prop="mbPreNumber">
        <el-input v-model="value.mbPreNumber" type="number" />
        <!-- <span class="text-200 ml20 f12">* 请填写数字</span> -->
      </el-form-item>
      <el-form-item label="预计发放费用日期" prop="mbPreDate">
        <el-input v-model="value.mbPreDate" type="number" />

        <!-- <span class="text-200 ml20 f12">* 请填写数字,例：1 15 </span> -->
      </el-form-item>
      <el-form-item label="预计单人单月所得金额" prop="mbPreIncome">
        <el-input v-model="value.mbPreIncome" type="number" />
        <!-- <span class="text-200 ml20 f12">* 请填写数字</span> -->
      </el-form-item>
      <el-form-item label="是否存在劳动/劳务关系" prop="mbIsConnect">
        <el-radio-group v-model="value.mbIsConnect" size="medium">
          <el-radio border :label="1">是</el-radio>
          <el-radio border :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否提供实名认证" prop="mbIsAuth">
        <el-radio-group v-model="value.mbIsAuth" size="medium">
          <el-radio border :label="1">是</el-radio>
          <el-radio border :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="涉及任务" prop="mbTasks">
        <el-table
          ref="multipleTable"
          :data="value.mbTasks"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="name" label="涉及任务">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" />
            </template>
          </el-table-column>
          <el-table-column prop="content" label="主要内容">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" />
            </template>
          </el-table-column>
          <el-table-column prop="number" label="需求数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" />
            </template>
          </el-table-column>
          <el-table-column prop="time" label="任务时间">
            <template slot-scope="scope">
              <el-input v-model="scope.row.time" />
            </template>
          </el-table-column>
          <el-table-column prop="daily" label="进度自控">
            <template slot-scope="scope">
              <el-input v-model="scope.row.daily" />
            </template>
          </el-table-column>
          <el-table-column prop="device" label="工作设备">
            <template slot-scope="scope">
              <el-input v-model="scope.row.device" />
            </template>
          </el-table-column>
          <el-table-column prop="device" label="操作">
            <template slot-scope="scope">
              <span
                class="flex-1 pointer f14 text-center"
                @click="onDelete(scope.row)"
                ><i class="el-icon-tickets" /> 删除
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt10">
          <el-button type="primary" @click="onTasks">新增任务</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="w100 flex item-center">
          <el-button type="primary" block @click="onSubmit"
            >保存设置，并前往下一步</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import MobileLogin from "./components/MobileLogin.vue";
// import AccountLogin from "./components/AccountLogin.vue";
import validate from "./validate.js";
import { merchantEditBusiness, merchantBusiness } from "@/api/merchant";

export default {
  name: "Login",
  components: {
    // MobileLogin,
    // AccountLogin,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      rules: {
        mbServe: [
          {
            required: true,
            message: "请填写服务费率",
            trigger: "blur",
          },
        ],
        mbNo: [
          {
            required: true,
            message: "请填写银行账号",
            trigger: "blur",
          },
        ],
        mbBank: [
          { required: true, message: "请填写开户银行", trigger: "blur" },
        ],
        mbBranch: [
          { required: true, message: "请填写开户分行", trigger: "blur" },
        ],
        mbRule: [
          { required: true, message: "请选择业务结算规则", trigger: "blur" },
        ],
        mbPreNumber: [
          { required: true, message: "请填写预计发包人数", trigger: "blur" },
        ],
        mbPreDate: [
          {
            required: true,
            message: "请填写预计发放费用日期",
            trigger: "blur",
          },
        ],
        mbPreIncome: [
          {
            required: true,
            message: "请填写预计单人所得金额",
            trigger: "blur",
          },
        ],
        mbIsConnect: [
          {
            required: true,
            message: "请选择是否存在劳动/劳务关系",
            trigger: "blur",
          },
        ],
        mbIsAuth: [
          {
            required: true,
            message: "请选择是否提供实名认证",
            trigger: "blur",
          },
        ],
        mbTasks: [{ required: true, message: "请添加任务", trigger: "blur" }],
      },
    };
  },
  mounted() {
    console.log(this.value);
  },
  methods: {
    onTasks() {
      let list = this.form.mbTasks;
      list.push({
        id: Symbol(),
        name: "",
        content: "",
        number: "",
        time: "",
        daily: "",
        device: "",
      });
      this.form.mbTasks = list;
    },
    onDelete(item) {
      console.log(item);
      let list = this.form.mbTasks;
      if (list.length == 1) {
        return this.$message.info("至少要填写一个任务");
      } else {
        let index = list.findIndex((v) => v.id == item.id);
        if (index > -1) {
          list = list.splice(index, 1);
        } else {
          return this.$message.info("删除失败");
        }
      }
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // this.onMcSave();
          if (this.value.mode == "system") {
            this.onSave();
          } else {
            this.onMcSave();
          }
          // console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 商户自己注册
    onMcSave() {
      let form = JSON.parse(JSON.stringify(this.value));

      form.mbServe = +form.mbServe;
      form.mbPreNumber = +form.mbPreNumber;
      form.mbPreIncome = +form.mbPreIncome;

      form.mbTasks = JSON.stringify(form.mbTasks);

      merchantEditBusiness({
        ...form,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功");
            this.$drawer.confirm(res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 管理员保存
    onSave() {
      let form = JSON.parse(JSON.stringify(this.value));

      form.mbServe = +form.mbServe;
      form.mbPreNumber = +form.mbPreNumber;
      form.mbPreIncome = +form.mbPreIncome;

      form.mbTasks = JSON.stringify(form.mbTasks);

      merchantBusiness({
        ...form,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功");
            this.$drawer.confirm(res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style lang="scss"></style>
