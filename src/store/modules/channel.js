import { channelList } from "@/api/channel.js";
import { parseTime } from "@/utils/index.js";

const getDefaultState = () => {
  return {
    /* 分页数据 */
    channelPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    channelFilter: {
      cmId: "", // 编号
      cmName: "", //
      cmStatus: "", // 状态
    },
    channelList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 列表数据
  SET_CHANNEL_LIST: (state, data) => {
    state.channelList = data;
  },
  // 修改页数
  EDIT_CHANNEL_PAGE: (state, data) => {
    state.channelPage.page = data;
  },
  EDIT_CHANNEL_TOTAL: (state, data) => {
    state.channelPage.total = data;
  },
};

const actions = {
  // get channel list
  getChannelList({ commit, state }) {
    let params = {};

    if (state.channelFilter.cmId) {
      params.cmId = +state.channelFilter.cmId;
    }

    if (state.channelFilter.cmName) {
      params.cmName = state.channelFilter.cmName;
    }
    if (state.channelFilter.cmStatus) {
      params.cmStatus = +state.channelFilter.cmStatus;
    }

    return new Promise((resolve, reject) => {
      channelList({
        page: state.channelPage.page,
        size: state.channelPage.size,
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

          commit("SET_CHANNEL_LIST", data);
          commit("EDIT_CHANNEL_PAGE", page);
          commit("EDIT_CHANNEL_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editChannelPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_CHANNEL_PAGE", data);
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
