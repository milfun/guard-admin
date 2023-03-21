import { systemRoleList, systemMenuList } from "@/api/system.js";
import { parseTime } from "@/utils/index.js";

const getDefaultState = () => {
  return {
    /* 分页数据 */
    rolePage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    roleFilter: {
      srId: "", // 申请编号
      srName: "", // 证书编号
      srStatus: "", // 证书状态
    },
    roleList: [],

    menuPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    menuFilter: {
      smId: "", // 申请编号
      smName: "", // 证书编号
      smStatus: "", // 证书状态
    },
    menuList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 列表数据
  SET_ROLE_LIST: (state, data) => {
    state.roleList = data;
  },
  // 修改页数
  EDIT_ROLE_PAGE: (state, data) => {
    state.rolePage.page = data;
  },
  EDIT_ROLE_TOTAL: (state, data) => {
    state.rolePage.total = data;
  },

  SET_MENU_LIST: (state, data) => {
    state.menuList = data;
  },
  // 修改页数
  EDIT_MENU_PAGE: (state, data) => {
    state.menuPage.page = data;
  },
  EDIT_MENU_TOTAL: (state, data) => {
    state.menuPage.total = data;
  },
};

const actions = {
  // get role list
  getRoleList({ commit, state }) {
    let params = {};

    if (state.roleFilter.srId) {
      params.srId = +state.roleFilter.srId;
    }

    if (state.roleFilter.srName) {
      params.srName = state.roleFilter.srName;
    }
    if (state.roleFilter.srStatus) {
      params.srStatus = +state.roleFilter.srStatus;
    }

    return new Promise((resolve, reject) => {
      systemRoleList({
        page: state.rolePage.page,
        size: state.rolePage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          // data.map((item) => {
          //   return (item.smTime = parseTime(new Date(item.smTime)));
          // });

          commit("SET_ROLE_LIST", data);
          commit("EDIT_ROLE_PAGE", page);
          commit("EDIT_ROLE_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editRolePage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_ROLE_PAGE", data);
      resolve();
    });
  },

  getMenuList({ commit, state }) {
    let params = {};

    if (state.menuFilter.smId) {
      params.smId = +state.menuFilter.smId;
    }

    if (state.menuFilter.smName) {
      params.smName = state.menuFilter.smName;
    }
    if (state.menuFilter.smStatus) {
      params.smStatus = +state.menuFilter.smStatus;
    }

    return new Promise((resolve, reject) => {
      systemMenuList({
        page: state.menuPage.page,
        size: state.menuPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          // data.map((item) => {
          //   return (item.smTime = parseTime(new Date(item.smTime)));
          // });

          commit("SET_MENU_LIST", data);
          commit("EDIT_MENU_PAGE", page);
          commit("EDIT_MENU_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editMenuPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_MENU_PAGE", data);
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
