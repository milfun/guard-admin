<template>
  <div>
    <el-dialog
      :title="config.title"
      :visible="visible"
      :width="config.width"
      @cancel="onClose"
      :destroy-on-close="true"
      :modal="true"
      :show-close="false"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="_body">
        <component
          :style="{ height: config.height }"
          :is="config.component"
          :data="config.data"
          :value="config.value"
          v-bind="config.attrs"
          v-on="config.listeners"
          @close="onClose"
          @callback="config.callback ? config.callback : () => {}"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import config from '@/config/setting'
import events from "./events";

export default {
  name: "Modal",
  components: {},
  data() {
    return {
      config: {
        title: " ",
        height: "auto",
        callback: () => {}, // 回调函数，默认为空
        attrs: {},
        listeners: {},
        value: {}, // 传递的参数放在这里
      },
      visible: false,
    };
  },
  created() {
    // bind event
    events
      .$on("open", (val) => {
        this.onOpen(val);
      })
      .$on("close", (val) => {
        // console.log("close");
        this.onClose();
      })
      .$on("confirm", (val) => {
        // console.log("confirm");
        this.onConfirm(val);
      });
  },
  methods: {
    /**
     * title： 标题
     * width: 宽度
     * component: 引用的组件
     * callback： 回调方法
     */
    onOpen(val) {
      Object.assign(this.config, val);
      this.visible = true;
      return new Promise((resolve, reject) => {
        this.config = val;
        this.visible = true;

        this.resolve = resolve;
        this.reject = reject;
      }).catch((err) => {});
    },
    /**
     * 将数据回调给调用的页面，调用时需传入 callback方法
     */
    onConfirm(val) {
      this.config.callback(val);
      this.visible = false;
      this.resolve && this.resolve(val) && (this.resolve = undefined);
    },
    // 关闭tab
    onClose(index) {
      this.visible = false;
      this.reject && this.reject() && (this.reject = undefined);
    },
    handleClose(done) {
      (this.config = {
        title: " ",
        height: "auto",
        callback: () => {}, // 回调函数，默认为空
        attrs: {},
        listeners: {},
        value: {}, // 传递的参数放在这里
      }),
        // this.$destroy();
        done();
    },
  },
};
</script>

<style lang="scss" scoped>
// ._body {
//   border-radius: 0 0 14px 14px;
//   overflow: hidden;
// }
</style>
