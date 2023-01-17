<template>
	<div class="">
		<el-button @click="handleUpload">文件上传</el-button>
		<FileUploadDialog ref="FileUploadDialogRef" v-model="isShowDialog" />
	</div>
</template>
<script lang="ts">
import {
	getCurrentInstance,
	defineComponent,
	reactive,
	toRefs,
	ref,
	onMounted,
	provide,
	inject
} from "vue";
import FileUploadDialog from "./components/FileUploadDialog.vue";
export default defineComponent({
	name: "",
	components: { FileUploadDialog },
	props: {},
	setup(props, ctx) {
		const { proxy }: any = getCurrentInstance();
		let isShowDialog = ref<boolean>(false);
		const state = reactive({});
		onMounted(() => {
			console.log(11);
		});

		const handleUpload = () => {
			isShowDialog.value = true;
		};
		return {
			...toRefs(state),
			isShowDialog,
			handleUpload
		};
	}
});
</script>
<style scoped lang="scss"></style>
