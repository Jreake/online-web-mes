<template>
	<div :class="['wrapper', isCollapse ? 'hideSidebar' : '']">
		<el-container>
			<el-aside :width="isCollapse ? '64px' : '210px'">
				<sidebar />
			</el-aside>
			<el-container>
				<el-header height="50px">
					<topbar @reload="handleReload" />
				</el-header>
				<el-main>
					<breadcrumb />
					<div v-if="isRouterAlive">
						<app-main />
					</div>
				</el-main>
				<el-footer class="footer-text"
					>后台管理系统 Jreake@163.com 2021.09.28</el-footer
				>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import Sidebar from "./components/SideBar/Index.vue";
import Topbar from "./components/TopBar/TopBar.vue";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.vue";
import AppMain from "./components/AppMain/AppMain.vue";
import { useStore } from "vuex";
export default defineComponent({
	components: { Sidebar, Topbar, Breadcrumb, AppMain },
	setup() {
		const store = useStore();
		const isCollapse = computed(() => !store.state.app.sidebar.opened);
		const isRouterAlive = ref<boolean>(true);
		const handleReload = () => {
			isRouterAlive.value = false;
			nextTick(() => {
				isRouterAlive.value = true;
			});
		};
		return {
			isCollapse,
			isRouterAlive,
			handleReload
		};
	}
});
</script>

<style lang="scss" scoped>
/deep/ .el-main {
	padding: 0;
}
/deep/ .el-header {
	-webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	padding-right: 20px;
	padding-left: 0;
}
/deep/ .el-aside {
	box-shadow: rgb(241, 241, 241) 2px 0px 6px;
}
/deep/.footer-text {
	line-height: 60px;
	text-align: center;
	color: rgba(0, 0, 0, 0.25);
}
</style>
