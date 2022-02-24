// 1、防抖
//出发高频时间内n秒内函数只会执行一次，如果n秒内高频时间再次触发，则重新计算时间
const debounce = (fn, time) => {
	let timeout = null;
	return function(timeout) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn.apply(arguments);
		}, time);
	};
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
	};
};

//获取对象所有的key值
const getKeys = (obj: any) => {
	if (Object.prototype.toString.call(obj) === "[object Object]") {
		let arr: any = [];
		(function getKeysFn(o, char) {
			for (let key in o) {
				let newChar = char == "" ? key : char + "." + key;
				if (Object.prototype.toString.call(o[key]) === "[object Object]") {
					getKeysFn(o[key], newChar);
				} else {
					arr.push(newChar);
				}
			}
		})(obj, "");
		return arr;
	} else {
		console.log("传入的不是一个真正的对象");
	}
};
