<template>
  <el-form-item :label="formConfig.label" class="form-area">
    <template v-for="(item, index) in formConfig.row" :key="index">
      <el-col :span="10" :style="{ width: setWidth(10) }">
        <FreeForm :configs="[item]" v-model:formData="modelValue"></FreeForm>
      </el-col>
      <el-col
        v-if="index !== formConfig.row.length - 1"
        class="area-connector"
        :span="2"
        :style="{ width: setWidth(2) }"
      >
        {{ formConfig.connector }}
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

      config.row.forEach((item) => {
        item.span = 24
      })
      return config
    })
    const setDisabled = inject("setDisabled")
    const setWidth = (span) => {
      return `${((span || 12) / 24) * 100}%`
    }
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
.form-area {
  margin-bottom: 0 !important;
  :deep(.el-form-item__content) {
    max-width: 100% !important;
    display: flex;
    align-items: center;
  }
  .area-connector {
    margin-bottom: 18px;
    text-align: center;
  }
}
</style>
