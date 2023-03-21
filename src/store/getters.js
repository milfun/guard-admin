const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  permission: (state) => state.user.permission,
  avatar: (state) => state.user.avatar,
  user: (state) => state.user.user,
  name: (state) => state.user.name,
  userList: (state) => state.manage.userList,

  adminList: (state) => state.admin.adminList,
  adminPage: (state) => state.admin.adminPage,
  adminFilter: (state) => state.admin.adminFilter,
  userList: (state) => state.user.userList,
  userPage: (state) => state.user.userPage,
  userFilter: (state) => state.user.userFilter,

  // new
  merchantList: (state) => state.merchant.merchantList,
  merchantPage: (state) => state.merchant.merchantPage,
  merchantFilter: (state) => state.merchant.merchantFilter,
  rechargeList: (state) => state.merchant.rechargeList,
  rechargePage: (state) => state.merchant.rechargePage,
  rechargeFilter: (state) => state.merchant.rechargeFilter,
  invoiceList: (state) => state.merchant.invoiceList,
  invoicePage: (state) => state.merchant.invoicePage,
  invoiceFilter: (state) => state.merchant.invoiceFilter,
  balanceList: (state) => state.merchant.balanceList,
  balancePage: (state) => state.merchant.balancePage,
  balanceFilter: (state) => state.merchant.balanceFilter,
  contractList: (state) => state.contract.contractList,
  contractPage: (state) => state.contract.contractPage,
  contractFilter: (state) => state.contract.contractFilter,
  taskList: (state) => state.task.taskList,
  taskPage: (state) => state.task.taskPage,
  taskFilter: (state) => state.task.taskFilter,
  taskReceiveList: (state) => state.task.taskReceiveList,
  taskReceivePage: (state) => state.task.taskReceivePage,
  taskReceiveFilter: (state) => state.task.taskReceiveFilter,
  taskFinishList: (state) => state.task.taskFinishList,
  taskFinishPage: (state) => state.task.taskFinishPage,
  taskFinishFilter: (state) => state.task.taskFinishFilter,
  taskPayList: (state) => state.task.taskPayList,
  taskPayPage: (state) => state.task.taskPayPage,
  taskPayFilter: (state) => state.task.taskPayFilter,
  taskSettleList: (state) => state.task.taskSettleList,
  taskSettlePage: (state) => state.task.taskSettlePage,
  taskSettleFilter: (state) => state.task.taskSettleFilter,
  taskSettleAllList: (state) => state.task.taskSettleAllList,
  taskSettleAllPage: (state) => state.task.taskSettleAllPage,
  taskSettleAllFilter: (state) => state.task.taskSettleAllFilter,
  roleList: (state) => state.system.roleList,
  rolePage: (state) => state.system.rolePage,
  roleFilter: (state) => state.system.roleFilter,
  menuList: (state) => state.system.menuList,
  menuPage: (state) => state.system.menuPage,
  menuFilter: (state) => state.system.menuFilter,
  channelList: (state) => state.channel.channelList,
  channelPage: (state) => state.channel.channelPage,
  channelFilter: (state) => state.channel.channelFilter,
};
export default getters;
