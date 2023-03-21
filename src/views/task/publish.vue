<template>
  <div class="p16">
    <div>
      <h2>发布任务</h2>
    </div>
    <el-card class="">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="发包商户" prop="mcId">
          <el-select
            v-model="form.mcId"
            value-key="value"
            multiple
            filterable
            remote
            reserve-keyword
            style="width: 420px"
            placeholder="请输入商户名称关键词搜索"
            :remote-method="onSearchMerchant"
            :loading="loading"
          >
            <el-option
              v-for="item in merchantList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="text-200 ml20 f12">可输入商户名称进行搜索</span>
        </el-form-item>
        <el-form-item label="任务名称" prop="tmName">
          <el-input v-model="form.tmName" style="width: 420px" />
        </el-form-item>
        <el-form-item label="任务类型" prop="tmType">
          <el-input v-model="form.tmType" style="width: 420px" />
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
        <el-form-item label="是否指定接单" prop="cmId">
          <el-radio-group v-model="form.tmIsMember" size="medium">
            <el-radio border :label="1">是</el-radio>
            <el-radio border :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="指定成员"
          prop="mcAddress"
          v-if="form.tmIsMember == 1"
        >
          <el-select
            v-model="form.tmMemberName"
            multiple
            filterable
            remote
            reserve-keyword
            style="width: 420px"
            placeholder="请输入成员名称进行搜索"
            :remote-method="onSearchMember"
            :loading="loading"
          >
            <el-option
              v-for="item in memberList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需要人数" prop="tmNumber">
          <el-input v-model="form.tmNumber" style="width: 420px" />
          <span class="text-200 ml20 f12">* 请填写</span>
        </el-form-item>
        <el-form-item label="工作地址" prop="tmAddress">
          <el-input v-model="form.tmAddress" style="width: 420px" />
          <span class="text-200 ml20 f12">* 请填写</span>
        </el-form-item>

        <el-form-item label="工作日期" prop="tmStart">
          <el-date-picker
            type="date"
            placeholder="选择工作开始日期"
            v-model="form.tmStart"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
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
        <el-form-item>
          <el-button type="primary" :disabled="disabled" @click="onSubmit"
            >保存设置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import MobileLogin from "./components/MobileLogin.vue";
// import AccountLogin from "./components/AccountLogin.vue";
import { merchantList } from "@/api/merchant.js";
import { userList } from "@/api/user.js";
import { taskPublish } from "@/api/task.js";
import validate from "./validate.js";
// import { options } from "./test.js";
import { isArray } from "@/utils/validate.js";

export default {
  name: "Login",
  components: {
    // MobileLogin,
    // AccountLogin,
  },
  data() {
    return {
      // options,
      loading: false,
      disabled: false,
      form: {
        mcId: "10010",
        tmName: "",
        tmType: "",
        tmDesc: "",
        tmLabel: "",
        tmIsMember: "", // 前端使用
        tmMember: "",
        tmMemberName: "", // 前端使用
        tmNumber: "",
        tmAddress: "",
        tmStart: "",
        tmEnd: "",
        tmTime: "",
        tmCoin: "",
        tmUnitName: "",
      },
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
    onSearchMerchant(query) {
      if (query !== "") {
        this.loading = true;
        // 发送请求
        merchantList({
          mcName: query,
        })
          .then((res) => {
            if (res.code == 200) {
              let data = res.data;
              if (isArray(res.data)) {
                data = data.map((it) => {
                  return {
                    label: it.mcName,
                    value: it.mcId,
                  };
                });

                this.merchantList = data;
                console.log(this.form.mcId);
              } else {
                this.merchantList = [
                  {
                    label: data.mcName,
                    value: data.mcId,
                  },
                ];
                // this.form.mcId = data.mcId;
              }
            }
          })
          .finally(() => {
            this.loading = false;
          });
        // setTimeout(() => {
        //   this.loading = false;
        //   this.merchantList = this.list.filter((item) => {
        //     return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
      } else {
        this.merchantList = [];
      }
    },
    onSearchMember(query) {
      if (query !== "") {
        this.loading = true;
        // 发送请求
        // 发送请求
        userList({
          mmName: query,
        })
          .then((res) => {
            if (res.code == 200) {
              let data = res.data;

              data = data.map((it) => {
                return {
                  label: it.mmName,
                  value: it.mmId,
                };
              });

              this.memberList = data;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.memberList = [];
      }
    },
    // onTmType(v) {
    //   // console.log(v);
    //   this.form.tmType = v;
    // },
    onSubmit() {
      // console.log(this.form);
      const { form } = this;

      form.mcId = isArray(form.mcId) ? form.mcId.join("") : form.mcId;
      form.tmCoin = form.tmCoin ? +form.tmCoin : 1;
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
          this.onPublish(form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onPublish(form) {
      this.disabled = true;
      taskPublish({
        ...form,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.info("发布成功，审核通过后即可展示在小程序中");
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
        .finally(() => {
          this.disabled = false;
        });
    },
  },
};
</script>

<style lang="scss"></style>
