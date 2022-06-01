import store from "@/store/index";

interface IConfig {
	url: string;
	sendBeatInterval?: number;
	getBeatInterval?: number;
	timeout?: number;
	msgCallback?: any;
	closeCallback?: any;
	openCallback?: any;
}

export class WebSockets {
	ws: WebSocket | null = null;
	config = {
		url: "",
		sendBeatInterval: 3 * 1000, //发送心跳间隔
		getBeatInterval: 3 * 1000, //判断心跳间隔
		timeout: 3 * 1000, //连接超时
		reconnectionInterval: 4 * 1000, // 断开后重新连接的间隔
		reconnectionCount: 10, // 断开后重新连接的次数
		msgCallback: (data?: any): void => {
			console.log("msgCallback");
		},
		closeCallback: (data?: any): void => {
			console.log("closeCallback");
		},
		openCallback: (data?: any): void => {
			console.log("openCallback");
		},
		errorCallback: (data?: any): void => {
			console.log("openCallback");
		}
	};
	isHandleClose = false; // 是否手动关闭，手动关闭不会进行重连
	reconnectionCount = 0; // 已重试次数
	connection = false; // 当前连接状态
	heartbeat!: any; // 心跳的setTimeout

	waitSendData: any[] = []; // 待消费的请求，在建立连接后消费并清空，关闭连接后会直接清空
	constructor(config: IConfig) {
		// 	Object.assign(a,b)  将b(目标对象)复制到a(源对象)中
		Object.assign(this.config, config);
		this.reconnectionCount = this.config.reconnectionCount;
		this.connect();
		// onbeforeunload再即将离开当前页面（刷新或关闭）时触发
		window.onbeforeunload = () => {
			this.ws?.close();
		};
	}
	connect(): void {
		if (!localStorage.getItem("Admin-Token")) return;
		// 判断当前是否连接
		if (this.connection) return;
		try {
			this.ws = new WebSocket(this.config.url);
			this.ws.binaryType = "arraybuffer";
			this.ws.onopen = () => {
				console.log("websocket is opend");
				// socket连接后保存连接状态
				this.connection = true;
				this.reconnectionCount = this.config.reconnectionCount;
				this.config.openCallback();
				this.waitSendData.forEach(item => {
					this.ws?.send(JSON.stringify(item));
				});
				this.waitSendData = [];
				this.sendHeartbeat();
			};
		} catch (error) {}
	}
	sendHeartbeat(): void {
		if (!this.connection) return;
		this.ws?.send(JSON.stringify({ onlineId: store?.state?.onlineId }));
		setTimeout(() => {
			this.sendHeartbeat();
		}, this.config.sendBeatInterval);
	}
	// 接收心跳
	getHeartbeat(): void {
		this.connection = true;
		if (this.heartbeat) {
			clearTimeout(this.heartbeat);
		}
		this.heartbeat = setTimeout(() => {
			this.ws?.close();
		}, this.config.getBeatInterval);
	}
	// 关闭连接
	closeSocket(): void {
		this.isHandleClose = true;
		this.ws?.close();
	}
	// 发送请求,当连接未建立时保存请求，当连接建立后消费所有请求
	sendData(data: any): void {
		if (!this.connection) {
			this.waitSendData.push(data);
		} else {
			this.ws?.send(JSON.stringify(data));
		}
	}
}
