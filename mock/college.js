const Mock = require("mockjs");

const collegeList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
      "panelBenefit|1-100": 100,
      "schoolBenefit|1-100": 100,
      "marketBenefit|1-100": 100,
      "coupon|1": ["1元抵用券", "2元抵用券"],
      password: "@string",
    },
  ],
});

module.exports = [
  {
    url: "/api/college/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: collegeList.items,
      };
    },
  },
];
