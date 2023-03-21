import { systemAdminList } from "@/api/system.js";
import { parseTime } from "@/utils/index.js";

const getDefaultState = () => {
  return {
    /* 分页数据 */
    adminPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    adminFilter: {
      smId: "", // 申请编号
      smName: "", // 证书编号
      smStatus: "", // 证书状态
    },
    adminList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 列表数据
  SET_ADMIN_LIST: (state, data) => {
    state.adminList = data;
  },
  // 修改页数
  EDIT_ADMIN_PAGE: (state, data) => {
    state.adminPage.page = data;
  },
  EDIT_ADMIN_TOTAL: (state, data) => {
    state.adminPage.total = data;
  },
};

const actions = {
  // get admin list
  getAdminList({ commit, state }) {
    let params = {};

    if (state.adminFilter.smId) {
      params.smId = +state.adminFilter.smId;
    }

    if (state.adminFilter.smName) {
      params.smName = state.adminFilter.smName;
    }
    if (state.adminFilter.smStatus) {
      params.smStatus = +state.adminFilter.smStatus;
    }

    return new Promise((resolve, reject) => {
      systemAdminList({
        page: state.adminPage.page,
        size: state.adminPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          data.map((item) => {
            return (item.smTime = parseTime(new Date(item.smTime)));
          });

          commit("SET_ADMIN_LIST", data);
          commit("EDIT_ADMIN_PAGE", page);
          commit("EDIT_ADMIN_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editAdminPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_ADMIN_PAGE", data);
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
