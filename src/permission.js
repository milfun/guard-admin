import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import { systemGetMenus } from "@/api/system.js";
/* Layout */
import Layout from "@/layout";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/mclogin", "/cnlogin", "/regMerchant"]; // no redirect whitelist

// 数组转树形
const listToTree = (list, tree, parentId) => {
  if (list != undefined && list.length > 0) {
    list.forEach((item) => {
      // 判断是否为父级菜单
      if (item.smPid == parentId) {
        const child = {
          ...item,
          key: item.smName,
          children: [],
        };
        // 迭代 list， 找到当前菜单相符合的所有子菜单
        listToTree(list, child.children, item.smId);
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

const componentMap = {
  // DashboardWorkplace: () => import("@/views/dashboard/Workplace"),
  merchantIndex: () => import("@/views/merchant/index"),
  merchantDetail: () => import("@/views/merchant/detail"),
  merchantMine: () => import("@/views/merchant/mine"),
  merchantJoin: () => import("@/views/merchant/join"),
  merchantRecharge: () => import("@/views/merchant/recharge"),
  merchantInvoice: () => import("@/views/merchant/invoice"),
  merchantWallet: () => import("@/views/merchant/wallet"), // 商户自己看
  merchantBalance: () => import("@/views/merchant/balance"), // 管理员看
  freeIndex: () => import("@/views/free/index"),
  freeDetail: () => import("@/views/free/detail"),
  contractList: () => import("@/views/free/contract"),
  taskList: () => import("@/views/task/list"),
  taskPublish: () => import("@/views/task/publish"),
  taskReceive: () => import("@/views/task/receive"),
  taskFinish: () => import("@/views/task/finish"),
  taskSettle: () => import("@/views/task/settle"),
  taskOrder: () => import("@/views/task/order"),
  taskPay: () => import("@/views/task/pay"),
  systemAdmin: () => import("@/views/system/admin"),
  systemRole: () => import("@/views/system/role"),
  systemMenu: () => import("@/views/system/menu"),

  channelIndex: () => import("@/views/channel/index"),
  channelMerchant: () => import("@/views/channel/merchant"),
  channelPay: () => import("@/views/channel/pay"),
};

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  /********** */
  // next();
  // return;
  /********** */
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (
      to.path === "/login" ||
      to.path === "/mclogin" ||
      to.path === "/cnlogin"
    ) {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (!hasGetUserInfo) {
        try {
          // get user info
          await store.dispatch("user/getInfo");

          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }

      next();
      /******************* */
      // 否则
      // 判断是否已经加载路由或者是否要访问白名单内的页面
      // if (
      //   router.options.isAddDynamicMenuRoutes ||
      //   whiteList.indexOf(to.path) !== -1
      // ) {
      //   next();
      // } else {
      //   // 获取用户权限信息及菜单列表
      //   systemGetMenus({})
      //     .then((res) => {
      //       // console.log(res);
      //       let menuList = res.data;
      //       let permission = [];
      //       // 将数据转化成路由结构
      //       menuList.map((item) => {
      //         if (item.smPid === 0) {
      //           item.component = Layout;
      //           item.children = [];
      //         } else {
      //           item.component = componentMap[item.smComponent];
      //         }
      //         item.meta = {
      //           title: item.smTitle,
      //           icon: item.smIcon,
      //         };
      //         item.path = item.smPath;
      //         item.name = item.smName;
      //         item.hidden = item.smHidden === 1;
      //         item.redirect = item.smRedirect;

      //         if (item.smType == 2) {
      //           // 按钮权限
      //           permission.push(item);
      //         }
      //       });

      //       // 保存 按钮 权限
      //       store.dispatch("user/setPermission", permission);
      //       // console.log(menuList);
      //       menuList = menuList.filter((item) => item.smType === 1);

      //       // 将路由转换成父子结构
      //       const tree = [];
      //       menuList = listToTree(menuList, tree, 0);
      //       // console.log(tree);
      //       // menuList = menuList.filter((item) => {
      //       //   return item.children;
      //       // });
      //       // 在添加完动态路由之后再添加404路由，以防止页面在匹配动态路由之前先匹配404
      //       tree.push({ path: "*", redirect: "/404", hidden: true });
      //       router.options.isAddDynamicMenuRoutes = true;
      //       router.addRoutes(tree);
      //       // this.$router不是响应式的，所以手动将路由元注入路由对象
      //       router.options.routes.push(...tree);
      //       // 下面这个我也不知道为什么要加，但是我知道不加刷新就会404😅
      //       // if (from.name == null) {
      //       //   next(to);
      //       // } else {
      //       //   next();
      //       // }
      //       // hack method to ensure that addRoutes is complete
      //       // set the replace: true, so the navigation will not leave a history record
      //       next({ ...to, replace: true });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       next(`/mclogin?redirect=${to.path}`); // 可以
      //       // next(to.path); // 尝试
      //     });
      // }
      /******************* */
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/mclogin?redirect=${to.path}`); // 可以
      next(); // 尝试
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
