import request from "@/utils/request";

const api = {
  agentPublic: "/api-admin/system/public",
};

// 公共标签
export function agentPublic(data) {
  return request({
    url: api.agentPublic,
    method: "post",
    data,
  });
}
