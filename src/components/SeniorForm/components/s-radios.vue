<!--单选组-->
<template>
	<el-radio-group
		v-model="value"
		@change="mySubmit"
		@blur="myBlur"
		:id="'c' + controlId"
		:name="'c' + controlId"
		:size="size"
	>
		<el-radio
			v-for="item in optionList"
			:key="'radio' + controlId + item.value"
			:label="item.value"
		>
			{{ item.label }}
		</el-radio>
	</el-radio-group>
</template>

<script>
import { defineComponent } from "vue";
// 引入表单子控件的管理类
import formItemManage from "@/components/controlManage/formItemManage";
// 引入组件需要的属性
import { baseFormProps } from "@/components/controlConfig/formItemMeta";

export default defineComponent({
	name: "el-from-radios",
	props: {
		modelValue: [String, Number],
		...baseFormProps // 基础属性
	},
	emits: ["change", "blur", "focus"],
	setup(props, context) {
		return {
			...formItemManage(props, context)
		};
	}
});
</script>
