<template>
  <el-form-item
    v-for="(prientItem, prientIndex) in value"
    :key="isType(prientItem) === 'Object' ? prientIndex : ''"
    :label="isType(prientItem) === 'Object' ? prientIndex : ''"
  >
    <template v-if="isType(prientItem) === 'Object'">
      <template
        v-for="(childItem, childIndex) in modelValue[prientIndex]"
        :key="childIndex"
      >
        <component
          v-if="isType(childItem) !== 'Object'"
          :is="`Gk${isType(childItem)}Form`"
          v-model="value[prientIndex]"
          :label="childIndex"
        />
        <el-collapse v-else>
          <el-collapse-item :name="childIndex" :title="childIndex">
            <SeniorForm v-model:formData="value[prientIndex][childIndex]" />
          </el-collapse-item>
        </el-collapse>
      </template>
    </template>
  </el-form-item>
</template>
<script>
import { defineComponent, inject } from "vue"
import GkStringForm from "./GkStringForm.vue"
import GkBooleanForm from "./GkBooleanForm.vue"
import GkNumberForm from "./GkNumberForm.vue"
import GkArrayForm from "./GkArrayForm.vue"
import FormIndex from "../index.vue"
export default defineComponent({
  name: "GkTableForm",
  emits: ["update:modelValue"],
  components: {
    GkStringForm,
    GkBooleanForm,
    GkNumberForm,
    GkArrayForm,
    FormIndex,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
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
  setup(props, ctx) {
    const isType = inject("isType")
    return {
      isType,
    }
  },
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
