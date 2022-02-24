<template>
  <el-form-item :label="formConfig.label" :rules="formConfig.rules">
    <el-input-number
      v-model="value[endKey]"
      :disabled="setDisabled(formConfig, modelValue)"
      :precision="formConfig.precision"
      :step="formConfig.step"
      :min="formConfig.min"
      :max="formConfig.max"
      :placeholder="formConfig.placeholder"
    ></el-input-number>
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
  name: "FreeNumber",
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
          rulesPattern: null,
          errorMessage: "",
          placeholder: "",
          precision: 2,
          step: 0.01,
          min: -Infinity,
          max: Infinity
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
      rules: [],
      placeholder: "请输入",
      precision: 2,
      step: 0.01,
      min: -Infinity,
      max: Infinity
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
        const { rulesPattern, errorMessage } = props.config
        if (rulesPattern) {
          config.rules = [
            {
              pattern: rulesPattern,
              message: proxy.$t(errorMessage || "输入错误"),
              trigger: "blur"
            }
          ]
        }
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
