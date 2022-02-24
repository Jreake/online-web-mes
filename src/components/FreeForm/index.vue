<template>
	<template v-for="(config, index) in configs" :key="index">
		<div
			v-if="config.type === 'Slot'"
			:style="{ width: setWidth(config.span) }"
		>
			<slot :name="config.slotName"></slot>
		</div>
		<component
			v-else
			:is="`Free${config.type}`"
			:config="config"
			:style="{ width: setWidth(config.span) }"
			v-model="formData"
		></component>
	</template>
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
	provide,
	inject
} from "vue";
/**------hooks--------*/
/**------components---*/
import FreeInput from "./components/FreeInput.vue";
import FreeSelect from "./components/FreeSelect.vue";
import FreeSwitch from "./components/FreeSwitch.vue";
import FreeFromTable from "./components/FreeTableForm.vue";
import FreeScope from "./components/FreeScope.vue";
import FreeNumber from "./components/FreeNumber.vue";
import FreeTitle from "./components/FreeTitle.vue";
export default defineComponent({
	name: "FreeForm",
	components: {
		FreeScope,
		FreeFromTable,
		FreeInput,
		FreeSelect,
		FreeSwitch,
		FreeNumber,
		FreeTitle
	},
	props: {
		configs: {
			type: Array,
			default: () => []
		},
		formData: {
			type: Object,
			required: true
		}
	},
	setup(props, ctx) {
		const { proxy } = getCurrentInstance();
		const state = reactive({});
		const setWidth = span => {
			return `${((span || 12) / 24) * 100}%`;
		};
		const setDisabled = (formConfig, modelValue) => {
			const { disableKey, disableVal } = formConfig;
			if (!disableKey || !disableVal) {
				return false;
			}
			if (!Array.isArray(disableVal)) {
				return false;
			}
			const valMap = setValMap(modelValue, disableKey);
			const endKey = setEndKey(disableKey);
			let val = valMap[endKey];
			if (!Array.isArray(val)) {
				val = [val];
			}
			return val.some(item => {
				return disableVal.includes(item);
			});
		};
		const setValMap = (modelValue, valueKey) => {
			console.log(modelValue, valueKey);
			let defaultVal = modelValue;
			if (valueKey.indexOf(".") >= 0) {
				const valKeyArr = valueKey.split(".");
				for (let i = 0; i < valKeyArr.length; i++) {
					if (i >= valKeyArr.length - 1) {
						break;
					}
					let key = valKeyArr[i];
					if (key.indexOf("[") >= 0) {
						console.log(key);
						key = key.replace(/[\[\]]/g, "");
						key = Number(key);
					}
					defaultVal = defaultVal[key];
				}
			}

			return defaultVal;
		};
		const setEndKey = valueKey => {
			const valueKeyArr = valueKey.split(".");
			let endKey = valueKeyArr[valueKeyArr.length - 1].replace(/[\[\]]/g, "");
			if (valueKeyArr[valueKeyArr.length - 1].indexOf("[") >= 0) {
				endKey = Number(endKey);
			}
			return endKey;
		};
		provide("setDisabled", setDisabled);
		provide("setValMap", setValMap);
		provide("setEndKey", setEndKey);
		return {
			...toRefs(state),
			setWidth
		};
	}
});
</script>
<style scoped lang="scss">
:deep(.el-form-item__content) {
	max-width: 250px;
	display: flex;
	align-items: center;
}
:deep(.el-select) {
	width: 100%;
}
:deep(.el-input-number) {
	width: 100%;
}
:deep(.suffix) {
	padding: 0 3px;
}
</style>
