<template>
	<el-form-item :label="label" :prop="`${modelValue}`">
		<div v-for="(item, index) in modelValue[label]" :key="index">
			<el-input v-model="modelValue[label][index]" />
		</div>
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
	name: "GkArrayForm",
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
