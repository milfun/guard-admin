<template>
  <div class="flex flex-col item-center text-center">
    <el-image
      style="width: 100px; height: 100px"
      :src="value.url"
      :preview-src-list="[value.url]"
    >
    </el-image>

    <div>
      <span class="f14 text-200">用户扫码后直接加入您的商户</span>
    </div>

    <div class="flex just-end mt20">
      <el-button @click="onClose">我知道了</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
  },
  methods: {
    onClose() {
      this.$modal.close();
    },
  },
};
</script>

<style></style>
