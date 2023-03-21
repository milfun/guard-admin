import request from "@/utils/request";

const api = {
  systemLogin: "/api-admin/system/login",
  systemCode: "/api-admin/system/code",
  systemMobileLogin: "/api-admin/system/mobilelogin",
  systemGetUserInfo: "/api-admin/system/userinfo", // 获取登录用户信息
  systemGetMenus: "/api-admin/system/menus", // 根据角色权限
  systemMenuList: "/api-admin/system/menuList", // 分页 所有菜单
  systemAllMenu: "/api-admin/system/allMenu", // 所有菜单
  systemAdminList: "/api-admin/system/adminList",
  systemRoleList: "/api-admin/system/roleList",
  systemEditAdmin: "/api-admin/system/editAdmin",
  systemEditPwd: "/api-admin/system/editPwd",
  systemAddAdmin: "/api-admin/system/addAdmin",
  systemAddRole: "/api-admin/system/addRole",
  systemEditRole: "/api-admin/system/editRole",
  systemAddMenu: "/api-admin/system/addMenu",
  systemEditMenu: "/api-admin/system/editMenu",
  systemDelMenu: "/api-admin/system/delMenu",
  systemDelAdmin: "/api-admin/system/delAdmin",
  systemDelRole: "/api-admin/system/delRole",
  systemCallback: "/api-admin/system/xftpayback",
};

export function systemCallback(data) {
  return request({
    url: api.systemCallback,
    method: "post",
    data,
  });
}
export function systemLogin(data) {
  return request({
    url: api.systemLogin,
    method: "post",
    data,
  });
}
export function systemCode(data) {
  return request({
    url: api.systemCode,
    method: "post",
    data,
  });
}
export function systemMobileLogin(data) {
  return request({
    url: api.systemMobileLogin,
    method: "post",
    data,
  });
}
export function systemGetUserInfo(data) {
  return request({
    url: api.systemGetUserInfo,
    method: "post",
    data,
  });
}

export function systemGetMenus(data) {
  return request({
    url: api.systemGetMenus,
    method: "post",
    data,
  });
}

export function systemMenuList(data) {
  return request({
    url: api.systemMenuList,
    method: "post",
    data,
  });
}
export function systemAllMenu(data) {
  return request({
    url: api.systemAllMenu,
    method: "post",
    data,
  });
}

export function systemAdminList(data) {
  return request({
    url: api.systemAdminList,
    method: "post",
    data,
  });
}

export function systemRoleList(data) {
  return request({
    url: api.systemRoleList,
    method: "post",
    data,
  });
}

export function systemEditAdmin(data) {
  return request({
    url: api.systemEditAdmin,
    method: "post",
    data,
  });
}
export function systemEditPwd(data) {
  return request({
    url: api.systemEditPwd,
    method: "post",
    data,
  });
}
export function systemAddAdmin(data) {
  return request({
    url: api.systemAddAdmin,
    method: "post",
    data,
  });
}

export function systemEditRole(data) {
  return request({
    url: api.systemEditRole,
    method: "post",
    data,
  });
}
export function systemAddRole(data) {
  return request({
    url: api.systemAddRole,
    method: "post",
    data,
  });
}

export function systemEditMenu(data) {
  return request({
    url: api.systemEditMenu,
    method: "post",
    data,
  });
}
export function systemAddMenu(data) {
  return request({
    url: api.systemAddMenu,
    method: "post",
    data,
  });
}
export function systemDelAdmin(data) {
  return request({
    url: api.systemDelAdmin,
    method: "post",
    data,
  });
}
export function systemDelMenu(data) {
  return request({
    url: api.systemDelMenu,
    method: "post",
    data,
  });
}
export function systemDelRole(data) {
  return request({
    url: api.systemDelRole,
    method: "post",
    data,
  });
}
