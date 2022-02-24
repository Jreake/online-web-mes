// 1、防抖
//出发高频时间内n秒内函数只会执行一次，如果n秒内高频时间再次触发，则重新计算时间
const debounce = (fn, time) => {
  let timeout = null;
  return function(timeout) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(arguments);
    }, time);
  }
};

const throttle = (fn, time) => {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(arguments);
      flag = true;
    }, time);
  }
}
