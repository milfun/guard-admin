import request from "@/utils/request";

const api = {
  // 管理员操作
  merchantList: "/api-admin/merchant/list",
  merchantDetail: "/api-admin/merchant/detail",
  merchantBase: "/api-admin/merchant/base",
  merchantBusiness: "/api-admin/merchant/business",
  merchantTax: "/api-admin/merchant/tax",
  merchantAdd: "/api-admin/merchant/add",
  merchantDelete: "/api-admin/merchant/delete",
  merchantRecharge: "/api-admin/merchant/recharge",
  rechargeList: "/api-admin/merchant/rechargeList",
  merchantInvoice: "/api-admin/merchant/invoice",
  invoiceApply: "/api-admin/merchant/applyInvoice",
  invoiceList: "/api-admin/merchant/invoiceList",
  invoiceEdit: "/api-admin/merchant/invoiceEdit",
  invoiceDetail: "/api-admin/merchant/invoiceDetail",
  invoiceUpload: "/api-admin/merchant/invoiceUpload",
  balanceList: "/api-admin/merchant/balanceList", // 钱包列表
  balanceAdjust: "/api-admin/merchant/balanceAdjust", // 钱包调整

  // 商户操作
  merchantLogin: "/api-admin/merchant/login",
  merchantCode: "/api-admin/merchant/code",
  merchantMobileLogin: "/api-admin/merchant/mobilelogin",
  merchantMine: "/api-admin/merchant/mine",
  merchantAddBase: "/api-admin/merchant/addBase",
  merchantAddBusiness: "/api-admin/merchant/addBusiness",
  merchantAddTax: "/api-admin/merchant/addTax",
  merchantEditBase: "/api-admin/merchant/editBase",
  merchantEditBusiness: "/api-admin/merchant/editBusiness",
  merchantEditTax: "/api-admin/merchant/editTax",
  merchantInviteQrcode: "/api-admin/merchant/inviteQrcode",
  merchantChangePwd: "/api-admin/merchant/changePwd",
  merchantBalanceDetail: "/api-admin/merchant/balance",
  merchantBalanceLogList: "/api-admin/merchant/balanceLogList", // 记录
};

export function merchantLogin(data) {
  return request({
    url: api.merchantLogin,
    method: "post",
    data,
  });
}
export function merchantMobileLogin(data) {
  return request({
    url: api.merchantMobileLogin,
    method: "post",
    data,
  });
}
export function merchantCode(data) {
  return request({
    url: api.merchantCode,
    method: "post",
    data,
  });
}
export function merchantMine(data) {
  return request({
    url: api.merchantMine,
    method: "post",
    data,
  });
}
export function merchantList(data) {
  return request({
    url: api.merchantList,
    method: "post",
    data,
  });
}
export function merchantDetail(data) {
  return request({
    url: api.merchantDetail,
    method: "post",
    data,
  });
}
export function merchantBase(data) {
  return request({
    url: api.merchantBase,
    method: "post",
    data,
  });
}
export function merchantBusiness(data) {
  return request({
    url: api.merchantBusiness,
    method: "post",
    data,
  });
}
export function merchantTax(data) {
  return request({
    url: api.merchantTax,
    method: "post",
    data,
  });
}
export function merchantAdd(data) {
  return request({
    url: api.merchantAdd,
    method: "post",
    data,
  });
}
export function merchantDelete(data) {
  return request({
    url: api.merchantDelete,
    method: "post",
    data,
  });
}
export function merchantRecharge(data) {
  return request({
    url: api.merchantRecharge,
    method: "post",
    data,
  });
}
export function rechargeList(data) {
  return request({
    url: api.rechargeList,
    method: "post",
    data,
  });
}
export function invoiceApply(data) {
  return request({
    url: api.invoiceApply,
    method: "post",
    data,
  });
}
export function merchantInvoice(data) {
  return request({
    url: api.merchantInvoice,
    method: "post",
    data,
  });
}
export function invoiceList(data) {
  return request({
    url: api.invoiceList,
    method: "post",
    data,
  });
}
export function invoiceEdit(data) {
  return request({
    url: api.invoiceEdit,
    method: "post",
    data,
  });
}
export function invoiceDetail(data) {
  return request({
    url: api.invoiceDetail,
    method: "post",
    data,
  });
}
export function invoiceUpload(data) {
  return request({
    url: api.invoiceUpload,
    method: "post",
    data,
  });
}
export function merchantAddBase(data) {
  return request({
    url: api.merchantAddBase,
    method: "post",
    data,
  });
}
export function merchantAddBusiness(data) {
  return request({
    url: api.merchantAddBusiness,
    method: "post",
    data,
  });
}
export function merchantAddTax(data) {
  return request({
    url: api.merchantAddTax,
    method: "post",
    data,
  });
}
export function merchantEditBase(data) {
  return request({
    url: api.merchantEditBase,
    method: "post",
    data,
  });
}
export function merchantEditBusiness(data) {
  return request({
    url: api.merchantEditBusiness,
    method: "post",
    data,
  });
}
export function merchantEditTax(data) {
  return request({
    url: api.merchantEditTax,
    method: "post",
    data,
  });
}
export function merchantInviteQrcode(data) {
  return request({
    url: api.merchantInviteQrcode,
    method: "post",
    data,
  });
}
export function merchantChangePwd(data) {
  return request({
    url: api.merchantChangePwd,
    method: "post",
    data,
  });
}
export function merchantBalanceDetail(data) {
  return request({
    url: api.merchantBalanceDetail,
    method: "post",
    data,
  });
}

export function balanceList(data) {
  return request({
    url: api.balanceList,
    method: "post",
    data,
  });
}

export function balanceAdjust(data) {
  return request({
    url: api.balanceAdjust,
    method: "post",
    data,
  });
}

export function merchantBalanceLogList(data) {
  return request({
    url: api.merchantBalanceLogList,
    method: "post",
    data,
  });
}
