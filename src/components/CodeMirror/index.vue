<template>
  <div class="in-coder-panel">
    <textarea ref="Textarea"></textarea>
    <el-select
      v-if="isSelectVisiable"
      class="code-mode-select"
      v-model="mode"
      @change="changeMode"
    >
      <el-option
        v-for="mode in modes"
        :key="mode.value"
        :label="mode.label"
        :value="mode.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
/**------types--------*/
// 引入全局实例
import _CodeMirror from "codemirror"

// 核心样式
import "codemirror/lib/codemirror.css"
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/cobalt.css"

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/css/css.js"
import "codemirror/mode/xml/xml.js"
import "codemirror/mode/clike/clike.js"
import "codemirror/mode/markdown/markdown.js"
import "codemirror/mode/python/python.js"
import "codemirror/mode/r/r.js"
import "codemirror/mode/shell/shell.js"
import "codemirror/mode/sql/sql.js"
import "codemirror/mode/swift/swift.js"
import "codemirror/mode/vue/vue.js"
// import "codemirror/addon/selection/active-line.js"
// import "codemirror/keymap/sublime.js"
import "codemirror/src/codemirror"

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror
/**------methodes-----*/
import { defineComponent, reactive, ref } from "vue"
/**------components---*/
export default defineComponent({
  name: "CodeMirror",
  props: {
    // 外部传入的内容，用于实现双向绑定
    modelValue: {
      type: String,
      default: () => {
        return ""
      },
    },
    // 默认显示语法类型
    language: {
      type: String,
      default: () => {
        return null
      },
    },
    // 基础类型配置
    options: {
      type: Object,
      default: () => {
        return {
          // 缩进格式
          tabSize: 2,
          // 主题，对应主题库 JS 需要提前引入
          theme: "cobalt",
          // 显示行号
          lineNumbers: true,
          line: true,
          smartIndent: true, //自动缩进是否开启
          // indentUnit: 4, //缩进单位
          // styleActiveLine: true, //设置光标所在行高亮，需要引入addon/selection/active-line.js
          // keyMap: "sublime",
        }
      },
    },
    // 是否显示下拉列表
    isSelectVisiable: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    // 语言类型
    modeType: {
      default: () => {
        return [
          {
            value: "css",
            label: "CSS",
          },
          {
            value: "javascript",
            label: "Javascript",
          },
          {
            value: "html",
            label: "XML/HTML",
          },
          {
            value: "x-java",
            label: "Java",
          },
          {
            value: "x-objectivec",
            label: "Objective-C",
          },
          {
            value: "x-python",
            label: "Python",
          },
          {
            value: "x-rsrc",
            label: "R",
          },
          {
            value: "x-sh",
            label: "Shell",
          },
          {
            value: "x-sql",
            label: "SQL",
          },
          {
            value: "x-swift",
            label: "Swift",
          },
          {
            value: "x-vue",
            label: "Vue",
          },
          {
            value: "markdown",
            label: "Markdown",
          },
        ]
      },
    },
  },
  setup(props, ctx) {
    interface modesType {
      value: string
      label: string
    }
    const Textarea = ref<any>(null)
    // 内部真实的内容
    let code = ref<any>("")
    // 默认语法
    let mode = ref<string>("javascript")
    // 编辑器实例
    let coder = ref<any>(null)
    //配置
    const options = reactive({
      // 缩进格式
      tabSize: 2,
      // 主题，对应主题库 JS 需要提前引入
      theme: "cobalt",
      // 显示行号
      lineNumbers: true,
      line: true,
      smartIndent: true, //自动缩进是否开启
      // indentUnit: 4, //缩进单位
      // styleActiveLine: true, //设置光标所在行高亮，需要引入addon/selection/active-line.js
      // keyMap: "sublime",
    })
    // 语言切换
    // eslint-disable-next-line vue/no-setup-props-destructure
    const modes: modesType[] = props.modeType

    const _initialize = () => {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      coder.value = CodeMirror.fromTextArea(Textarea.value, options)
      // 编辑器赋值
      coder.value.setValue(props.modelValue || code.value)
      // 支持双向绑定
      coder.value.on("change", (coder: any) => {
        code.value = coder.getValue()
        if (ctx.emit) {
          ctx.emit("input", code.value)
        }
      })
      // // 尝试从父容器获取语法类型
      if (props.language) {
        // 获取具体的语法类型对象
        let modeObj = _getLanguage(props.language)
        // 判断父容器传入的语法是否被支持
        if (modeObj) {
          mode.value = modeObj.label
        }
      }
    }
    // 获取当前语法类型
    const _getLanguage = (language: string) => {
      // 在支持的语法类型列表中寻找传入的语法类型
      return modes.find((res) => {
        // 所有的值都忽略大小写，方便比较
        let currentLanguage = language.toLowerCase()
        let currentLabel = res.label.toLowerCase()
        let currentValue = res.value.toLowerCase()
        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return (
          currentLabel === currentLanguage || currentValue === currentLanguage
        )
      })
    }

    // 更改模式
    const changeMode = (val: any) => {
      // 修改编辑器的语法配置
      coder.value.setOption("mode", `text/${val}`)
      // 获取修改后的语法
      let label = _getLanguage(val)?.label.toLowerCase()
      // 允许父容器通过以下函数监听当前的语法值
      ctx.emit("language-change", label)
    }

    return {
      Textarea,
      code,
      mode,
      coder,
      modes,
      changeMode,
      _initialize,
    }
  },
})
</script>
<style scoped lang="scss">
.in-coder-panel {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  display: flex;
  position: relative;
  :deep(.cm-s-cobalt) {
    height: 100%;
    width: 100%;
  }
  .CodeMirror {
    flex-grow: 1;
    z-index: 1;
    .CodeMirror-code {
      line-height: 19px;
    }
  }
  .code-mode-select {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
    max-width: 130px;
  }
}
</style>
