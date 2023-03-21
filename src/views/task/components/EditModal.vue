<template>
  <div class="p16">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="发包商户" prop="mcId">
        <el-input readonly disabled v-model="form.mcId" style="width: 420px" />
      </el-form-item>
      <el-form-item label="任务名称" prop="tmName">
        <el-input v-model="form.tmName" style="width: 420px" />
      </el-form-item>
      <el-form-item label="任务类型" prop="tmType">
        <!-- <el-cascader
          :show-all-levels="false"
          filterable
          style="width: 420px"
          v-model="form.tmType"
          :options="options"
          @change="onTmType"
        ></el-cascader> -->
        <el-input v-model="form.tmType" style="width: 420px" />
        <span class="text-200 ml20 f12">可输入关键词进行搜索</span>
      </el-form-item>
      <el-form-item label="任务内容" prop="tmDesc">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.tmDesc"
          maxlength="250"
          show-word-limit
          style="width: 420px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="任务标签" prop="tmLabel">
        <el-select
          v-model="form.tmLabel"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择任务标签"
          style="width: 420px"
        >
          <el-option label="学历不限" value="学历不限"> </el-option>
          <el-option label="经验不限" value="经验不限"> </el-option>
          <el-option label="年龄不限" value="年龄不限"> </el-option>
        </el-select>
        <span class="text-200 ml20 f12">可输入新的标签</span>
      </el-form-item>
      <el-form-item label="需要人数" prop="tmNumber">
        <el-input v-model="form.tmNumber" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="工作地址" prop="tmAddress">
        <el-input v-model="form.tmAddress" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写</span>
      </el-form-item>
      <el-form-item label="指定成员" prop="mcId">
        <el-input
          readonly
          disabled
          v-model="form.tmMember"
          style="width: 420px"
        />
      </el-form-item>
      <el-form-item label="工作日期" prop="tmStart">
        <el-date-picker
          type="date"
          placeholder="选择工作开始日期"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd"
          v-model="form.tmStart"
        ></el-date-picker>
        <span class="mx10">-</span>
        <el-date-picker
          type="date"
          placeholder="选择工作截止日期"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd"
          v-model="form.tmEnd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="工作时间" prop="tmTime">
        <el-input v-model="form.tmTime" style="width: 420px" />
        <span class="text-200 ml20 f12">* 请填写具体时间段</span>
      </el-form-item>
      <el-form-item label="发包单价" prop="mcRegMoney">
        <el-input v-model="form.tmCoin" style="width: 220px">
          <template slot="append">元</template>
        </el-input>
        <span class="mx10"></span>
        <el-select
          v-model="form.tmUnitName"
          placeholder="请选择单位"
          style="width: 120px"
        >
          <el-option label="天" value="天" />
          <el-option label="日" value="日" />
          <el-option label="时" value="时" />
          <el-option label="件" value="件" />
          <el-option label="月" value="月" />
        </el-select>
      </el-form-item>
      <el-form-item label="邀请码图片" prop="mcId">
        <el-input v-model="form.tmInvite" style="width: 420px" />
      </el-form-item>
    </el-form>

    <div class="flex just-end mt20">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定保存</el-button>
    </div>
  </div>
</template>

<script>
import { taskEdit } from "@/api/task.js";
// import { options } from "../test.js";
import { isArray } from "@/utils/validate.js";
export default {
  name: "EditModal",
  components: {
    // MobileLogin,
    // AccountLogin,
  },
  props: {
    value: Object,
  },
  mounted() {
    let value = JSON.parse(JSON.stringify(this.value));
    value.tmLabel = isArray(value.tmLabel)
      ? value.tmLabel
      : value.tmLabel.split(",");

    value.tmCoin = value.tmCoin / 100;
    this.form = value;
  },
  data() {
    return {
      // options,
      loading: false,
      disabled: false,
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        mcId: [{ required: true, message: "请选择发包商户", trigger: "blur" }],
        tmName: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur",
          },
        ],
        tmType: [
          {
            required: true,
            message: "请选择任务类型",
            trigger: "blur",
          },
        ],
        tmDesc: [
          { required: true, message: "请填写任务内容", trigger: "blur" },
        ],
        tmLabel: [
          { required: true, message: "请填写任务标签", trigger: "blur" },
        ],
        tmNumber: [
          { required: true, message: "请填写需要人数", trigger: "blur" },
        ],
        tmAddress: [
          { required: true, message: "请填写工作地址", trigger: "blur" },
        ],
        tmStart: [
          { required: true, message: "请选择工作开始时间", trigger: "blur" },
        ],
        tmEnd: [
          { required: true, message: "请选择工作截止时间", trigger: "blur" },
        ],
        tmTime: [
          { required: true, message: "请填写具体工作时间", trigger: "blur" },
        ],
        tmCoin: [
          { required: true, message: "请填写发包单价", trigger: "blur" },
        ],
        tmUnitName: [
          {
            required: true,
            message: "请选择发包单价的单位",
            trigger: "blur",
          },
        ],
      },
      merchantList: [], // 搜索商家结果
      memberList: [], // 搜索成员结果
      list: [],
    };
  },
  methods: {
    onTmType(v) {
      // console.log(v);
      this.form.tmType = v;
    },
    onSubmit() {
      // console.log(this.form);
      const { form } = this;

      form.mcId = isArray(form.mcId) ? form.mcId.join("") : form.mcId;
      form.tmCoin = +form.tmCoin;
      form.tmNumber = +form.tmNumber;
      form.tmLabel = isArray(form.tmLabel)
        ? form.tmLabel.join(",")
        : form.tmLabel;
      form.tmMember = isArray(form.tmMember)
        ? form.tmMember.join(",")
        : form.tmMember;
      form.tmMemberName = "";
      form.tmType = isArray(form.tmType)
        ? form.tmType[form.tmType.length - 1]
        : form.tmType;
      // console.log(form);
      // return;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.onEdit(form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onEdit(form) {
      this.disabled = true;
      taskEdit({
        ...form,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("保存成功，审核通过后即可展示在小程序中");
            this.$drawer.confirm(res.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
        .finally(() => {
          this.disabled = false;
        });
    },
    onClose() {
      this.$drawer.close();
    },
  },
};
</script>

<style>
.publish {
  width: 100%;
}
</style>
