import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes2 = [
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard/index",
    name: "",
  },
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    name: "首页",
    meta: { title: "首页", icon: "" },
    children: [
      {
        path: "index",
        name: "数据",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "el-icon-school" },
      },
    ],
  },
  {
    path: "/merchant",
    component: Layout,
    redirect: "/merchant/index",
    name: "商户管理",
    meta: { title: "商户管理", icon: "el-icon-office-building" },
    children: [
      {
        path: "index",
        name: "商户列表",
        component: () => import("@/views/merchant/index"),
        meta: { title: "商户列表", icon: "el-icon-school" },
      },
      {
        path: "detail",
        name: "merchantDetail",
        hidden: true,
        component: () => import("@/views/merchant/detail"),
        meta: { title: "商户详情", icon: "el-icon-school" },
      },
      {
        path: "mine",
        name: "merchantMine",
        component: () => import("@/views/merchant/mine"),
        meta: { title: "我的详情", icon: "el-icon-school" },
      },
      {
        path: "join",
        name: "merchantJoin",
        component: () => import("@/views/merchant/join"),
        meta: { title: "商户入驻", icon: "el-icon-school" },
      },
    ],
  },
  {
    path: "/free",
    component: Layout,
    redirect: "/free/index",
    name: "自由者管理",
    meta: { title: "自由者管理", icon: "el-icon-coordinate" },
    children: [
      {
        path: "index",
        name: "用户列表",
        component: () => import("@/views/free/index"),
        meta: { title: "用户列表", icon: "el-icon-notebook-2" },
      },
      {
        path: "detail",
        name: "freeDetail",
        hidden: true,
        component: () => import("@/views/free/detail"),
        meta: { title: "用户详情", icon: "el-icon-notebook-2" },
      },
      {
        path: "contract",
        name: "contractList",
        component: () => import("@/views/free/contract"),
        meta: { title: "合同列表", icon: "el-icon-notebook-2" },
      },
    ],
  },

  {
    path: "/task",
    component: Layout,
    redirect: "/task/list",
    name: "任务管理",
    meta: { title: "任务管理", icon: "el-icon-document-copy" },
    children: [
      {
        path: "list",
        name: "taskList",
        component: () => import("@/views/task/list"),
        meta: { title: "任务列表", icon: "el-icon-tickets" },
      },
      {
        path: "publish",
        name: "taskPublish",
        component: () => import("@/views/task/publish"),
        meta: { title: "发布任务", icon: "el-icon-tickets" },
      },
    ],
  },
  // {
  //   path: "/agent",
  //   component: Layout,
  //   redirect: "/agent/index",
  //   name: "服务商管理",
  //   meta: { title: "服务商管理", icon: "el-icon-document-copy" },
  //   children: [
  //     {
  //       path: "index",
  //       name: "公告列表",
  //       component: () => import("@/views/agent/index"),
  //       meta: { title: "公告列表", icon: "el-icon-tickets" },
  //     },
  //     {
  //       path: "group",
  //       name: "模块管理",
  //       component: () => import("@/views/agent/index"),
  //       meta: { title: "模块管理", icon: "el-icon-tickets" },
  //     },
  //   ],
  // },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/admin",
    name: "系统设置",
    meta: { title: "系统设置", icon: "el-icon-setting" },
    children: [
      {
        path: "admin",
        name: "基础配置",
        component: () => import("@/views/system/admin"),
        meta: { title: "管理员列表", icon: "el-icon-mobile" },
      },
      {
        path: "role",
        name: "角色列表",
        component: () => import("@/views/system/role"),
        meta: { title: "角色列表", icon: "el-icon-mobile" },
      },
      {
        path: "menu",
        name: "菜单配置",
        component: () => import("@/views/system/menu"),
        meta: { title: "菜单配置", icon: "el-icon-mobile" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/mclogin",
    component: () => import("@/views/login/merchant"),
    hidden: true,
  },
  {
    path: "/cnlogin",
    component: () => import("@/views/login/channel"),
    hidden: true,
  },
  {
    path: "/regMerchant",
    component: () => import("@/views/merchant/join"),
    hidden: true,
    meta: { title: "商户注册", icon: "el-icon-school" },
  },

  // {
  //   path: "/404",
  //   component: () => import("@/views/404"),
  //   hidden: true,
  // },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard/index",
    name: "",
  },
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    name: "",
    children: [
      {
        path: "index",
        component: () => import("@/views/dashboard/index"),
        name: "",
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes2,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
