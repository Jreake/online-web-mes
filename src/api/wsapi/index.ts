import { ElMessageBox } from "element-plus";
import store from "@/store";
import { WebSockets } from "@/utils/websocket/WebSockets";

interface IBaseObj {
	[key: string]: any;
}

interface ISendData {
	cmd: string;
	param: string[];
}

/**
 *  获取两数组全集的差集
 *  @param a a数组
 *  @param b b数组
 *  @return 返回差集
 */
const getDiffArr = (a: any[], b: any[]) => {
	// return a.concat(b).filter(v => a.indexOf(v) === -1 || b.indexOf(v) === -1);
	let aArr = new Set(a);
	let bArr = new Set(b);
	return [...new Set([...aArr].filter(x => !bArr.has(x)))];
};

/**------------------------------------------------ */

/**
 * es6中的Map()、Set()
 * Map类型是键值对的有序列表，而键和值都可以是任意类型
 * Set是一种叫做集合的数据结构，Map一种叫做字典的数据结构
 * 		~集合：是由一堆无序的、相关联的、且不重复的内存结构【数学中称为元素】组成的集合
 * 		~字典：是一些元素的集合。每个每一个元素有一个称作key的域，不同元素的的key各不相同
 * Set集合是以[值,值]的存在
 * Map字典是以[键,值]的形式存在
 * ----
 * 	map.size()：返回Map结构的成员总数
 *	map.set()：设置键值key，对应的value然后返回整个Map结构，如果key存在将会被替换
 *	map.get()：读取key对应的value，没有返回undefined
 *	map.has()：返回一个布尔值，表示某个key是否存在Map对象中
 *	map.delete()：删除为key的键值对，返回布尔值
 *  map.clear()：清楚所有成员
 * ---
 *  set.add()：添加一个值，重复会自动去重
 *  set.delete()：删除某个值
 *	set.has()：判断该值是否存在，返回布尔值
 *	set.clear()：清楚所有的值
 */
// 创建对象，用来存储订阅事件
const callbackParamsMap: Map<any, Set<string>> = new Map();

// 获取响应信息
const msgCallback = (result: any) => {
	const data: IBaseObj = result.data[store.state.onlineId];
	//  Array.from:将一个类数组对象或可遍历对象转换成一个真正的数组
	const callbackList = Array.from(callbackParamsMap.keys());

	callbackList.forEach(callback => {
		try {
			const params = Array.from(callbackParamsMap.get(callback) || []);
			const resList: any = {};
			params.forEach(paramItem => {
				resList[paramItem] = data[paramItem];
			});
			/**
			 * --Object.values():返回一个数组，元素是再对象上找到的可枚举的值
			 * 			var obj = { foo: 'bar', baz: 42 };
			 *			console.log(Object.values(obj)); // ['bar', 42]
			 *
			 * --Object.keys()：返回索引值数组
			 * 			let arr = [2,3,4,5] // Object.keys(arr) ----> [0,1,2,3]
			 *
			 * --some()：表示只有一个满足条件就返回true
			 *
			 * --every()：只有全部满足条件才返回true
			 *
			 */

			if (
				Object.values(resList).every(item => {
					return item === undefined;
				})
			) {
				return;
			}
			if (Object.keys(resList).length === 1) {
				callback(Promise.resolve(Object.values(resList)[0]));
			} else {
				callback(Promise.resolve(resList));
			}
		} catch (error) {
			callback(Promise.reject(error));
		}
	});
};

// 连接超时时重新发发送
const openCallback = (): void => {
	if (!localStorage.getItem("Admin-Token")) return;
	store.commit("setSystemConnection", true);
	const params = getListeningParams();
	webSocketUser.sendData({
		cmd: "start",
		param: params,
		robotId: store?.state?.robotId
	});
};

// 连接断开时回调
const closeCallback = () => {
	store.commit("setSystemConnection", false);
};

// 连接异常回调
const errorCallback = () => {
	ElMessageBox.alert(
		"重新连接机器人失败，请确认机器人状态后点击刷新按钮",
		"提示",
		{
			confirmButtonText: "刷新",
			showClose: false,
			closeOnClickModal: false,
			closeOnPressEscape: false,
			closeOnHashChange: false,
			callback: () => {
				window.location.reload();
			}
		}
	);
};

// 增加回掉方法
const addCallbackList = (callback: any, params: string[]) => {
	const callbackParams = callbackParamsMap.get(callback) || new Set();
	params.forEach((param: string) => {
		callbackParams.add(param);
	});
	callbackParamsMap.set(callback, callbackParams);
};
// 清除回掉方法
const removeCallbackList = (callback: any, params: string[]) => {
	const callbackParams = callbackParamsMap.get(callback);
	if (!callbackParams) return;
	params.forEach((param: string) => {
		callbackParams?.delete(param);
	});
	if (callbackParams.size === 0) {
		callbackParamsMap.delete(callback);
	} else {
		callbackParamsMap.set(callback, callbackParams);
	}
};

// 获取正在监听的params
const getListeningParams = (): string[] => {
	let params: string[] = [];
	const callbackParams = Array.from(callbackParamsMap.values());
	callbackParams.forEach(callbackParam => {
		params = params.concat([...callbackParam]);
	});
	return Array.from(new Set(params));
};

/***--------------------------------------- */

const config = {
	url: `${
		process.env.NODE_ENV === "production"
			? "ws://" + window.location.hostname + ":5001/"
			: process.env.VUE_APP_BASE_WS
	}websocket`,
	msgCallback,
	openCallback,
	closeCallback,
	errorCallback
};

// 创建socket空对象
let webSocketUser: any = {};

// 启动socket方法
const startWebSocket = () => {
	if (localStorage.getItem("Admin-Token")) {
		webSocketUser = new WebSockets(config);
	} else {
		webSocketUser = null;
	}
};

startWebSocket();

// 发送请求
const sendData = (data: IBaseObj, callback: any) => {
	if (!store?.state?.onlineId) return;
	if (!localStorage.getItem("Admin-Token")) return;

	if (data.cmd === "start") {
		// 将回调方法保存再队列中
		addCallbackList(callback, data.param);
		data.param = Array.from(callbackParamsMap.get(callback) || []);
		webSocketUser.sendData({ ...data, onlineId: store?.state?.onlineId });
	} else if (data.cmd === "stop") {
		// 判断callback是否存在消息队列中
		if (callbackParamsMap.has(callback)) {
			const oldCallbackParams = getListeningParams();
			removeCallbackList(callback, data.param);
			const newCallbackParams = getListeningParams();
			const diffArr = getDiffArr(oldCallbackParams, newCallbackParams);
			webSocketUser.sendData({
				cmd: "stop",
				param: diffArr,
				onlineId: store?.state?.onlineId
			});
		}
	} else {
		return;
	}
};

const wsApi = {
	/** 通用--
	 * @param callback
	 * @param params 必须是 string[] 类型，必传
	 * @param 需要保证启动的socket都能够stop掉
	 */
	startWebSocketTopic: (callback: any, params: string[]): void => {
		const data = {
			cmd: "start",
			param: [...params]
		};
		sendData(data, callback);
	},
	stopWebSocketTopic: (callback: any, params: string[]): void => {
		const data = {
			cmd: "stop",
			param: [...params]
		};
		sendData(data, callback);
	}
};

/**使用--------------- */
const _mapPointList = (res: any) => {
	res
		.then((data: any) => {
			console.log(data);
		})
		.catch((err: any) => {
			console.error(err);
		});
};
wsApi.startWebSocketTopic(_mapPointList, ["a", "b"]);
