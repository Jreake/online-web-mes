<template>
  <el-upload
    ref="uploadRef"
    class="upload-box"
    drag
    action=""
    :disabled="!!uploadFile"
    :show-file-list="false"
    :auto-upload="false"
    :multiple="false"
    :on-change="uploadChange"
  >
    <template v-if="!uploadFile">
      <el-icon :size="70" class="el-icon-upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">{{ tips }}</div>
    </template>
    <template v-else>
      <el-icon class="upload-del" @click="delFile">
        <circle-close />
      </el-icon>
      <el-icon class="el-icon-folder-checked">
        <folder-checked />
      </el-icon>
      <div class="el-upload__text">{{ uploadFile.name }}</div>
    </template>
  </el-upload>
</template>
<script lang="ts">
/**------types--------*/
/**------methodes-----*/
import {
  getCurrentInstance,
  defineComponent,
  reactive,
  toRefs,
  ref,
  watch,
} from "vue"
/**------hooks--------*/
/**------components---*/
export default defineComponent({
  name: "UploadOneFile",
  emits: ["update:file", "beforeUpload"],
  components: {},
  props: {
    tips: {
      type: String,
      default: "点击或拖拽至此处上传",
    },
    file: {
      type: Object,
    },
    accept: {
      type: String,
      default: "*",
    },
    beforeAvatar: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const { proxy }: any = getCurrentInstance()
    const uploadRef = ref<any>(null)
    const state: {
      uploadFile: any
    } = reactive({
      uploadFile: null,
    })

    watch(
      () => props.file,
      (val: any) => {
        if (val === null) {
          state.uploadFile = null
        }
      }
    )

    const uploadChange = (file: any) => {
      const raw = file.raw
      if (!raw) return
      if (!beforeAvatarUpload(file)) return
      if (props.accept !== "*") {
        if (raw.type !== props.accept) {
          uploadRef.value.clearFiles()
          return
        }
      }
      state.uploadFile = raw
      ctx.emit("update:file", raw)
      ctx.emit("beforeUpload", raw)
    }

    const beforeAvatarUpload = (file: any) => {
      if (props.beforeAvatar) {
        let FileExt = file.name.replace(/.+\./, "")
        // "rar", "gz", ".apk"
        if ([props.format].indexOf(FileExt.toLowerCase()) === -1) {
          proxy.$message.warning("文件格式有误，请重新上传")
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
    const delFile = () => {
      ctx.emit("update:file", null)
      uploadRef.value.clearFiles()
      setTimeout(() => {
        state.uploadFile = null
      })
    }
    const clearTheFile = () => {
      // uploadRef.value.clearFiles()
    }
    return {
      uploadRef,
      ...toRefs(state),
      uploadChange,
      clearTheFile,
      delFile,
      beforeAvatarUpload,
    }
  },
})
</script>
<style scoped lang="scss">
.upload-box {
  :deep(.el-upload) {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      padding: 20px;
    }
  }
  .el-icon-upload {
    margin: auto;
    line-height: 130px;
  }
  .el-icon-folder-checked {
    font-size: 67px;
    color: var(--el-text-color-placeholder);
    line-height: 130px;
  }
  .upload-del {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 20px;
  }
}
</style>
