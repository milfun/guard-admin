import request from "@/utils/request";

const api = {
  labelList: "/api-admin/label/list",
  labelEdit: "/api-admin/label/edit",
  labelAdd: "/api-admin/label/add",
  labelUp: "/api-admin/label/up",
  labelDown: "/api-admin/label/down",
};

export function labelList(data) {
  return request({
    url: api.labelList,
    method: "post",
    data,
  });
}

export function labelEdit() {
  return request({
    url: api.labelEdit,
    method: "post",
  });
}

export function labelAdd() {
  return request({
    url: api.labelAdd,
    method: "post",
  });
}

export function labelUp(token) {
  return request({
    url: api.labelUp,
    method: "post",
    params: { token },
  });
}

export function labelDown(token) {
  return request({
    url: api.labelDown,
    method: "post",
    params: { token },
  });
}
