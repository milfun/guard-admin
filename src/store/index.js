import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";

// new
import merchant from "./modules/merchant";
import contract from "./modules/contract";
import task from "./modules/task";
import system from "./modules/system";

// import certificate from "./modules/certificate";
import user from "./modules/user";
import agent from "./modules/agent";
import admin from "./modules/admin";
import channel from "./modules/channel";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,

    merchant,
    contract,
    task,
    user,
    system,

    agent,
    admin,
    channel,
  },
  getters,
});

export default store;
