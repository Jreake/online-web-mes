<template>
  <el-form-item :label="label" :prop="`${value}`">
    <div v-for="(item, index) in value[label]" :key="index">
      <el-input v-model="value[label][index]" />
      <i class="el-icon-delete"></i>
    </div>
  </el-form-item>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "GkArrayForm",
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
