<template>
	<el-dialog :title="'文件批量'" v-model="modelValue" @close="onCancel">
		<UploadOneFile
			ref="jsonFileRef"
			v-model:file="fileInfo.fileJson"
			accept="application/zip"
			@beforeUpload="beforeUpload"
		/>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="onCancel" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" size="default"
					>上 传</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from "vue";
import UploadOneFile from "@/components/UploadOneFile/index.vue";
export default defineComponent({
	name: "FileUploadDialog",
	emits: ["update:modelValue"],
	components: { UploadOneFile },
	props: {
		modelValue: {
			type: Boolean,
			default: () => {
				return false;
			}
		}
	},
	setup(props, ctx) {
		const UploadFileProcess = ref<any>(null);
		const fileInfo = ref<any>({
			buildingName: "",
			storeyName: "",
			numberName: "",
			fileType: "json",
			fileJson: null,
			fileZip: null
		});
		// 关闭弹窗
		const onCancel = () => {
			ctx.emit("update:modelValue", false);
		};

		// 文件上传之前
		const beforeUpload = (file: any) => {
			console.log(file);
			UploadFileProcess.value.handleBefore(file);
		};

		const onSubmit = () => {};

		return {
			UploadFileProcess,
			fileInfo,
			onCancel,
			beforeUpload,
			onSubmit
		};
	}
});
</script>
<style scoped lang="scss"></style>
