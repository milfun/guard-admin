import axios from "axios";
import qs from "qs";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { VueAxios } from "./axios";

// create an axios instance
const request = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: "http://localhost:8888", // 本地、
  // baseURL: "http://flexi.milfun.cn", // 测试
  // baseURL: "http://kf.lanrongkj.com/api", // 线上
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
  // 由于axios默认数据格式是Request Payload，而并非Form Data，后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。
  // transformRequest: [
  //   function (data = {}) {
  //     // console.log(data);
  //     // 自动添加 aaId
  //     //    const aaKey = storage.get('Agent-Key') || setting.app.aaId
  //     //    if (aaKey && !data.aaId) {
  //     //
  //     //    }
  //     // if (store.getters.getAgentAaId) data.aaId = store.getters.getAgentAaId;
  //     // if (store.getters.getAgentProductType)
  //     //   data.productType = store.getters.getAgentProductType; //传递当前要设置的产品类型
  //     return qs.stringify(data);
  //   },
  // ],
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers["Authorization"] = "Bearer " + getToken();
    // }

    if (config.isForm) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // console.log(res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      if (res.code === 20103) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request);
  },
};

request.defaults.timeout = 60000;

export default request;

export { installer as VueAxios, request as axios };
