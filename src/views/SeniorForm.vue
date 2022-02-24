<template>
	<SeniorForm v-model="model" v-model:partModel="partModel" :meta="meta">
		<template v-slot:102>
			<h3>这是外面建立的子控件</h3>
			<el-input v-model="model.colName" placeholder="请输入内容"></el-input>
		</template>
	</SeniorForm>
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
import SeniorForm from "@/components/SeniorForm/index.vue";
import createModel from "@/components/controlManage/modelManage";
import { getControlTypeOptionList } from "@/components/controlConfig/config.js";
// 设置组件占位的meta
const spanSelectMeta = {
	controlId: 9527,
	colName: "controlType",
	controlType: 160,
	defaultValue: "1",
	optionList: [
		{ value: 1, label: "一格" },
		{ value: 2, label: "二格" },
		{ value: 3, label: "三格" },
		{ value: 4, label: "四格" },
		{ value: -2, label: "一半" },
		{ value: -3, label: "三份" },
		{ value: -4, label: "四份" },
		{ value: -5, label: "五份" }
	],
	isClear: false,
	disabled: false,
	title: "占位",
	placeholder: "选择占位"
};
export default defineComponent({
	name: "",
	components: { SeniorForm },
	props: {},
	setup(props, ctx) {
		const partModel = ref({});
		const { typeOptionList } = getControlTypeOptionList();

		// 读取json，获得配置。
		const json = require("@/views/json/meta-form.json");
		const meta = reactive(json.formMeta); // 表单的meta
		// 添加重新绑定的开关
		meta.reload = false;
		// 设置组件类型
		meta.itemMeta[103].optionList = typeOptionList;

		// 设置使用插槽的表单子控件
		meta.itemMeta[102].controlId = 102;
		meta.itemMeta[102].controlType = 1;

		// 依据meta 创建model
		const model = createModel(meta.itemMeta);
		model.defaultValue = "外面设置的初始值";

		return {
			model,
			partModel,
			meta,
			spanSelectMeta
		};
	}
});
</script>
<style scoped lang="scss"></style>
