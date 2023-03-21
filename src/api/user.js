import request from "@/utils/request";

const api = {
  userLogin: "/api-admin/admin/login",
  userAdd: "/api-admin/admin/add",
  userList: "/api-admin/member/list",
  userDetail: "/api-admin/member/detail",
  userEdit: "/api-admin/member/edit",
  userDelete: "/api-admin/member/delete",
  userExport: "/api-admin/member/export",

  userEditCard: "/api-admin/member/editCard",
  userEditBank: "/api-admin/member/editBank",
  userDelBank: "/api-admin/member/delBank",
  userUpdateContract: "/api-admin/member/updateContract",
  userDownloadContract: "/api-admin/member/downloadContract",
};

// demo临时登录
export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data,
  });
}

export function userLogin(data) {
  return request({
    url: api.userLogin,
    method: "post",
    data,
  });
}
// 添加管理员
export function userAdd(data) {
  return request({
    url: api.userAdd,
    method: "post",
    data,
  });
}

export function userList(data) {
  return request({
    url: api.userList,
    method: "post",
    data,
  });
}

export function userDetail(data) {
  return request({
    url: api.userDetail,
    method: "post",
    data,
  });
}

export function userEdit(data) {
  return request({
    url: api.userEdit,
    method: "post",
    data,
  });
}
export function userDelete(data) {
  return request({
    url: api.userDelete,
    method: "post",
    data,
  });
}
export function userExport(data) {
  return request({
    url: api.userExport,
    method: "post",
    data,
  });
}

export function userEditCard(data) {
  return request({
    url: api.userEditCard,
    method: "post",
    data,
  });
}

export function userEditBank(data) {
  return request({
    url: api.userEditBank,
    method: "post",
    data,
  });
}
export function userDelBank(data) {
  return request({
    url: api.userDelBank,
    method: "post",
    data,
  });
}

export function userUpdateContract(data) {
  return request({
    url: api.userUpdateContract,
    method: "post",
    data,
  });
}

export function userDownloadContract(data) {
  return request({
    url: api.userDownloadContract,
    method: "post",
    data,
  });
}
