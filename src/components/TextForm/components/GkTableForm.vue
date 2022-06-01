<template>
	<!-- <el-form-item label="">
		<el-col v-for="headerItem in modelValue" :span="headerItem">
			{{ headerItem }}
		</el-col>
	</el-form-item> -->

	<!-- 	:key="prientIndex"
		:label="prientIndex" -->
	<el-form-item v-for="(prientItem, prientIndex) in modelValue">
		<!-- <div
			v-if="isType(prientItem) !== 'Object'"
			style="background:blue;color:#fff;margin:50px;"
		>
			{{ modelValue }}
		</div> -->
		<template
			v-if="isType(prientItem) === 'Object'"
			v-for="(childItem, childIndex) in modelValue[prientIndex]"
			:key="childIndex"
		>
			<!-- <div style="background:red;margin-top:20px;margin:50px;">
				{{ modelValue[prientIndex][childIndex] }}
			</div> -->
			<!-- <div
				style="background:yellow;margin:50px;"
				v-if="isType(childItem) !== 'Object'"
			>
				{{ childIndex + ":" + childItem }}
				<GkStringForm
					:label="childIndex"
					v-model="modelValue[prientIndex][childIndex]"
				/>
			</div> -->
			<!-- <div style="background:green;margin:50px;">
				{{ modelValue[prientIndex][childIndex] }}
			</div> -->
			<component
				v-if="isType(childItem) !== 'Object'"
				:is="`Gk${isType(childItem)}Form`"
				v-model="modelValue[prientIndex]"
				:label="childIndex"
			/>

			<TextForm v-else v-model:formData="modelValue[prientIndex][childIndex]" />
		</template>
	</el-form-item>
</template>
<script>
/**------types--------*/
/**------methodes-----*/
import {
	defineComponent,
	getCurrentInstance,
	computed,
	reactive,
	toRefs,
	inject
} from "vue";
/**------hooks--------*/
/**------components---*/
import GkStringForm from "./GkStringForm.vue";
import GkBooleanForm from "./GkBooleanForm.vue";
import GkNumberForm from "./GkNumberForm.vue";
import GkArrayForm from "./GkArrayForm.vue";
export default defineComponent({
	name: "GkTableForm",
	emits: ["update:modelValue"],
	components: { GkStringForm, GkBooleanForm, GkNumberForm, GkArrayForm },
	props: {
		modelValue: {
			type: Object,
			required: true
		}
	},
	setup(props, ctx) {
		const { proxy } = getCurrentInstance();
		const state = reactive({});

		console.log(props.modelValue);

		const isType = inject("isType");
		return {
			...toRefs(state),
			isType
		};
	}
});
</script>
<style scoped lang="scss">
.el-form-item {
	margin: 0 !important;
}
.table-form {
	:deep(.el-form-item) {
		margin: 0;
	}
}
</style>
