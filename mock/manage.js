const Mock = require("mockjs");

const userList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      time: "@datetime",
      name: "@cname",
      avatar: "http://wzdx.top/images/avatar/1.jpg",
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
      mobile: "15050002000",
    },
  ],
});

const taskList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      "status|1": ["0", "1"],
      name: "@cname",
      avatar: "http://wzdx.top/images/avatar/1.jpg",
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
      mobile: "15050002000",
    },
  ],
});

const adminList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      account: "@string",
      password: "@string",
      "status|1": ["0", "1"],
      name: "@cname",
      time: "@datetime",
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
    },
  ],
});

const couponList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      "cost|1-100.2": 1,
      "status|1": ["0", "1"],
      name: "@cname",
      time: "@datetime",
      "coupon|1": [
        "5元优惠券海院",
        "跑呗优惠券3元",
        "闽科优惠卷",
        "2元抵扣券",
        "1元抵扣券",
      ],
    },
  ],
});

const cashoutList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      "cost|1-100.2": 1,
      "status|1": ["0", "1"],
      "type|0-3": 1,
      name: "@cname",
      number: "@natural",
      time: "@datetime",
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
    },
  ],
});

const cashoutSchoolList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      "cost|1-100.2": 1,
      account: /\d{5,10}/,
      "status|1": ["0", "1"],
      name: "@cname",
      time: "@datetime",
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
    },
  ],
});

module.exports = [
  {
    url: "/api/user/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: userList.items,
      };
    },
  },
  {
    url: "/api/task/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: taskList.items,
      };
    },
  },
  {
    url: "/api/admin/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: adminList.items,
      };
    },
  },
  {
    url: "/api/coupon/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: couponList.items,
      };
    },
  },
  {
    url: "/api/cashout/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: cashoutList.items,
      };
    },
  },
  {
    url: "/api/cashout-college/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: cashoutSchoolList.items,
      };
    },
  },
];
