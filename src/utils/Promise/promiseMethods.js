function PromiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			throw newTypeErroe("promise must be an array");
		}
		let result = [];
		promises.forEach((promise, index) => {
			promise.then(
				res => {
					result[index] = res;
					resolve(result);
				},
				err => {
					reject(err);
				}
			);
		});
	});
}

Promise.prototype.finally = function(callback) {
	return this.then(
		function(value) {
			return Promise.resolve(callback()).then(function() {
				return value;
			});
		},
		function(err) {
			return Promise.resolve(callback()).then(function() {
				throw err;
			});
		}
	);
};

Promise.race = function(promiseArr) {
	return new Promise((resolve, reject) => {
		promiseArr.forEach(p => {
			Promise.resolve(p).then(
				val => {
					resolve(val);
				},
				err => {
					reject(err);
				}
			);
		});
	});
};

function allSettled(promiseArr) {
	if (promiseArr.length === 0) return Promise.resolve([]);

	const _promiseArr = promiseArr.map(item =>
		item instanceof Promise ? item : Promise.resolve(item)
	);

	return new Promise((resolve, reject) => {
		const result = [];
		let unSettledPromiseCount = _promiseArr.length;
		_promiseArr.forEach((promise, index) => {
			promise.then(
				value => {
					result[index] = {
						status: "fulfilled",
						value
					};
					unSettledPromiseCount -= 1;
					if (unSettledPromiseCount === 0) {
						resolve(result);
					}
				},
				reason => {
					result[index] = {
						status: "rejected",
						reason
					};

					unSettledPromiseCount -= 1;
					if (unSettledPromiseCount === 0) {
						resolve(result);
					}
				}
			);
		});
	});
}
