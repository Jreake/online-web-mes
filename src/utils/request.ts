import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
const baseURL = "/api";
const service = axios.create({
	baseURL,
	timeout: 30 * 1000,
	withCredentials: true,
	headers: {}
});

const err = error => {
	if (error.message.includes("timeout")) {
		// console.log('error---->',error.config)
		ElMessage({
			message: "请求超时，请刷新网页重试",
			type: "error"
		});
	}
	if (error.response) {
		const data = error.response.data;
		const token = "";
		if (error.response.status === 403) {
			ElMessage({
				message: "Forbidden",
				type: "error"
			});
		}
		if (
			error.response.status === 401 &&
			!(data.result && data.result.isLogin)
		) {
			ElMessage({
				message: "Unauthorized",
				type: "error"
			});
			if (token) {
				// store.dispatch('Logout').then(() => {
				// 	setTimeout(() => {
				// 		window.location.reload();
				// 	}, 1500);
				// });
			}
		}
	}
	return Promise.reject(error);
};

service.interceptors.request.use((config: AxiosRequestConfig) => {
	return config;
}, err);

service.interceptors.response.use((response: AxiosResponse) => {
	const config: AxiosRequestConfig = response.config || "";
	const code = Number(response.data.code);
	if (code === 0) {
		if (config && config.successNotice) {
			ElMessage({
				message: response.data.message,
				type: "success"
			});
		}
		return response.data;
	} else {
		let errCode = [402, 403];
		if (errCode.includes(response.data.code)) {
			ElMessage({
				message: response.data.msg || "暂不不支持全屏",
				type: "warning"
			});
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}
	}
}, err);

export default service;
