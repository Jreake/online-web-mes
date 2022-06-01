<template>
	<el-form ref="formRef" label-width="100px">
		<TextForm v-model:formData="formData" />
	</el-form>
</template>
<script lang="ts">
/**------types--------*/
/**------methodes-----*/
import { formData } from "./testForm";
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
/**------components---*/
import TextForm from "@/components/TextForm/index.vue";
export default defineComponent({
	components: { TextForm },
	setup(props, ctx) {
		const { proxy }: any = getCurrentInstance();
		const state = reactive({});
		onMounted(() => {
			console.log(formData, "1111111111111");
		});
		return {
			...toRefs(state),
			formData
		};
	}
});
</script>
<style scoped lang="scss">
:deep(.el-form-item__content) {
	margin-left: 20px !important;
}
:deep(.el-form-item__label) {
	width: 280px !important;
	text-align: left;
	background: #ebeef5;
	padding: 5px;
	padding-left: 20px;
}
</style>
