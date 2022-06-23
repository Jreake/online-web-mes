// 任务队列
export class RequestQueue {
	private maxLimit: number;
	private retry: number;
	private requestQueue: string[];
	private currentConcurrent: number;

	constructor(maxLimit = 5, retry = 2) {
		// 最大并发量
		this.maxLimit = maxLimit;
		// 重试次数
		this.retry = retry;
		// blocking queue 若当前请求并发量已经超过maxLimit，则将请求延迟到下某个任务完成，再执行该队列任务
		this.requestQueue = [];
		// 当前并发量数目
		this.currentConcurrent = 0;

		// 说明1：
		// 实际请求中，可能会异步的抛出多个error
		// 任务重试过程中，当catch到 error且 重试已到上限，会执行 next() 执行下一个任务，
		// 此时，如果有异常抛出前一个异步任务的，会无法捕获
		// 因此通过全局时间捕获剩余的异步异常
		process.on("unhandledRejection", function(e) {
			console.log(e);
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async run(request: () => any) {
		// 并发限制
		if (this.currentConcurrent >= this.maxLimit) {
			await this.startBlocking(); // 等待执行，直到某个任务执行this.next()
		}
		// 队列+1
		this.currentConcurrent++;

		// 设置队列中同一个任务尝试次数
		for (let retryCount = this.retry; retryCount > 0; retryCount--) {
			let done = false;
			console.log("[ retryCount ]:" + retryCount);
			try {
				// 这里与大佬的方法有不同，这里需要传入一个包装好请求的Promise实例，如有需要也可以用pify将请求转成promise
				const result = await request();
				// 执行成功则结束尝试
				done = true;
				return Promise.resolve(result);
				// 如果有错误，会被捕获，不会执行resolve
			} catch (error) {
				console.log("[ request error ] - " + error);
				// 最后一次重试失败时停止重试，返回报错
				if (retryCount === 1) {
					done = true;
					return Promise.reject(error); // 错误只会抛出一次
				}
			} finally {
				// 如果已经结束重试，执行请求队列的下一个任务
				if (done) {
					this.currentConcurrent--;
					this.next();
					// eslint-disable-next-line no-unsafe-finally
					break;
				}
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	next() {
		if (this.requestQueue.length <= 0) return;
		const resolve: any = this.requestQueue.shift();
		resolve(); // 取出block promise 的resolve 执行
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	startBlocking() {
		let _resolve;
		const promise2 = new Promise(resolve => (_resolve = resolve));
		this.requestQueue.push(_resolve);
		return promise2; // 返回block promise 用于暂停队列的执行
	}
}
