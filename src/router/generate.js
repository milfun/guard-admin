import { findMenu, canIUse } from "@/service/api/app.js";
import LoginLayout from "@/components/layout/LoginLayout.vue";
import IndexLayout from "@/components/layout/IndexLayout.vue";
import RouteView from "@/components/layout/RouteView.vue";
import DashboardWorkplace from "@/views/dashboard/Workplace";

// 前端路由表
const constantRouterComponents = {
  RouteView: RouteView,
  LoginLayout: LoginLayout,
  IndexLayout: IndexLayout,

  // 你需要动态引入的页面组件 TODO 等待优化成动态加载
  DashboardWorkplace: () => import("@/views/dashboard/Workplace"),
  DashboardMyCustom: () => import("@/views/dashboard/MyCustom.vue"),
  DashboardCommonCustom: () => import("@/views/dashboard/CommonCustom.vue"),
  DashboardMyOrder: () => import("@/views/dashboard/MyOrder.vue"),
  DashboardOrderList: () => import("@/views/dashboard/OrderList.vue"),
  UserApply: () => import("@/views/user/Apply.vue"),
  UserApplyDetail: () => import("@/views/user/ApplyDetail.vue"),
  UserCompany: () => import("@/views/user/Company.vue"),
  UserCompanyDetail: () => import("@/views/user/CompanyDetail.vue"),
  UserResume: () => import("@/views/user/Resume.vue"),
  UserPosition: () => import("@/views/user/Position.vue"),
  AuditPosition: () => import("@/views/audit/Position.vue"),
  AuditResume: () => import("@/views/audit/Resume.vue"),
  AuditApprove: () => import("@/views/audit/Approve.vue"),
  AuditAccount: () => import("@/views/audit/Account.vue"),
  AuditArticle: () => import("@/views/audit/Article.vue"),
  AuditComplain: () => import("@/views/audit/Complain.vue"),
  AuditCompany: () => import("@/views/audit/Company.vue"),
  MemberMembers: () => import("@/views/member/Members.vue"),
  MemberPost: () => import("@/views/member/Post.vue"),
  MemberGroup: () => import("@/views/member/Group.vue"),
  DatabaseCommon: () => import("@/views/database/Common.vue"),
  DatabaseTrade: () => import("@/views/database/Trade.vue"),
  DatabasePosition: () => import("@/views/database/Position.vue"),
  DatabaseAddress: () => import("@/views/database/Address.vue"),
  DatabaseLabel: () => import("@/views/database/Label.vue"),
  DatabaseAgreement: () => import("@/views/database/Agreement.vue"),
  DatabasePicture: () => import("@/views/database/Picture.vue"),
  DatabaseInterview: () => import("@/views/database/Interview.vue"),
  DatabaseSayhello: () => import("@/views/database/Sayhello.vue"),
  OptionInfo: () => import("@/views/options/Info.vue"),
  OptionApplyJob: () => import("@/views/options/ApplyJob.vue"),
  OptionApplyBoss: () => import("@/views/options/ApplyBoss.vue"),
  OptionApplyCompany: () => import("@/views/options/ApplyCompany.vue"),
  OptionAuthSet: () => import("@/views/options/AuthSet.vue"),
  SystemMerchantarea: () => import("@/views/system/Merchantarea.vue"),
  SystemBasics: () => import("@/views/system/Basics.vue"),
  SystemAccessory: () => import("@/views/system/Accessory.vue"),
  SystemSafety: () => import("@/views/system/Safety.vue"),
  SystemTransform: () => import("@/views/system/Transform.vue"),
  AuthSms: () => import("@/views/auth/Sms.vue"),
  InterfaceSms: () => import("@/views/interface/Sms.vue"),
  InterfaceEmail: () => import("@/views/interface/Email.vue"),
  InterfacePay: () => import("@/views/interface/Pay.vue"),
  InterfaceSave: () => import("@/views/interface/Save.vue"),
  InterfaceSecure: () => import("@/views/interface/Secure.vue"),
  InterfaceMessage: () => import("@/views/interface/Message.vue"),
  InterfaceMap: () => import("@/views/interface/Map.vue"),
  AppZhipin: () => import("@/views/App/Zhipin.vue"),
  AppSupin: () => import("@/views/App/Supin.vue"),
  AppFair: () => import("@/views/App/Fair.vue"),
  PushZhipin: () => import("@/views/push/Zhipin.vue"),
  PushSupin: () => import("@/views/push/Supin.vue"),
  PushFair: () => import("@/views/push/Fair.vue"),
  FinanceAsset: () => import("@/views/finance/Asset.vue"),
  FinanceOrder: () => import("@/views/finance/Order.vue"),
  FinanceInvoice: () => import("@/views/finance/Invoice.vue"),
  FinanceContract: () => import("@/views/finance/Contract.vue"),
  ArticleNotice: () => import("@/views/article/Notice.vue"),
  ArticleNews: () => import("@/views/article/News.vue"),
  ArticleShare: () => import("@/views/article/Share.vue"),
  MarketAsset: () => import("@/views/market/Asset.vue"),
  ProperZhipin: () => import("@/views/proper/Zhipin.vue"),
  ProperSupin: () => import("@/views/proper/Supin.vue"),
  ProperFair: () => import("@/views/proper/Fair.vue"),
  ComboZhipin: () => import("@/views/combo/Zhipin.vue"),
  ComboSupin: () => import("@/views/combo/Supin.vue"),
  ComboFair: () => import("@/views/combo/Fair.vue"),
  VipZhipin: () => import("@/views/vip/Zhipin.vue"),
  VipSupin: () => import("@/views/vip/Supin.vue"),
  VipFair: () => import("@/views/vip/Fair.vue"),
  ScoreZhipin: () => import("@/views/score/Zhipin.vue"),
  ScoreSupin: () => import("@/views/score/Supin.vue"),
  ScoreFair: () => import("@/views/score/Fair.vue"),
  CoinZhipin: () => import("@/views/coin/Zhipin.vue"),
  CoinSupin: () => import("@/views/coin/Supin.vue"),
  CoinFair: () => import("@/views/coin/Fair.vue"),
  CoinCoupon: () => import("@/views/coin/Coupon.vue"),
  ModuleIndex: () => import("@/views/module/Index.vue"),
  MarketingAdvertsConfig: () => import("@/views/marketing/AdvertsConfig.vue"),
  MarketingAdverts: () => import("@/views/marketing/Adverts.vue"),
  UserInterview: () => import("@/views/user/Interview.vue"),
  OptionsMiniApp: () => import("@/views/options/MiniApp.vue"),
  OptionsOfficial: () => import("@/views/options/Official.vue"),
  NoticeNotice: () => import("@/views/notice/Notice.vue"),
};

// 前端未找到页面路由
const notFoundRouter = {
  path: "*",
  redirect: "/404",
  hidden: true,
};

// 根级菜单
const rootRouter = {
  key: "",
  name: "index",
  path: "/",
  redirect: "/dashboard/Workplace",
  component: RouteView,
  meta: {
    title: "首页",
    sideBar: true,
  },
  children: [],
};

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    findMenu({})
      .then((res) => {
        // console.log('res', res)
        const result = res.data;
        const menuNav = [];
        const childrenNav = [];
        //      后端数据, 根级树数组,  根级 PID
        //      listToTree(result, childrenNav, 0)
        rootRouter.children = res.data;
        menuNav.push(rootRouter);
        const routers = generator(menuNav);
        routers.push(notFoundRouter);
        resolve(routers);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap) => {
  return routerMap.map((item) => {
    const { title, sideBar, permission } = item.meta || {};
    const currentRouter = {
      // 如果路由设置了 aasmLink，则作为默认 aasmLink
      id: item.aasmId,
      path: item.aasmLink || item.path,
      icon: item.aasmIcon || item.icon,
      name: item.aasmName || item.name || "",
      //component: (item.aasmComponent+"").indexOf("@") >= 0 ? (() => import(item.aasmComponent)):(constantRouterComponents[item.aasmComponent] || IndexLayout),
      // 该路由对应页面的 组件 :方案1
      component: constantRouterComponents[item.aasmComponent] || IndexLayout,

      // 该路由对应页面的 组件 :方案2 (动态加载)

      meta: {
        title: title,
        sideBar: sideBar,
        permission: permission, // 用来控制页面是否调用检查权限
      },
    };
    // 是否设置了隐藏菜单
    if (item.aasmIsshow == "0") {
      currentRouter.hidden = true;
    }

    if (item.aasmRemarks) {
      if (typeof item.aasmRemarks == "string") {
        let tmp = "";
        try {
          tmp = JSON.parse(item.aasmRemarks);
          Object.assign(currentRouter.meta, tmp);
        } catch (error) {}
      }
    }
    // 重定向
    item.aasmTarget && (currentRouter.redirect = item.aasmTarget);
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children);
    }
    return currentRouter;
  });
};

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  if (list != undefined && list.length > 0) {
    list.forEach((item) => {
      // 判断是否为父级菜单
      if (item.smPid == parentId) {
        const child = {
          ...item,
          key: item.aasmName,
          children: [],
        };
        // 迭代 list， 找到当前菜单相符合的所有子菜单
        listToTree(list, child.children, item.aasmId);
        // 删掉不存在 children 值的属性
        if (child.children.length <= 0) {
          delete child.children;
        }
        // 加入到树中
        tree.push(child);
      }
    });
  }
};
