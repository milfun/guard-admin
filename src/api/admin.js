import request from "@/utils/request";

const api = {
  adminList: "/api-admin/admin/list",
  adminAdd: "/api-admin/admin/add",
  adminEdit: "/api-admin/admin/edit",
};

export function adminList(data) {
  return request({
    url: api.adminList,
    method: "post",
    data,
  });
}
export function adminAdd(data) {
  return request({
    url: api.adminAdd,
    method: "post",
    data,
  });
}
export function adminEdit(data) {
  return request({
    url: api.adminEdit,
    method: "post",
    data,
  });
}
