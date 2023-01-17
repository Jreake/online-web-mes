import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/layout/Index.vue";
import BlankLayout from "@/layout/components/BlankLayout/BlankLayout.vue";
// : Array<RouteRecordRaw>
export const routes = [
	{
		path: "/",
		component: Layout,
		redirect: "home",
		children: [
			{
				path: "home",
				component: () => import("@/views/Home.vue"),
				name: "Home",
				meta: { title: "首页", icon: "el-icon-s-home" }
			},
			{
				path: "data",
				component: BlankLayout,
				// component: { render (h: any) { return h('router-view'); } },
				name: "Data",
				redirect: "table",
				meta: { title: "数据", icon: "el-icon-s-data" },
				children: [
					{
						path: "table",
						component: () => import("@/views/Table.vue"),
						name: "Table",
						meta: { title: "表格" }
					},
					{
						path: "form",
						component: () => import("@/views/Form.vue"),
						name: "Form",
						meta: { title: "表单" }
					},
					{
						path: "codeMierror",
						component: () => import("@/views/CodeMierror.vue"),
						name: "CodeMierror",
						meta: { title: "代码编辑器" }
					},
					{
						path: "seniorForm",
						component: () => import("@/views/SeniorForm.vue"),
						name: "SeniorForm",
						meta: { title: "高级表单" }
					},
					{
						path: "freeForm",
						component: () => import("@/views/FreeForm.vue"),
						name: "FreeForm",
						meta: { title: "自动表单" }
					},
					{
						path: "fileUpload",
						component: () => import("@/views/fileUpload/index.vue"),
						name: "FileUpload",
						meta: { title: "文件上传" }
					}
					// {
					// 	path: "textForm",
					// 	component: () => import("@/views/TextForm.vue"),
					// 	name: "TextForm",
					// 	meta: { title: "测试" }
					// }
				]
			}
		]
	},
	{
		path: "/login",
		name: "Login",
		hidden: true,
		component: () => import("@/pages/login/index.vue")
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
