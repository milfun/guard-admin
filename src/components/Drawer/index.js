import events from "./events";
import Drawer from "./Drawer";

const api = {
  /**
   * open new tab on route fullPath
   * @param config
   */
  open: function (config) {
    events.$emit("open", config);
  },
  /**
   * close current page
   */
  closeCurrentPage: function () {
    this.close();
  },
  /**
   * open new tab on route fullPath
   * @param config
   */
  confirm: function (config) {
    events.$emit("confirm", config);
  },
  /**
   * close route fullPath tab
   * @param config
   */
  close: function (config) {
    events.$emit("close", config);
  },
};

Drawer.install = function (Vue, options) {
  if (Vue.prototype.$drawer) {
    return;
  }
  api.instance = events;
  Vue.prototype.$drawer = api;
  Vue.component("tc-drawer", Drawer);
};

export default Drawer;
