import request from "@/utils/request";

const api = {
  getContractList: "/api-admin/contract/list",
  updateContract: "/api-admin/contract/update",
  downloadContract: "/api-admin/contract/download",
};

export function getContractList(data) {
  return request({
    url: api.getContractList,
    method: "post",
    data,
  });
}
export function updateContract(data) {
  return request({
    url: api.updateContract,
    method: "post",
    data,
  });
}

export function downloadContract(data) {
  return request({
    url: api.downloadContract,
    method: "post",
    data,
  });
}
