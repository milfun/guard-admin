import storage from "store";
import config from "@/settings.js";

const cache = {};

export function formatDate(
  date,
  format = "YYYY-MM-DD hh:mm:ss",
  emptyValue = ""
) {
  if (typeof date === "string" && date.length < 9) return date;
  if (!date) return emptyValue;
  if (!(date instanceof Date))
    date = new Date(
      typeof date === "number" ? date : date.replace(/-|\./g, "/") || 0
    );
  const weeks = ["日", "一", "二", "三", "四", "五", "六"];
  const W = "周" + weeks[date.getDay()];
  let AW = "";
  if (format.indexOf("AW") > -1) {
    const now = new Date();
    const nowDay = now.getFullYear() + now.getMonth() + now.getDate();
    const dateDay = date.getFullYear() + date.getMonth() + date.getDate();
    AW =
      {
        "-2": "后天",
        "-1": "明天",
        0: "今天",
        1: "昨天",
        2: "前天",
      }[(nowDay - dateDay).toString()] || W;
  }
  const YYYY = date.getFullYear(),
    YY = YYYY.toString().slice(2),
    M = date.getMonth() + 1,
    MM = M < 10 ? `0${M}` : M,
    D = date.getDate(),
    DD = D < 10 ? `0${D}` : D,
    H = date.getHours(),
    HH = H < 10 ? `0${H}` : H,
    m = date.getMinutes(),
    mm = m < 10 ? `0${m}` : m,
    S = date.getSeconds(),
    SS = S < 10 ? `0${S}` : S;

  format = format
    .replace("MM", MM)
    .replace("M", M)
    .replace("mm", mm)
    .replace("m", m);

  format = format.toLocaleUpperCase();

  format = format
    .replace("AW", AW)
    .replace("W", W)
    .replace("YYYY", YYYY)
    .replace("YY", YY)
    .replace("DD", DD)
    .replace("D", D)
    .replace("HH", HH)
    .replace("H", H)
    .replace("SS", SS)
    .replace("S", S);
  return format;
}
// 格式化小数 四舍襦伍
export function formatFloat(num, d = 2) {
  return parseFloat(
    (Math.round(num * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
  );
} // 格式化小数 不四舍襦伍
export function formatFloatNo(num, d = 2) {
  return Math.floor(num * 100) / 100;
}

//dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
export function getDate(dates) {
  var dd = new Date();
  var n = dates || 0;
  dd.setDate(dd.getDate() + n);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  var day = y + "-" + m + "-" + d;
  return day;
}

//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周。 getMonday("s",1)  //得到下周一的yyyy-mm-dd格式日期 getMonday("e",1)  //得到下周日的yyyy-mm-dd格式日期
export function getMonday(type, dates) {
  var now = new Date();
  var nowTime = now.getTime();
  var day = now.getDay();
  var longTime = 24 * 60 * 60 * 1000;
  var n = longTime * 7 * (dates || 0);
  if (type == "s") {
    var dd = nowTime - (day - 1) * longTime + n;
  }
  if (type == "e") {
    var dd = nowTime + (7 - day) * longTime + n;
  }
  dd = new Date(dd);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  var day = y + "-" + m + "-" + d;
  return day;
}

// 得到本月、上月、下月的起始、结束日期。getMonth(type,months)  //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月 。 getMonth("s",1)  //得到下月第一天的yyyy-mm-dd格式日期 。getMonth("e",1)  //得到下月最后一天的yyyy-mm-dd格式日期
export function getMonth(type, months) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  }
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + months;
    }
  }
  month = month < 10 ? "0" + month : month;
  var date = d.getDate();
  var firstday = year + "-" + month + "-" + "01";
  var lastday = "";
  if (
    month == "01" ||
    month == "03" ||
    month == "05" ||
    month == "07" ||
    month == "08" ||
    month == "10" ||
    month == "12"
  ) {
    lastday = year + "-" + month + "-" + 31;
  } else if (month == "02") {
    if (
      (year % 4 == 0 && year % 100 != 0) ||
      (year % 100 == 0 && year % 400 == 0)
    ) {
      lastday = year + "-" + month + "-" + 29;
    } else {
      lastday = year + "-" + month + "-" + 28;
    }
  } else {
    lastday = year + "-" + month + "-" + 30;
  }
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  }
  return day;
}

// 得到今年、去年、明年的开始、结束日期。getYear(type,dates)  //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表今年，-1代表去年，1代表明年。getYear("s",1)  //得到明年第一天的yyyy-mm-dd格式日期。getYear("e",1)  //得到明年最后一天的yyyy-mm-dd格式日期
export function getYear(type, dates) {
  var dd = new Date();
  var n = dates || 0;
  var year = dd.getFullYear() + Number(n);
  if (type == "s") {
    var day = year + "-01-01";
  }
  if (type == "e") {
    var day = year + "-12-31";
  }
  if (!type) {
    var day = year + "-01-01/" + year + "-12-31";
  }
  return day;
}

/**
 * 通用读缓存方法
 * @param key
 * @returns {*}
 */
export function readCache(key) {
  // 1.读动态缓存
  let data = cache[key];

  // 2.读本地缓存
  if (!data) {
    const _data = storage.get(key);
    if (_data) {
      // 2.1 判断缓存是否过期
      if (_data.time + config.storage.timeout > Date.now()) {
        data = _data.data;
        cache[key] = data;
      } else {
        // 2.2 过期删除本地缓存
        storage.remove(key);
      }
    }
  }
  return data;
}

/**
 * 通用写缓存方法
 * @param key
 * @param data
 */
export function writeCache(key, data) {
  storage.set(key, { time: Date.now(), data });
  cache[key] = data;
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

export function throttle(fn, delay = 200) {
  let timer = 0;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 透传 this和参数
      timer = 0;
    }, delay);
  };
}
