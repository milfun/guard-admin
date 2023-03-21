import { readCache, writeCache } from "@/utils/index.js";
import { agentPublic } from "@/api/agent.js";

const getDefaultState = () => {
  return {
    user: {
      page: 0,
      limit: 10,
    },
    task: {
      page: 0,
      limit: 10,
    },
    userList: [],
    taskList: [],
    adminList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  // 公共数据
  agentPublic(s, { spSign, ...options }) {
    const key = `agentPublic:${spSign}`;

    // 1.读取缓存 如果有缓存直接返回
    let data = key ? readCache(key) : undefined;
    // console.log("readCache", data);
    if (data) {
      return Promise.resolve(data);
    }

    // 临时数据 直接赋值
    // if( spSign == ??) {
    //   return Promise.resolve([{},{},{}])
    // }
    // 2.无缓存读取服务器数据
    return agentPublic({ spSign }, options).then((res) => {
      // 3 数据缓存
      key && res.data && res.data.length && writeCache(key, res.data);
      return res.data;
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
