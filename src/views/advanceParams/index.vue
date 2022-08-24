<template>
  <el-card class="card-content">
    <div class="header-view">
      <div class="header-left">
        <div class="l-left" v-if="searchList.length > 0">关键字：</div>
        <div class="l-content">
          <el-select
            v-for="(item, index) in searchList"
            :key="index"
            v-model="searchVal[index]"
            placeholder="Select"
            style="width: 240px"
            @change="handleChange(index)"
          >
            <el-option
              v-for="childItem in item"
              :key="childItem"
              :label="childItem"
              :value="childItem"
            />
          </el-select>
        </div>
        <div class="l-right" v-if="searchList.length > 0">
          <el-button @click="handleClear">重置</el-button>
        </div>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>
    <div class="botom-view">
      <el-collapse
        v-model="activeName"
        accordion
        @change="handleCheck(activeName)"
      >
        <el-collapse-item
          v-for="(item, index) in formData"
          :key="index"
          :name="index"
          :title="index"
        >
          <el-form
            :ref="`formRef${index}`"
            v-if="isConfig(index)"
            label-position="left"
          >
            <SeniorForm v-model:formData="formData[index]" />
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>
<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
} from "vue"
interface IConfigData {
  label: string
  value: boolean
}
export default defineComponent({
  name: "AdvanceParams",
  props: {},
  setup(props, ctx) {
    const { proxy }: any = getCurrentInstance()
    const formData = ref({})
    const activeName = ref<string>("")
    const configList = ref<IConfigData[]>([])
    const state = reactive({})
    let searchList = ref<any>([])
    let searchVal = ref<any>([])
    let submitType = ref<boolean>(true)
    onMounted(() => {
      _getParamList()
      _getSearchList(0)
    })

    // 获取参数列表
    const _getParamList = () => {
      const loading = proxy.$loading({
        lock: true,
        text: "数据加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      })
      proxy.$api.paramsApi
        .paramsSet({
          instructions: "getAdvancedParam",
        })
        .then((res: any) => {
          formData.value = res.data
          _filterConfig()
        })
        .catch((err: any) => {
          proxy.$message.error(err.msg || "参数获取失败")
        })
        .finally(() => {
          loading.close()
        })
    }

    const _getSearchList = (index: number) => {
      const loading = proxy.$loading({
        lock: true,
        text: "搜索列表获取中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      })
      proxy.$api.paramsApi
        .paramsSet({
          instructions: "searchParam",
          paramList: searchVal.value,
        })
        .then((res: any) => {
          if (Object.prototype.toString.call(res.data) === "[object Object]") {
            submitType.value = false
            formData.value = {}
            setTimeout(() => {
              formData.value = res.data
              _filterConfig()
            }, 200)
          } else {
            submitType.value = true
            searchList.value[index] = res.data
          }
        })
        .catch((err: any) => {
          proxy.$message.error(err.msg || "搜索列表获取失败")
        })
        .finally(() => {
          loading.close()
        })
    }

    const handleChange = (index: number) => {
      let num = index + 1
      for (let i = num; i <= searchVal.value.length; i++) {
        searchVal.value.splice(i, searchVal.value.length - num)
        searchList.value.splice(i, searchList.value.length - num)
      }
      _getSearchList(num)
    }

    // 重置
    const handleClear = () => {
      searchList.value = []
      searchVal.value = []
      _getParamList()
      _getSearchList(0)
      submitType.value = true
    }

    const handleCheck = (val: string) => {
      if (!val) return
      configList.value.map((item: IConfigData) => {
        if (item.label === val && activeName.value === val) {
          item.value = true
        }
      })
    }
    const _filterConfig = () => {
      for (let i in formData.value) {
        let obj = {
          label: i,
          value: false,
        }
        configList.value.push(obj)
      }
    }
    const isConfig = (val: string) => {
      return configList.value.find((item: IConfigData) => {
        if (item.label === val) return item.value
      })
    }

    // 提交数据
    const handleSubmit = () => {
      if (submitType.value) {
        let query = {
          instructions: "updateAdvancedParam",
          advancedParam: formData.value,
        }
        proxy.$api.paramsApi
          .paramsSet(query)
          .then((res: any) => {
            proxy.$alert("参数修改成功，需重启机器人后生效", "提示", {
              confirmButtonText: "知道了",
              showClose: false,
            })
            handleClear()
          })
          .catch((err: any) => {
            proxy.$message.error(err.msg || "接口异常")
          })
      } else {
        let query = {
          instructions: "updateSearchParam",
          paramData: formData.value,
          paramList: searchVal.value,
        }
        proxy.$api.paramsApi
          .paramsSet(query)
          .then((res: any) => {
            proxy.$alert("参数修改成功，需重启机器人后生效", "提示", {
              confirmButtonText: "知道了",
              showClose: false,
            })
            handleClear()
          })
          .catch((err: any) => {
            proxy.$message.error(err.msg || "接口异常")
          })
      }
    }
    return {
      ...toRefs(state),
      formData,
      activeName,
      configList,
      searchList,
      searchVal,
      submitType,
      handleCheck,
      isConfig,
      handleSubmit,
      handleClear,
      handleChange,
    }
  },
})
</script>
<style scoped lang="scss">
.card-content {
  :deep(.el-card__body) {
    height: 100%;
    overflow-y: scroll;
  }
}
.el-collapse {
  :deep(.el-collapse-item__wrap) {
    background: none !important;
  }
}
.header-view {
  width: 100%;
  text-align: right;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  .header-left {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    .l-left {
      width: 60px;
      margin-top: 20px;
      line-height: 32px;
    }
    .l-content {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .el-select {
        margin: 20px 20px 0px 0px;
      }
    }
    .l-right {
      margin-top: 20px;
      width: 160px;
    }
  }
  .header-right {
    width: 80px;
    margin-top: 20px;
  }
}
.el-form {
  :deep(.el-form-item) {
    display: flex;
    .el-form-item__label {
      width: 180px;
      padding-left: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        cursor: pointer;
        width: auto;
        color: #58a9f5;
      }
    }
    .el-form-item__content {
      width: calc(100% - 180px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
      .el-collapse {
        width: 100%;
      }
      .el-input,
      .el-switch,
      .el-input-number {
        width: 330px;
      }
    }
  }
}
:deep(.el-collapse-item__header) {
  padding-left: 20px;
}
.el-card.is-always-shadow {
  overflow: auto;
}
</style>
