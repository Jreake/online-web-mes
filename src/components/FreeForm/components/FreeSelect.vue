<template>
  <el-form-item :label="formConfig.label" :rules="formConfig.rules">
    <el-select
      v-model="value[endKey]"
      :disabled="setDisabled(formConfig, modelValue)"
      :collapse-tags="true"
      :filterable="true"
      :clearable="formConfig.clearable"
      :multiple="formConfig.multiple"
      :multiple-limit="formConfig.multipleLimit"
      :allow-create="formConfig.allowCreate"
      :placeholder="formConfig.placeholder"
    >
      <el-option
        v-for="item in formConfig.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
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
  name: "FreeSelect",
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
          disableKey: "",
          disableVal: "",
          rulesPattern: null,
          errorMessage: "",
          placeholder: " ",
          clearable: false,
          multiple: false,
          multipleLimit: 1,
          allowCreate: false,
          options: []
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
      disableKey: "",
      disableVal: "",
      rules: [],
      placeholder: "",
      clearable: false,
      multiple: false,
      multipleLimit: 1,
      allowCreate: false,
      options: []
    }
    const setValMap = inject("setValMap")
    const setEndKey = inject("setEndKey")
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
