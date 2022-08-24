<template>
  <el-form-item :label="label" :prop="`${value}`">
    <el-input v-model="value[label]" />
  </el-form-item>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "GkStringForm",
  components: {},
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      required: "",
    },
    label: {
      type: String,
      require: "",
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emits("update:modelValue", value)
      },
    },
  },
})
</script>
<style scoped lang="scss"></style>
