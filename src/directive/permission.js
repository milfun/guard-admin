import store from "@/store/index";

/**
 * v-permission: 功能权限指令
 * 在 main.js 中注册
 */
const permission = {
  name: "permission",
  inserted(el, binding, vnode, oldVnode) {
    const { value } = binding;
    // TODO 页面会在 store.getters.permission有数据之前更新完
    const permission = store.getters && store.getters.permission;
    if (value) {
      const permissionRoles = value;
      const hasPermission = permission.some((item) => {
        return permissionRoles == item.smName;
      });
      if (!hasPermission) {
        // el.style.display = 'none'
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need permission! Like v-permission="'test'"`);
    }
  },
};

export default permission;
