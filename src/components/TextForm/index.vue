<template>
	<template v-for="(item, index) in formInfo" :key="index">
		<!-- <div>{{ item }}</div>
		<div>{{ isType(item) }}</div> -->
		<component
			v-if="isType(item) !== 'Object'"
			:is="`Gk${isType(formInfo[index])}Form`"
			v-model="formInfo"
			:label="index"
		/>
		<component v-else :is="`GkTableForm`" v-model="formInfo" />
	</template>
</template>
<script lang="ts">
/**------types--------*/
/**------methodes-----*/
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
import GkTableForm from "./components/GkTableForm.vue";
import GkStringForm from "./components/GkStringForm.vue";
import GkBooleanForm from "./components/GkBooleanForm.vue";
import GkNumberForm from "./components/GkNumberForm.vue";
import GkArrayForm from "./components/GkArrayForm.vue";
export default defineComponent({
	name: "TextForm",
	components: {
		GkTableForm,
		GkStringForm,
		GkBooleanForm,
		GkNumberForm,
		GkArrayForm
	},
	props: {
		formData: {
			type: Object,
			required: true
		}
	},
	setup(props, ctx) {
		const { proxy }: any = getCurrentInstance();
		const basicInfo = ref<any>(null);
		const state = reactive({});
		let formInfo = ref<any>(props.formData);
		onMounted(() => {
			console.log(props.formData);
		});

		const isType = (data: any) => {
			let datatType = Object.prototype.toString.call(data);

			let type = datatType.substring(8, datatType.length - 1);

			return type;
		};

		provide("isType", isType);

		return {
			...toRefs(state),
			isType,
			formInfo
		};
	}
});
</script>
<style scoped lang="scss"></style>
