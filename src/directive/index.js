import permission from "./permission";

export default {
  install(Vue, names = []) {
    if (!names.length) {
      Vue.directive(permission.name, permission);
    }
  },
};
