<template>
  <template v-for="(item, index) in formInfo" :key="index">
    <component
      v-if="isType(item) !== 'Object'"
      :is="`Gk${isType(formInfo[index])}Form`"
      v-model="formInfo"
      :label="index"
    />
    <component v-else :is="`GkTableForm`" v-model="formInfo" />
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, provide, onMounted } from "vue"
import GkTableForm from "./components/GkTableForm.vue"
import GkStringForm from "./components/GkStringForm.vue"
import GkBooleanForm from "./components/GkBooleanForm.vue"
import GkNumberForm from "./components/GkNumberForm.vue"
import GkArrayForm from "./components/GkArrayForm.vue"
export default defineComponent({
  name: "SeniorForm",
  components: {
    GkTableForm,
    GkStringForm,
    GkBooleanForm,
    GkNumberForm,
    GkArrayForm,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    let formInfo = ref<any>(props.formData)

    const isType = (data: any) => {
      let datatType = Object.prototype.toString.call(data)
      let type = datatType.substring(8, datatType.length - 1)
      return type
    }

    onMounted(() => {
      console.log(1111111111)
    })

    provide("isType", isType)

    return {
      isType,
      formInfo,
    }
  },
})
</script>
<style scoped lang="scss"></style>
