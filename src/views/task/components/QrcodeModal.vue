<template>
  <div class="flex flex-col item-center text-center">
    <div>
      <el-image
        style="width: 100px; height: 100px"
        :src="value.url"
        :preview-src-list="[value.url]"
      >
      </el-image>
    </div>

    <div class="mt10">
      <span class="f14 text-200"
        >用户扫码后即可领取任务,请右键图片另存到本地</span
      >
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
