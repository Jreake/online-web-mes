import { createStore } from "vuex";
import app from "./modules/app";
import permission from "./modules/permission";
import getters from "./getters";
export default createStore({
	state: {
		onlineId: 0,
		systemConnection: true // 单机ws连接状态
	},
	mutations: {
		setSystemConnection(state: any, status) {
			state.systemConnection = status;
		}
	},
	getters,
	modules: {
		app,
		permission
	}
});
