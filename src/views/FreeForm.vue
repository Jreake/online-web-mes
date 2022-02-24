<template>
	<el-form ref="formRef" label-width="100px" :model="formData">
		<FreeForm :configs="configs" v-model:formData="formData">
			<template v-slot:RMS_RCS>
				<el-form-item label=" ">
					<el-switch
						v-model="formData.rms_rcs"
						active-text="RMS"
						inactive-text="RCS"
						active-value="rms"
						inactive-value="rcs"
					></el-switch>
				</el-form-item>
			</template>
		</FreeForm>
	</el-form>
</template>
<script>
/**------types--------*/
/**------methodes-----*/
import {
	getCurrentInstance,
	defineComponent,
	reactive,
	toRefs,
	ref,
	onMounted,
	watch,
	provide,
	inject
} from "vue";
/**------hooks--------*/
/**------components---*/
import configs from "./data.json";
export default defineComponent({
	name: "",
	props: {},
	setup(props, ctx) {
		const { proxy } = getCurrentInstance();
		const state = reactive({
			formData: {
				rms_rcs: "rms",
				rms_ip: { ip: "", port: "8899" }, //此处提供默认端口号
				rcs_ip: { ip: "", port: "8899" },
				rm_ip: { ip: "", port: "8899" },
				scs_ip: { ip: "", port: "40005" }
			},
			sendingTotal: 0,
			progress: 0,
			errorList: []
		});
		onMounted(() => {});
		watch(
			() => state.formData,
			() => {
				console.log(state.formData);
			},
			{ deep: true }
		);
		return {
			configs,
			...toRefs(state)
		};
	}
});
</script>
<style scoped lang="scss"></style>
