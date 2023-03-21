import {
  taskList,
  taskReceiveList,
  taskFinishList,
  taskSettleList,
  taskSettleAll,
  taskPayList,
} from "@/api/task.js";

const getDefaultState = () => {
  return {
    /* 分页数据 */
    taskPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    taskFilter: {
      tmId: "", // 编号
      tmName: "",
      tmStatus: "",
    },
    taskList: [],

    // 接单列表
    taskReceivePage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    taskReceiveFilter: {
      trStatus: "",
      trType: 1,
      mmName: "",
    },
    taskReceiveList: [],

    //完成列表
    taskFinishPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    taskFinishFilter: {
      trType: 1,
    },
    taskFinishList: [],

    // 结算申请
    taskSettlePage: {
      page: 0, // 当前页
      size: 100, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    taskSettleFilter: {
      tsStatus: 1,
    },
    taskSettleList: [],

    // 明细列表
    taskSettleAllPage: {
      page: 0, // 当前页
      size: 100, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    taskSettleAllFilter: {
      tsStatus: 1,
      tsNo: "",
      tsCno: "",
      mcName: "",
      mmName: "",
    },
    taskSettleAllList: [],

    //付款列表
    taskPayPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    taskPayFilter: {
      tpStatus: 1,
      tpStart: "",
      tpEnd: "",
    },
    taskPayList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 列表数据
  SET_TASK_LIST: (state, data) => {
    state.taskList = data;
  },
  // 修改页数
  EDIT_TASK_PAGE: (state, data) => {
    state.taskPage.page = data;
  },
  EDIT_TASK_TOTAL: (state, data) => {
    state.taskPage.total = data;
  }, // 列表数据
  SET_TASKRECEIVE_LIST: (state, data) => {
    state.taskReceiveList = data;
  },
  EDIT_TASKRECEIVE_PAGE: (state, data) => {
    state.taskReceivePage.page = data;
  },
  EDIT_TASKRECEIVE_TOTAL: (state, data) => {
    state.taskReceivePage.total = data;
  },

  SET_TASKFINISH_LIST: (state, data) => {
    state.taskFinishList = data;
  },
  EDIT_TASKFINISH_PAGE: (state, data) => {
    state.taskFinishPage.page = data;
  },
  EDIT_TASKFINISH_TOTAL: (state, data) => {
    state.taskFinishPage.total = data;
  },
  EDIT_TASKFINISH_SIZE: (state, data) => {
    state.taskFinishPage.size = data;
  },

  SET_TASKPAY_LIST: (state, data) => {
    state.taskPayList = data;
  },
  EDIT_TASKPAY_PAGE: (state, data) => {
    state.taskPayPage.page = data;
  },
  EDIT_TASKPAY_TOTAL: (state, data) => {
    state.taskPayPage.total = data;
  },
  EDIT_TASKPAY_SIZE: (state, data) => {
    state.taskPayPage.size = data;
  },

  SET_TASKSETTLE_LIST: (state, data) => {
    state.taskSettleList = data;
  },
  EDIT_TASKSETTLE_PAGE: (state, data) => {
    state.taskSettlePage.page = data;
  },
  EDIT_TASKSETTLE_TOTAL: (state, data) => {
    state.taskSettlePage.total = data;
  },

  SET_TASKSETTLEALL_LIST: (state, data) => {
    state.taskSettleAllList = data;
  },
  EDIT_TASKSETTLEALL_PAGE: (state, data) => {
    state.taskSettleAllPage.page = data;
  },
  EDIT_TASKSETTLEALL_TOTAL: (state, data) => {
    state.taskSettleAllPage.total = data;
  },
};

const actions = {
  // get certificate list
  getTaskList({ commit, state }) {
    let params = {};

    if (state.taskFilter.tmId) {
      params.tmId = +state.taskFilter.tmId;
    }
    if (state.taskFilter.tmName) {
      params.tmName = state.taskFilter.tmName;
    }

    if (state.taskFilter.tmStatus || state.taskFilter.tmStatus === 0) {
      params.tmStatus = +state.taskFilter.tmStatus;
    }

    return new Promise((resolve, reject) => {
      taskList({
        page: state.taskPage.page,
        size: state.taskPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_TASK_LIST", data);
          commit("EDIT_TASK_PAGE", page);
          commit("EDIT_TASK_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editTaskPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASK_PAGE", data);
      resolve();
    });
  },
  getTaskReceiveList({ commit, state }) {
    let params = {};

    if (
      state.taskReceiveFilter.trStatus ||
      state.taskReceiveFilter.trStatus === 0
    ) {
      params.trStatus = +state.taskReceiveFilter.trStatus;
    }

    if (state.taskReceiveFilter.trType) {
      params.trType = state.taskReceiveFilter.trType;
    }

    return new Promise((resolve, reject) => {
      taskReceiveList({
        page: state.taskReceivePage.page,
        size: state.taskReceivePage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_TASKRECEIVE_LIST", data);
          commit("EDIT_TASKRECEIVE_PAGE", page);
          commit("EDIT_TASKRECEIVE_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editTaskReceivePage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKRECEIVE_PAGE", data);
      resolve();
    });
  },
  getTaskFinishList({ commit, state }) {
    let params = {};

    if (
      state.taskFinishFilter.trStatus ||
      state.taskFinishFilter.trStatus === 0
    ) {
      params.trStatus = +state.taskFinishFilter.trStatus;
    }

    if (state.taskFinishFilter.trType) {
      params.trType = state.taskFinishFilter.trType;
    }

    return new Promise((resolve, reject) => {
      taskFinishList({
        page: state.taskFinishPage.page,
        size: state.taskFinishPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_TASKFINISH_LIST", data);
          commit("EDIT_TASKFINISH_PAGE", page);
          commit("EDIT_TASKFINISH_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editTaskFinishPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKFINISH_PAGE", data);
      resolve();
    });
  },
  editTaskFinishPageSize({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKFINISH_SIZE", data);
      resolve();
    });
  },

  getTaskSettleList({ commit, state }) {
    let params = {};

    if (state.taskSettleFilter.tsStatus) {
      params.tsStatus = +state.taskSettleFilter.tsStatus;
    }

    return new Promise((resolve, reject) => {
      taskSettleList({
        page: state.taskSettlePage.page,
        size: state.taskSettlePage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_TASKSETTLE_LIST", data);
          commit("EDIT_TASKSETTLE_PAGE", page);
          commit("EDIT_TASKSETTLE_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editTaskSettlePage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKSETTLE_PAGE", data);
      resolve();
    });
  },
  getTaskSettleAllList({ commit, state }) {
    let params = {};

    if (state.taskSettleAllFilter.tsStatus) {
      params.tsStatus = +state.taskSettleAllFilter.tsStatus;
    }

    if (state.taskSettleAllFilter.tsNo) {
      params.tsNo = state.taskSettleAllFilter.tsNo;
    }

    if (state.taskSettleAllFilter.tsCno) {
      params.tsCno = state.taskSettleAllFilter.tsCno;
    }

    if (state.taskSettleAllFilter.mmName) {
      params.mmName = state.taskSettleAllFilter.mmName;
    }

    return new Promise((resolve, reject) => {
      taskSettleAll({
        page: state.taskSettleAllPage.page,
        size: state.taskSettleAllPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_TASKSETTLEALL_LIST", data);
          commit("EDIT_TASKSETTLEALL_PAGE", page);
          commit("EDIT_TASKSETTLEALL_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editTaskSettleAllPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKSETTLEALL_PAGE", data);
      resolve();
    });
  },
  getTaskPayList({ commit, state }) {
    let params = {};

    if (state.taskPayFilter.tpStatus || state.taskPayFilter.tpStatus === 0) {
      params.tpStatus = +state.taskPayFilter.tpStatus;
    }

    if (state.taskPayFilter.tpStart) {
      params.tpStart = state.taskPayFilter.tpStart;
    }

    if (state.taskPayFilter.tpEnd) {
      params.tpEnd = state.taskPayFilter.tpEnd;
    }

    return new Promise((resolve, reject) => {
      taskPayList({
        page: state.taskPayPage.page,
        size: state.taskPayPage.size,
        ...params,
      })
        .then((response) => {
          const { data, page, total } = response;

          if (!data) {
            return reject("Empty Data, please try again.");
          }

          commit("SET_TASKPAY_LIST", data);
          commit("EDIT_TASKPAY_PAGE", page);
          commit("EDIT_TASKPAY_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editTaskPayPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKPAY_PAGE", data);
      resolve();
    });
  },
  editTaskPayPageSize({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_TASKPAY_SIZE", data);
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
