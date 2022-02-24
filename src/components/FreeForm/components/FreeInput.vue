<template>
  <el-form-item
    :label="formConfig.label"
    :prop="`${formConfig.valueKey}`"
    :rules="formConfig.rules"
  >
    <el-input
      v-model="value[endKey]"
      :disabled="setDisabled(formConfig, modelValue)"
      :clearable="formConfig.clearable"
      :placeholder="formConfig.placeholder"
    ></el-input>
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
          rulesPattern: null,
          errorMessage: "",
          placeholder: "",
          clearable: false
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
      placeholder: " ",
      clearable: false
    }
    const formConfig = ref({ ...defaultConfig })
    const state = reactive({
      value: {},
      endKey: "",
      formConfig
    })
    const setDisabled = inject("setDisabled")
    const setValMap = inject("setValMap")
    const setEndKey = inject("setEndKey")
    watch(
      () => props.config,
      () => {
        const config = proxy.$lodash.cloneDeep(defaultConfig)
        Object.assign(config, props.config)
        const { rulesPattern, errorMessage } = props.config
        if (rulesPattern) {
          config.rules = [
            {
              required: true,
              pattern: new RegExp(rulesPattern),
              message: proxy.$t(errorMessage || "输入错误"),
              trigger: "blur"
            }
          ]
        }
        state.value = setValMap(props.modelValue, config.valueKey)
        state.endKey = setEndKey(config.valueKey)

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
