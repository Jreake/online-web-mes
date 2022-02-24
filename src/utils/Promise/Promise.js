/**
 * 手动实现Promise
 * https://juejin.cn/post/6994594642280857630#heading-1
 *
 * 1、Promise是一个构造函数，自身上有all、reject、resolve方法，原型上有then、catch、all、race、
 *    addSettled、any等方法
 * 2、Promise的构造函数只接受一个参数（函数），这个函数传入两个参数：resolve和reject，resolve和reject分别
 * 		将Promise的状态修改为fullfiled、rejected
 *
 *
 *
 **/

class MyPromise {
	// 构造方法
	constructor(executor) {
		// 初始化值
		this.initValue();
		// 初始化this指向
		this.initBind();
		// 执行传进来的函数
		executor(this.resolve, this.reject);
		try {
			// 执行传进来的函数
			executor(this.resolve, this.reject);
		} catch (e) {
			// 捕捉错误直接执行
			this.reject(e);
		}
	}

	initBind() {
		// 初始化this
		this.resolve = this.resolve.bind(this);
		this.reject = this.reject.bind(this);
	}

	initValue() {
		// 初始化值
		this.PromiseResult = null; //终止
		this.PromiseState = "pending";
		// 保存成功回调
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];
	}

	resolve(value) {
		// state状态不可变
		if (this.PromiseState !== "pending") return;
		// 如果执行resolve,状态变为fulfilled
		this.PromiseState = "fulfilled";
		// 终止为传来的值
		this.PromiseResult = value;
		// 执行保存的成功回调
		while (this.onFulfilledCallbacks.length) {
			this.onFulfilledCallbacks.shift()(this.PromiseResult);
		}
	}

	reject(reason) {
		// state状态不可变
		if (this.PromiseState !== "pending") return;
		// 如果执行reject，状态修改为rejected
		this.PromiseState = "rejected";
		// 终止为传进来的reason
		this.PromiseResult = reason;
		// 执行保存失败的回调
		while (this.onRejectedCallbacks.length) {
			this.onRejectedCallbacks.shift()(this.PromiseResult);
		}
	}

	/**
	 * 1、then接收两个回调，一个是成功回调，一个是失败回调
		 当Promise状态为fulfilled执行成功回调，为rejected执行失败回调
		 如果resolve或reject在定时器里，则定时器结束后在执行then
		 then支持链式调用，下一次then执行受上一次then返回值的影响

	2、then方法本身返回一个新的Promise对象
			如果返回值是Promise对象，返回值为成功，新promise就是成功
			如果返回值是promise对象，返回值失败，新peomise就是失败
			如果返回值非promise对象，新promise对象是成功，值为此返回值
	 */
	then(onFulfilled, onRejected) {
		// 接收两个回调 onFulfilled, onRejected

		// 参数校验，确保一定是函数
		onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
		onRejected =
			typeof onRejected === "function"
				? onRejected
				: reason => {
						throw reason;
				  };
		/**
		 *
		 *
		 * 时间的态势的回馈活动凯撒
		 * 还是看i
		 * 根本无法将奖牌那个受炊具就i结果
		 * 我们不是第一次检修工像梦的，其实的那一个人相中的时候的没有想起
		 *
		 * 假如一个人的思想到了极致的时候会有很多的不入流，或者说是当一个人习惯了一个人的时候
		 * 我们将不会再生活中的去接受别惹的融入，其实很简单，我们在孤独的时候希望找到一个人来陪伴自己
		 *
		 */

		var thenPromise = new MyPromise((resolve, reject) => {
			const resolvePromise = cb => {
				setTimeout(() => {
					try {
						const x = cb(this.PromiseResult);
						if (x === thenPromise) {
							// 不能返回自身哦
							throw new Error("不能返回自身。。。");
						}
						if (x instanceof MyPromise) {
							// 如果返回值是Promise
							// 如果返回值是promise对象，返回值为成功，新promise就是成功
							// 如果返回值是promise对象，返回值为失败，新promise就是失败
							// 谁知道返回的promise是失败成功？只有then知道
							x.then(resolve, reject);
						} else {
							// 非Promise就直接成功
							resolve(x);
						}
					} catch (err) {
						// 处理报错
						reject(err);
					}
				});
			};

			if (this.PromiseState === "fulfilled") {
				// 如果当前为成功状态，执行第一个回调
				resolvePromise(onFulfilled);
			} else if (this.PromiseState === "rejected") {
				// 如果当前为失败状态，执行第二个回调
				resolvePromise(onRejected);
			} else if (this.PromiseState === "pending") {
				// 如果状态为待定状态，暂时保存两个回调
				// 如果状态为待定状态，暂时保存两个回调
				this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
				this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
			}
		});

		// 返回这个包装的Promise
		return thenPromise;
	}

	/**
	 * 1、all
	 *	接收一个Promise数组，数组中如有非Promise项，则此项当做成功
	 		如果有Promise都成功，则返回成功结果数组
			如果有一个Promise失败，则返回这个失败结果
	 *
	 */
	static all(promises) {
		const result = [];
		let count = 0;
		return new MyPromise((resolve, reject) => {
			const addData = (index, value) => {
				result[index] = value;
				count++;
				if (count === promises.length) resolve(result);
			};
			promises.forEach((promises, index) => {
				if (promises instanceof MyPromise) {
					promises.then(
						res => {
							addData(index, res);
						},
						err => {
							reject(err);
						}
					);
				} else {
					addData(index, promises);
				}
			});
		});
	}

	/**
	 * 2、race
	 * 那个Promise最快得到结果，就返回那个结果，无论成功失败
	 */
	static race(promises) {
		return new MyPromise((resolve, reject) => {
			promises.forEach(promises => {
				if (promises instanceof MyPromise) {
					promises.then(
						res => {
							resolve(res);
						},
						err => {
							reject(err);
						}
					);
				} else {
					resolve(promises);
				}
			});
		});
	}

	/**
	 * 3、addSettled
	 * 把每一个Promise结果集合成数组返回
	 */

	static addSettled(promises) {
		return new Promise((resolve, reject) => {
			const res = [];
			let count = 0;
			const addData = (status, value, i) => {
				res[i] = {
					status,
					value
				};
				count++;
				if (count === promises.length) {
					resolve(res);
				}
			};
			promises.forEach((promise, i) => {
				if (promise instanceof MyPromise) {
					Promise.then(
						res => {
							addData("fulfilled", res, i);
						},
						err => {
							addData("rejected", err, i);
						}
					);
				} else {
					addData("fulfilled", promise, i);
				}
			});
		});
	}

	/**
	 * 4、any  (方法和all相反)
	 * 如果有一个Promise成功，则返回成功结果
	 * 如果所有Promise都失败，则报错
	 *
	 */
	static any(promises) {
		return new Promise((resolve, reject) => {
			let count = 0;
			promises.forEatch(promise => {
				promises.then(
					val => {
						resolve(val);
					},
					err => {
						count++;
						if (count === promises.length) {
							reject(new AggregateError("ALL promises were rejected"));
						}
					}
				);
			});
		});
	}
}
// 测试
// const test1 = new MyPromise((resolve, reject) => {
// 	resolve("成功");
// 	reject("失败");
// });
// console.log(test1);

// const test2 = new MyPromise((resolve, reject) => {
// 	throw "失败";
// });
// console.log(test2);
// 输出 ”成功“
// const test = new MyPromise((resolve, reject) => {
// 	resolve("成功");
// }).then(
// 	res => console.log(res),
// 	err => console.log(err)
// );

// const p2 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('成功') // 1秒后输出 成功
// 	}, 1000)
// }).then(res => console.log(res), err => console.log(err))

const test3 = new MyPromise((resolve, reject) => {
	resolve(100); // 输出 状态：成功 值： 200
	// reject(100) // 输出 状态：失败 值：300
})
	.then(
		res => 2 * res,
		err => 3 * err
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);

const test4 = new MyPromise((resolve, reject) => {
	resolve(100); // 输出 状态：失败 值：200
	// reject(100) // 输出 状态：成功 值：300
	// 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
})
	.then(
		res => new MyPromise((resolve, reject) => reject(2 * res)),
		err => new MyPromise((resolve, reject) => resolve(2 * res))
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);
