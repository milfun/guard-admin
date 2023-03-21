import request from "@/utils/request";

const api = {
  taskList: "/api-admin/task/list",
  taskDetail: "/api-admin/task/detail",
  taskReceiveList: "/api-admin/task/receiveList",
  taskReceiveDetail: "/api-admin/task/receiveDetail",
  taskFinishList: "/api-admin/task/finishList",
  taskFinishReceive: "/api-admin/task/finishReceive",
  taskFinishDetail: "/api-admin/task/finishDetail",
  taskReceiveEdit: "/api-admin/task/receiveEdit",
  taskReceiveImport: "/api-admin/task/receiveImport",
  taskReceiveDelete: "/api-admin/task/receiveDel",
  taskReceiveDeleteArr: "/api-admin/task/receiveDelArr",
  taskPublish: "/api-admin/task/publish",
  taskAdjust: "/api-admin/task/adjust",
  taskEdit: "/api-admin/task/edit",
  taskInviteQrcode: "/api-admin/task/inviteQrcode",

  taskPay: "/api-admin/task/payCoin",
  test: "/api-admin/task/test",

  taskSettleQuitCoin: "/api-admin/task/quitCoin",
  taskSettleCostCoin: "/api-admin/task/costCoin",
  taskSettleXftDetail: "/api-admin/task/xftDetail",
  taskSettleXftDesc: "/api-admin/task/xftDesc",

  taskSettleList: "/api-admin/task/settleList",
  taskSettleEdit: "/api-admin/task/settleEdit",
  taskSettleApply: "/api-admin/task/settleApply",
  taskSettleAdjust: "/api-admin/task/settleAdjust",
  taskSettleOrder: "/api-admin/task/settleOrder",
  taskSettleDel: "/api-admin/task/settleDelete",
  taskSettleDetail: "/api-admin/task/settleDetail",
  taskSettleAll: "/api-admin/task/settleAll",
  taskSettleExport: "/api-admin/task/settleExport",

  taskPayList: "/api-admin/task/payList",
};

export function test(data) {
  return request({
    url: api.test,
    method: "post",
    data,
  });
}
export function taskPay(data) {
  return request({
    url: api.taskPay,
    method: "post",
    data,
  });
}
export function taskList(data) {
  return request({
    url: api.taskList,
    method: "post",
    data,
  });
}
export function taskDetail(data) {
  return request({
    url: api.taskDetail,
    method: "post",
    data,
  });
}
export function taskReceiveList(data) {
  return request({
    url: api.taskReceiveList,
    method: "post",
    data,
  });
}
export function taskReceiveDetail(data) {
  return request({
    url: api.taskReceiveDetail,
    method: "post",
    data,
  });
}
export function taskFinishList(data) {
  return request({
    url: api.taskFinishList,
    method: "post",
    data,
  });
}
export function taskFinishReceive(data) {
  return request({
    url: api.taskFinishReceive,
    method: "post",
    data,
  });
}
export function taskFinishDetail(data) {
  return request({
    url: api.taskFinishDetail,
    method: "post",
    data,
  });
}
export function taskPayList(data) {
  return request({
    url: api.taskPayList,
    method: "post",
    data,
  });
}
export function taskReceiveEdit(data) {
  return request({
    url: api.taskReceiveEdit,
    method: "post",
    data,
  });
}
export function taskPublish(data) {
  return request({
    url: api.taskPublish,
    method: "post",
    data,
  });
}

export function taskAdjust(data) {
  return request({
    url: api.taskAdjust,
    method: "post",
    data,
  });
}

export function taskEdit(data) {
  return request({
    url: api.taskEdit,
    method: "post",
    data,
  });
}

export function taskSettleList(data) {
  return request({
    url: api.taskSettleList,
    method: "post",
    data,
  });
}

export function taskSettleEdit(data) {
  return request({
    url: api.taskSettleEdit,
    method: "post",
    data,
  });
}

export function taskSettleApply(data) {
  return request({
    url: api.taskSettleApply,
    method: "post",
    data,
  });
}

export function taskSettleAdjust(data) {
  return request({
    url: api.taskSettleAdjust,
    method: "post",
    data,
  });
}

export function taskSettleOrder(data) {
  return request({
    url: api.taskSettleOrder,
    method: "post",
    data,
  });
}

export function taskSettleDel(data) {
  return request({
    url: api.taskSettleDel,
    method: "post",
    data,
  });
}

export function taskReceiveImport(data) {
  return request({
    url: api.taskReceiveImport,
    method: "post",
    data,
  });
}
export function taskReceiveDelete(data) {
  return request({
    url: api.taskReceiveDelete,
    method: "post",
    data,
  });
}
export function taskReceiveDeleteArr(data) {
  return request({
    url: api.taskReceiveDeleteArr,
    method: "post",
    data,
  });
}
export function taskSettleDetail(data) {
  return request({
    url: api.taskSettleDetail,
    method: "post",
    data,
  });
}
export function taskSettleAll(data) {
  return request({
    url: api.taskSettleAll,
    method: "post",
    data,
  });
}
export function taskSettleExport(data) {
  return request({
    url: api.taskSettleExport,
    method: "post",
    data,
  });
}

export function taskInviteQrcode(data) {
  return request({
    url: api.taskInviteQrcode,
    method: "post",
    data,
  });
}

export function taskSettleQuitCoin(data) {
  return request({
    url: api.taskSettleQuitCoin,
    method: "post",
    data,
  });
}

export function taskSettleCostCoin(data) {
  return request({
    url: api.taskSettleCostCoin,
    method: "post",
    data,
  });
}
export function taskSettleXftDetail(data) {
  return request({
    url: api.taskSettleXftDetail,
    method: "post",
    data,
  });
}

export function taskSettleXftDesc(data) {
  return request({
    url: api.taskSettleXftDesc,
    method: "post",
    data,
  });
}
