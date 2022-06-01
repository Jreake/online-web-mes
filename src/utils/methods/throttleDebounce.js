// 节流函数
function throttle(fn, delay) {
	// 利用闭包保存时间
	let prev = Data.now();
	return function() {
		let context = this;
		let arg = documents;
		let now = Date.now();
		if (now - prev >= delay) {
			fn.apply(context, arg);
			prev = Date.now();
		}
	};
}
function fn() {
	console.log("节流函数");
}
addEventListener("scroll", throttle(fn, 1000));

// 防抖函数
function debounce(dn, delay) {
	// 利用闭包保存定时器
	let timer = null;
	return function() {
		let context = this;
		let arg = arguments;
		// 在规定时间内再次触发会先清除定时器后再设定时器
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(context, arg);
		}, delay);
	};
}
function debounceFn() {
	console.log("防抖函数");
}
addEventListener("scroll", debounce(debounceFn, 10000));
