import request from "@/utils/request";

const api = {
  channelLogin: "/api-admin/channel/login",
  channelCode: "/api-admin/channel/code",
  channelMobileLogin: "/api-admin/channel/mobilelogin",

  channelAll: "/api-admin/channel/all",
  channelAdd: "/api-admin/channel/add",
  channelBind: "/api-admin/channel/bind",
  channelEdit: "/api-admin/channel/edit",
  channelDelete: "/api-admin/channel/delete",
  channelPassword: "/api-admin/channel/password",
  channelList: "/api-admin/channel/list",
  channelLevel: "/api-admin/channel/level",
  channelPay: "/api-admin/channel/pay",
  channelInvoice: "/api-admin/channel/invoice",
};

export function channelLogin(data) {
  return request({
    url: api.channelLogin,
    method: "post",
    data,
  });
}
export function channelMobileLogin(data) {
  return request({
    url: api.channelMobileLogin,
    method: "post",
    data,
  });
}
export function channelCode(data) {
  return request({
    url: api.channelCode,
    method: "post",
    data,
  });
}
export function channelAll(data) {
  return request({
    url: api.channelAll,
    method: "post",
    data,
  });
}
export function channelAdd(data) {
  return request({
    url: api.channelAdd,
    method: "post",
    data,
  });
}
export function channelBind(data) {
  return request({
    url: api.channelBind,
    method: "post",
    data,
  });
}
export function channelEdit(data) {
  return request({
    url: api.channelEdit,
    method: "post",
    data,
  });
}
export function channelDelete(data) {
  return request({
    url: api.channelDelete,
    method: "post",
    data,
  });
}
export function channelPassword(data) {
  return request({
    url: api.channelPassword,
    method: "post",
    data,
  });
}

export function channelLevel(data) {
  return request({
    url: api.channelLevel,
    method: "post",
    data,
  });
}
export function channelList(data) {
  return request({
    url: api.channelList,
    method: "post",
    data,
  });
}
export function channelPay(data) {
  return request({
    url: api.channelPay,
    method: "post",
    data,
  });
}
export function channelInvoice(data) {
  return request({
    url: api.channelInvoice,
    method: "post",
    data,
  });
}
