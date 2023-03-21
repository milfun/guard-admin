<template>
  <div class="p16">
    <el-form ref="form" :model="value" label-width="100px">
      <el-form-item label="开票项目" prop="mrType">
        <el-input placeholder="请输入开票项目" v-model="value.miType" />
      </el-form-item>

      <el-form-item label="开票金额" prop="miCoin">
        <el-input placeholder="请输入开票金额" v-model="value.miCoin">
          <span class="text-primary" slot="append"> (元)</span>
        </el-input>
      </el-form-item>

      <el-form-item label="发票类型" prop="miPaper">
        <el-radio-group v-model="value.miPaper" size="medium">
          <el-radio border :label="1">纸质发票</el-radio>
          <el-radio border :label="2">电子发票</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="审核不通过原因"
        prop="miReason"
        v-show="value.miStatus == 2"
      >
        <el-input placeholder="审核不通过原因" v-model="value.miReason" />
      </el-form-item>

      <el-form-item
        label="复核驳回原因"
        prop="miReason"
        v-show="value.miStatus == 6"
      >
        <el-input placeholder="复核驳回原因" v-model="value.miReadjust" />
      </el-form-item>

      <el-form-item label="快递名称" prop="miPost">
        <el-input placeholder="请输入快递名称" v-model="value.miPost" />
      </el-form-item>
      <el-form-item label="快递单号" prop="miCode">
        <el-input placeholder="请输入快递单号" v-model="value.miCode" />
      </el-form-item>
      <el-form-item label="发票文件" prop="miImage">
        <el-input placeholder="请上传发票文件" v-model="value.miImage">
          <span
            class="text-primary"
            slot="append"
            @click="onDownLoad(value.miImage)"
          >
            下载文件</span
          >
        </el-input>
        <el-upload
          class="upload-demo"
          name="file"
          :show-file-list="false"
          :headers="headers"
          :action="setting.uploadInvoiceUrl"
          :on-success="onUpload"
        >
          <span class="text-primary">{{
            value.miImage ? "重新上传" : "点击上传"
          }}</span>
          <span slot="tip" class="text-300 f12 ml20"
            >只能上传 zip,pdf,rar 格式的文件</span
          >
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button class="mr10" @click="onCancel"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { invoiceEdit } from "@/api/merchant";
import { getToken } from "@/utils/auth";
import setting from "@/settings.js";

export default {
  name: "Login",
  components: {
    // MobileLogin,
    // AccountLogin,
  },
  props: {
    value: Object,
  },
  watch: {
    value(val) {
      console.log(val);

      return val;
    },
  },
  data() {
    return {
      setting,
      fileList: [],
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  mounted() {
    // if (this.value) {
    //   this.value.miImage = this.value.miImage
    //     ? this.value.miImage.splice(",")
    //     : this.value.miImage;
    // }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.onSave();
          // console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 管理员保存
    onSave() {
      let value = JSON.parse(JSON.stringify(this.value));

      value.miCoin = +value.miCoin;
      value.miPaper = +value.miPaper;

      // return;
      invoiceEdit({
        miId: value.miId,
        miCoin: value.miCoin,
        miImage: value.miImage,
        miReason: value.miReason,
        miPost: value.miPost,
        miCode: value.miCode,
        miType: value.miType,
        miPaper: value.miPaper,
        miStatus: value.miStatus,
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
    onCancel() {
      this.$drawer.close();
    },
    onUpload(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.value.miImage = res.data;
      } else {
        this.$message.error(res.message || "失败，请重试");
      }
    },
    onDownLoad(url) {
      if (url) {
        window.open(url);
      } else {
        this.$message.error("url不能为空");
      }
    },
  },
};
</script>

<style lang="scss"></style>
