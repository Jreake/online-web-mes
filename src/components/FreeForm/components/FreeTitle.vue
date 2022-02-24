<template>
  <div class="main-title">{{ config.title }}</div>
</template>
<script>
/**------types--------*/
/**------methodes-----*/
import {
  getCurrentInstance,
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  provide,
  inject
} from "vue"
/**------hooks--------*/
/**------components---*/
export default defineComponent({
  name: "FreeTitle",
  components: {},
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => {
        return {
          title: ""
        }
      }
    }
  }
})
</script>
<style scoped lang="scss"></style>
