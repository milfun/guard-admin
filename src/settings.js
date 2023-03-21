module.exports = {
  title: "灵活用工管理系统",

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  fileDownLoadUrl: "http://kf.lanrongkj.com/importReceiveDemo.xlsx",
  uploadUrl: "http://kf.lanrongkj.com/api/api-admin/merchant/invoiceUpload",
  uploadInvoiceUrl:
    "http://kf.lanrongkj.com/api/api-admin/merchant/invoiceUpload",
  // uploadUrl: "http://tbt.lanrongkj.com/api-user/cert/upload",
  // uploadUrl: "http://127.0.0.1:8888/api-admin/cert/upload", // 本地 ok
  // uploadUrl: "//am.lanrongkj.com/api/api-admin/cert/upload",

  storage: {
    timeout: 3600 * 24,
  },
};
