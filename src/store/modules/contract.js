import { getContractList } from "@/api/contract.js";

const getDefaultState = () => {
  return {
    /* 分页数据 */
    contractPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    contractFilter: {
      mcId: 0, // 编号
      mcStatus: "", // 类别
    },
    contractList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 列表数据
  SET_CONTRACT_LIST: (state, data) => {
    state.contractList = data;
  },
  // 修改页数
  EDIT_CONTRACT_PAGE: (state, data) => {
    state.contractPage.page = data;
  },
  EDIT_CONTRACT_TOTAL: (state, data) => {
    state.contractPage.total = data;
  },
};

const actions = {
  // get certificate list
  getContractList({ commit, state }) {
    let params = {};

    if (state.contractFilter.mcId) {
      params.mcId = +state.contractFilter.mcId;
    }

    if (state.contractFilter.mcStatus || state.contractFilter.mcStatus === 0) {
      params.mcStatus = +state.contractFilter.mcStatus;
    }

    return new Promise((resolve, reject) => {
      getContractList({
        page: state.contractPage.page,
        size: state.contractPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_CONTRACT_LIST", data);
          commit("EDIT_CONTRACT_PAGE", page);
          commit("EDIT_CONTRACT_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editcontractPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_CONTRACT_PAGE", data);
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
