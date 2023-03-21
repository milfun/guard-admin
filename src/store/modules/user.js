import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, userLogin, userList } from "@/api/user";
import {
  systemLogin,
  systemMobileLogin,
  systemGetUserInfo,
} from "@/api/system";
import { merchantLogin, merchantMobileLogin } from "@/api/merchant";
import { channelLogin, channelMobileLogin } from "@/api/channel";
import { resetRouter } from "@/router";
import storage from "store";

const getDefaultState = () => {
  return {
    token: getToken(),
    permission: [],
    user: "",
    name: "",
    avatar: "",
    /* 分页数据 */
    userPage: {
      page: 0, // 当前页
      size: 10, // 每页条数
      total: 0, // 总数据数
    },
    /* 筛选查询 条件 */
    userFilter: {
      mmId: "", // 申请编号
      mmName: "", // 证书编号
      mmMobile: "", // 证书编号
      mmStatus: "", // 证书状态
    },
    userList: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  // 列表数据
  SET_USER_LIST: (state, data) => {
    state.userList = data;
  },
  // 修改页数
  EDIT_USER_PAGE: (state, data) => {
    state.userPage.page = data;
  },
  EDIT_USER_TOTAL: (state, data) => {
    state.userPage.total = data;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, pwd } = userInfo;
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      // login({ name: mobile.trim(), pwd: pwd.trim() })
      // systemLogin({
      //   smMobile: mobile.trim(),
      //   smPassword: pwd.trim(),
      //   smCode: "",
      // })
      login({ name: "admin", pwd: "111111" })
        .then((response) => {
          const { data } = response;
          setToken(data.token);
          commit("SET_TOKEN", data.token);
          commit("SET_USER", data);
          storage.set("user", data);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  mobileLogin({ commit }, userInfo) {
    const { smMobile, smCode } = userInfo;
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      // login({ name: mobile.trim(), pwd: pwd.trim() })
      systemMobileLogin({
        smMobile: smMobile.trim(),
        smCode: smCode.trim(),
      })
        .then((response) => {
          const { data } = response;
          setToken(data.token);
          commit("SET_TOKEN", data.token);
          // commit("SET_USER", data);
          storage.set("user", data);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // merchant login
  mclogin({ commit }, userInfo) {
    const { mobile, pwd } = userInfo;
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      // login({ name: mobile.trim(), pwd: pwd.trim() })
      merchantLogin({
        smMobile: mobile.trim(),
        smPassword: pwd.trim(),
        // smCode: code.trim(),
      })
        .then((response) => {
          const { data } = response;
          setToken(data.token);
          commit("SET_TOKEN", data.token);
          // commit("SET_USER", data);
          storage.set("user", data);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  mcMobilelogin({ commit }, userInfo) {
    const { mobile, code } = userInfo;
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      // login({ name: mobile.trim(), pwd: pwd.trim() })
      merchantMobileLogin({
        smMobile: mobile.trim(),
        smCode: code.trim(),
      })
        .then((response) => {
          const { data } = response;
          setToken(data.token);
          commit("SET_TOKEN", data.token);
          // commit("SET_USER", data);
          storage.set("user", data);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // channel login
  cnlogin({ commit }, userInfo) {
    const { mobile, pwd } = userInfo;
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      // login({ name: mobile.trim(), pwd: pwd.trim() })
      channelLogin({
        cmMobile: mobile.trim(),
        cmPassword: pwd.trim(),
        // smCode: code.trim(),
      })
        .then((response) => {
          const { data } = response;
          setToken(data.token);
          commit("SET_TOKEN", data.token);
          // commit("SET_USER", data);
          storage.set("user", data);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  cnMobilelogin({ commit }, userInfo) {
    const { mobile, code } = userInfo;
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      // login({ name: mobile.trim(), pwd: pwd.trim() })
      channelMobileLogin({
        cmMobile: mobile.trim(),
        cmCode: code.trim(),
      })
        .then((response) => {
          const { data } = response;
          setToken(data.token);
          commit("SET_TOKEN", data.token);
          // commit("SET_USER", data);
          storage.set("user", data);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      systemGetUserInfo()
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("获取失败，请重新登录");
          }

          if (data.smId) {
            data.role = "admin";
            data.name = data.smName;
            commit("SET_USER", data);
            commit("SET_NAME", data.smName);
            commit("SET_AVATAR", data.smLogo);
          } else if (data.cmKey) {
            data.role = "channel";
            data.name = data.cmName;
            commit("SET_USER", data);
            commit("SET_NAME", data.cmName);
            commit("SET_AVATAR", data.cmLogo);
          } else {
            data.role = "merchant";
            data.name = data.mcName;
            commit("SET_USER", data);
            commit("SET_NAME", data.mcName);
            commit("SET_AVATAR", data.mcLogo);
          }

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setPermission({ commit }, permission) {
    commit("SET_PERMISSION", permission);
  },
  // canIuse: ({ commit }, val) => {
  //   canIUse(val).then((res) => {
  //     if (res.code == 200) {
  //       commit("SET_PERMISSION", res.data);
  //     } else {
  //       Message.error({
  //         content: res.msg,
  //       });
  //     }
  //   });
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },

  getUserList({ commit, state }) {
    let params = {};

    if (state.userFilter.mmId) {
      params.mmId = +state.userFilter.mmId;
    }

    if (state.userFilter.mmName) {
      params.mmName = state.userFilter.mmName;
    }
    if (state.userFilter.mmMobile) {
      params.mmMobile = state.userFilter.mmMobile;
    }
    if (state.userFilter.mmStatus) {
      params.mmStatus = +state.userFilter.mmStatus;
    }

    return new Promise((resolve, reject) => {
      userList({
        page: state.userPage.page,
        size: state.userPage.size,
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

          commit("SET_USER_LIST", data);
          commit("EDIT_USER_PAGE", page);
          commit("EDIT_USER_TOTAL", total);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editUserPage({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("EDIT_USER_PAGE", data);
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
