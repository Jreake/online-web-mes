<template>
  <el-form-item :label="formConfig.label">
    <el-switch
      v-model="value[endKey]"
      :disabled="setDisabled(formConfig, modelValue)"
      :inline-prompt="true"
      :active-text="formConfig.activeText"
      :inactive-text="formConfig.inactiveText"
      :active-value="formConfig.activeValue"
      :inactive-value="formConfig.inactiveValue"
    ></el-switch>
    <span v-if="formConfig.suffix" class="suffix">
      {{ formConfig.suffix || "" }}
    </span>
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
} from "vue"
/**------hooks--------*/
/**------components---*/
export default defineComponent({
  name: "FreeInput",
  components: {},
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => {
        return {
          span: 8,
          label: "",
          valueKey: "",
          defaultValue: "",
          activeText: "",
          activeValue: "",
          inactiveText: "",
          inactiveValue: ""
        }
      }
    }
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance()
    const defaultConfig = {
      span: 8,
      label: "",
      valueKey: "",
      defaultValue: "",
      activeText: "开",
      activeValue: true,
      inactiveText: "关",
      inactiveValue: false
    }
    const setValMap = inject("setValMap")
    const setDisabled = inject("setDisabled")
    const formConfig = ref({ ...defaultConfig })
    const state = reactive({
      value: {},
      endKey: "",
      formConfig
    })
    watch(
      () => props.config,
      () => {
        const config = proxy.$lodash.cloneDeep(defaultConfig)
        Object.assign(config, props.config)
        state.value = setValMap(props.modelValue, config.valueKey)
        const valueKeyArr = config.valueKey.split(".")
        state.endKey = valueKeyArr[valueKeyArr.length - 1]
        formConfig.value = config
      },
      { immediate: true }
    )
    return {
      formConfig,
      ...toRefs(state),
      setDisabled
    }
  }
})
</script>
<style scoped lang="scss"></style>
