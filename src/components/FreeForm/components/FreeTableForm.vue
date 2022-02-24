<template>
  <el-form-item label="">
    <el-col
      v-for="headerItem in formConfig.header"
      :span="headerItem.span"
      :style="{ width: setWidth(headerItem.span) }"
    >
      {{ headerItem.label }}
    </el-col>
  </el-form-item>

  <el-form-item
    v-for="(formItem, index) in formConfig.form"
    :key="index"
    :label="formItem.label"
  >
    <template v-for="(item, index) in formItem.row" :key="index">
      <el-col
        :span="formConfig.header[index].span"
        :style="{
          width: setWidth(formConfig.header[index].span),
          paddingRight: '10px'
        }"
      >
        <FreeForm :configs="[item]" v-model:formData="modelValue"></FreeForm>
      </el-col>
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
      placeholder: "请输入",
      clearable: false
    }
    const state = reactive({})
    const formConfig = computed(() => {
      const config = proxy.$lodash.cloneDeep(defaultConfig)
      Object.assign(config, props.config)
      config.form.forEach((formItem) => {
        formItem.row.forEach((rowItem) => {
          rowItem.span = 24
        })
      })
      console.log(config)
      return config
    })
    const setWidth = (span) => {
      return `${((span || 12) / 24) * 100}%`
    }
    const setDisabled = inject("setDisabled")
    return {
      formConfig,
      ...toRefs(state),
      setDisabled,
      setWidth
    }
  }
})
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
