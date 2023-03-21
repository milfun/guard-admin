import {
  merchantList,
  rechargeList,
  invoiceList,
  balanceList,
} from "@/api/merchant.js";
// import { parseTime } from "@/utils/index.js";

const getDefaultState = () => {
  return {
    /* 分页数据 */
    merchantPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    merchantFilter: {
      mcId: "", // 编号
      mcName: "", // 类别
      mcCode: "", // 状态
      mcStart: "",
      mcEnd: "", //
    },
    merchantList: [],
    merchantTypeList: [],

    rechargePage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    rechargeFilter: {
      mrNo: "", // 类别
      mcId: "", // 类别
      mrStatus: "", // 类别
    },
    rechargeList: [],

    invoicePage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    invoiceFilter: {
      mcId: "", // 类别
      miStatus: "", // 类别
      mcName: "", // 类别
    },
    invoiceList: [],

    balancePage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    balanceFilter: {
      mcId: "", // 类别
      mbStatus: "", // 类别
    },
    balanceList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 列表数据
  SET_MERCHANT_LIST: (state, data) => {
    state.merchantList = data;
  }, // 分类模块数据
  SET_MERCHANTTYPE_LIST: (state, data) => {
    state.merchantTypeList = data;
  },
  // 修改页数
  EDIT_MERCHANT_PAGE: (state, data) => {
    state.merchantPage.page = data;
  },
  EDIT_MERCHANT_TOTAL: (state, data) => {
    state.merchantPage.total = data;
  },

  SET_RECHARGE_LIST: (state, data) => {
    state.rechargeList = data;
  },
  EDIT_RECHARGE_PAGE: (state, data) => {
    state.rechargePage.page = data;
  },
  EDIT_RECHARGE_TOTAL: (state, data) => {
    state.rechargePage.total = data;
  },

  SET_INVOICE_LIST: (state, data) => {
    state.invoiceList = data;
  },
  EDIT_INVOICE_PAGE: (state, data) => {
    state.invoicePage.page = data;
  },
  EDIT_INVOICE_TOTAL: (state, data) => {
    state.invoicePage.total = data;
  },
  SET_BALANCE_LIST: (state, data) => {
    state.balanceList = data;
  },
  EDIT_BALANCE_PAGE: (state, data) => {
    state.balancePage.page = data;
  },
  EDIT_BALANCE_TOTAL: (state, data) => {
    state.balancePage.total = data;
  },
};

const actions = {
  // get certificate list
  getMerchantList({ commit, state }) {
    let params = {};

    if (state.merchantFilter.mcId) {
      params.mcId = +state.merchantFilter.mcId;
    }

    if (state.merchantFilter.mcName) {
      params.mcName = state.merchantFilter.mcName;
    }
    if (state.merchantFilter.mcCode) {
      params.mcCode = +state.merchantFilter.mcCode;
    }
    if (state.merchantFilter.mcStart) {
      params.mcStart = +state.merchantFilter.mcStart;
    }
    if (state.merchantFilter.mcEnd) {
      params.mcEnd = state.merchantFilter.mcEnd;
    }
    return new Promise((resolve, reject) => {
      merchantList({
        page: state.merchantPage.page,
        size: state.merchantPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          // data.map((item) => {
          //   return (item.nmTime = parseTime(new Date(item.nmTime)));
          // });

          commit("SET_MERCHANT_LIST", data);
          commit("EDIT_MERCHANT_PAGE", page);
          commit("EDIT_MERCHANT_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editMerchantPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_MERCHANT_PAGE", data);
      resolve();
    });
  },
  getRechargeList({ commit, state }) {
    let params = {};

    if (state.rechargeFilter.mrNo) {
      params.mrNo = +state.rechargeFilter.mrNo;
    }
    if (state.rechargeFilter.mcId) {
      params.mcId = +state.rechargeFilter.mcId;
    }
    if (state.rechargeFilter.mrStatus) {
      params.mrStatus = +state.rechargeFilter.mrStatus;
    }

    return new Promise((resolve, reject) => {
      rechargeList({
        page: state.rechargePage.page,
        size: state.rechargePage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_RECHARGE_LIST", data);
          commit("EDIT_RECHARGE_PAGE", page);
          commit("EDIT_RECHARGE_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editRechargePage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_RECHARGE_PAGE", data);
      resolve();
    });
  },

  getInvoiceList({ commit, state }) {
    let params = {};

    if (state.invoiceFilter.mcId) {
      params.mcId = +state.invoiceFilter.mcId;
    }
    if (state.invoiceFilter.miStatus) {
      params.miStatus = +state.invoiceFilter.miStatus;
    }
    if (state.invoiceFilter.mcName) {
      params.mcName = state.invoiceFilter.mcName;
    }

    return new Promise((resolve, reject) => {
      invoiceList({
        page: state.invoicePage.page,
        size: state.invoicePage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_INVOICE_LIST", data);
          commit("EDIT_INVOICE_PAGE", page);
          commit("EDIT_INVOICE_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editInvoicePage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_INVOICE_PAGE", data);
      resolve();
    });
  },
  getBalanceList({ commit, state }) {
    let params = {};

    if (state.balanceFilter.mcId) {
      params.mcId = state.balanceFilter.mcId;
    }
    if (state.balanceFilter.mbStatus) {
      params.mbStatus = +state.balanceFilter.mbStatus;
    }

    return new Promise((resolve, reject) => {
      balanceList({
        page: state.balancePage.page,
        size: state.balancePage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_BALANCE_LIST", data);
          commit("EDIT_BALANCE_PAGE", page);
          commit("EDIT_BALANCE_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editBalancePage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_BALANCE_PAGE", data);
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
