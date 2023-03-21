const Mock = require("mockjs");

const orderList = Mock.mock({
  "items|10": [
    {
      id: /\d{5,10}/,
      "college|1": ["福建师范大学闽南科技学院", "武夷学院", "三明学院"],
      "cost|1-100.2": 1,
      "pay|1-100.2": 1,
      username: "@cname",
      drivername: "@cname",
      "type||0-3": 1,
      "status|0-8": 1,
      number: "@natural",
      time: "@datetime",
    },
  ],
});

module.exports = [
  {
    url: "/api/order/list",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: orderList.items,
      };
    },
  },
];
