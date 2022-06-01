<template>
	<el-form-item :label="label" :prop="`${modelValue}`">
		<el-switch v-model="modelValue[label]" />
	</el-form-item>
</template>
<script>
/**------types--------*/
/**------methodes-----*/
import {
	defineComponent,
	getCurrentInstance,
	watch,
	reactive,
	ref,
	toRefs,
	inject
} from "vue";
/**------hooks--------*/
/**------components---*/
export default defineComponent({
	name: "GkBooleanForm",
	components: {},
	emits: ["update:modelValue"],
	props: {
		modelValue: {
			type: String,
			required: ""
		},
		label: {
			type: String,
			require: ""
		}
	},
	setup(props, ctx) {
		const { proxy } = getCurrentInstance();

		return {};
	}
});
</script>
<style scoped lang="scss"></style>
