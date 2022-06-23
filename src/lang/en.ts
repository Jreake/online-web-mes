// 通过require.context动态加载modules目录下的路由文件，组织业务模块路由数据
let routeList = {};
let buttonList = {};

const moduleList = require.context("@/modules", true, /lang.js$/);
moduleList.keys().forEach(modulePath => {
	const langItem = moduleList(modulePath).default.en;
	Object.assign(routeList, langItem.route);
	Object.assign(buttonList, langItem.button);
});

export default {
	button: buttonList,
	route: {
		...routeList,
		welcome: "Welcome",
		page401: "401",
		page404: "404",
		profile: "Profile"
	},
	/* 侧边栏路由 */
	navbar: {
		welcome: "Welcome",
		logOut: "Log Out",
		profile: "Profile",
		officialWeb: "Official Website",
		help: "Document",
		theme: "Theme",
		size: "Global Size"
	},
	tagsView: {
		refresh: "Refresh",
		close: "Close",
		closeOthers: "Close Others",
		closeAll: "Close All"
	},
	settings: {
		title: "Page style setting",
		theme: "Theme Color"
	}
};
