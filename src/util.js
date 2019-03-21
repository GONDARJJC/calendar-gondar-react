const chunk = (arr, length) => {
  let res = [];
  for (let i = 0; i < arr.length; i += length) {
    res.push(arr.slice(i, i + length));
  }
  return res;
};

// 月份列表
const MonthList = [
  {
    value: 1,
    label: "一月",
    en_label: "January"
  },
  {
    value: 2,
    label: "二月",
    en_label: "February"
  },
  {
    value: 3,
    label: "三月",
    en_label: "March"
  },
  {
    value: 4,
    label: "四月",
    en_label: "April"
  },
  {
    value: 5,
    label: "五月",
    en_label: "May"
  },
  {
    value: 6,
    label: "六月",
    en_label: "June"
  },
  {
    value: 7,
    label: "七月",
    en_label: "July"
  },
  {
    value: 8,
    label: "八月",
    en_label: "August"
  },
  {
    value: 9,
    label: "九月",
    en_label: "September"
  },
  {
    value: 10,
    label: "十月",
    en_label: "October"
  },
  {
    value: 11,
    label: "十一月",
    en_label: "November"
  },
  {
    value: 12,
    label: "十二月",
    en_label: "December"
  }
];

// 获取年份列表
const getYearList = year => {
  const curYear = year % 10;
  const startYear = year - curYear - 1;
  const endYear = startYear + 11;
  let yearList = [];
  for (let i = startYear; i <= endYear; i++) {
    if (i === startYear) {
      yearList.push({
        value: i,
        label: i,
        year: "pre"
      });
    } else if (i === endYear) {
      yearList.push({
        value: i,
        label: i,
        year: "next"
      });
    } else {
      yearList.push({
        value: i,
        label: i,
        year: "cur"
      });
    }
  }
  return yearList;
};

// 获取每月第一天是周几
const dayStart = (month, year) => {
  var tmpDate = new Date(year, month, 1);
  return tmpDate.getDay();
};

// 获取每月的天数
const daysMonth = (month, year) => {
  var tmp = year % 4;
  if (tmp === 0) {
    return month_olympic[month];
  } else {
    return month_normal[month];
  }
};

const month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 获取日历
const getCalender = (InYear, InMonth) => {
  const year = InYear;
  let month = InMonth;
  if (month < 0) {
    month += 11;
  }
  let preMonth = month - 1;
  let preYear = InYear;
  if (preMonth < 0) {
    if (preMonth === -1) {
      preMonth += 12;
    } else {
      preMonth += 11;
    }
    preYear = year - 1;
  }

  const start = dayStart(month, year); // 开始的日期
  const daysTotal = daysMonth(month, year); // 这月有多长
  const preDaysTotal = daysMonth(preMonth, preYear); // 前一月一共多少天

  // 确定第一天的位置
  let one = 0;
  if (start < 7) {
    one = start;
  } else {
    one = 0;
  }

  // 月份的合集
  let res = [];
  for (let i = 1; i <= one; i++) {
    res = res.concat({
      day: preDaysTotal - one + i,
      month: "pre"
    });
  }
  for (let i = 1; i <= daysTotal; i++) {
    res = res.concat({
      day: i,
      month: "current"
    });
    one++;
    if (one === 7) {
      one = 0;
    }
  }
  for (let i = 1; i <= 7 - one; i++) {
    res = res.concat({
      day: i,
      month: "next"
    });
  }
  return res;
};

module.exports = {
  chunk,
  getCalender,
  getYearList,
  MonthList
};
