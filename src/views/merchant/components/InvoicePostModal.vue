<template>
  <div class="p16">
    <el-form ref="form" :model="value" label-width="100px">
      <el-form-item label="快递名称" prop="miPost">
        <el-input placeholder="请输入快递名称" v-model="value.miPost" />
      </el-form-item>
      <el-form-item label="快递单号" prop="miCode">
        <el-input placeholder="请输入快递单号" v-model="value.miCode" />
      </el-form-item>
      <el-form-item label="发票文件" prop="miStatus">
        <el-input placeholder="管理员未上传发票文件" v-model="value.miImage">
          <span
            class="text-primary"
            slot="append"
            @click="onDownLoad(value.miImage)"
          >
            下载文件</span
          >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="mr10" @click="onCancel"> 关闭 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    return {};
  },
  methods: {
    onCancel() {
      this.$modal.close();
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
