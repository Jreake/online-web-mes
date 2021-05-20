<template>
    <div class="container">
        <!-- 左侧组件 -->
        <div class="left-board">
            <div class="logo-wrapper">
                <div class="logo">
                    <img :src="logo" alt="logo" /> 首页
                    <!-- <a class="github" href="https://github.com/JakHuang/form-generator" target="_blank">
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt>
          </a> -->
                </div>
            </div>
            <el-scrollbar class="left-scrollbar">
                <div class="components-list">
                    <div
                        v-for="(item, listIndex) in leftComponents"
                        :key="listIndex"
                    >
                        <div class="components-title">
                            <svg-icon icon-class="component" />
                            {{ item.title }}
                        </div>
                        <draggable
                            class="components-draggable"
                            :list="item.list"
                            :group="{
                                name: 'componentsGroup',
                                pull: 'clone',
                                put: false
                            }"
                            :clone="cloneComponent"
                            draggable=".components-item"
                            :sort="false"
                            @end="onEnd"
                        >
                            <div
                                v-for="(element, index) in item.list"
                                :key="index"
                                class="components-item"
                                @click="addComponent(element)"
                            >
                                <div class="components-body">
                                    <svg-icon
                                        :icon-class="element.__config__.tagIcon"
                                    />
                                    {{ element.__config__.label }}
                                </div>
                            </div>
                        </draggable>
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <!-- 中间画布生成器 -->
        <div class="center-board">
            <div class="action-bar">
                <el-button icon="el-icon-video-play" type="text" @click="run">
                    运行
                </el-button>
                <el-button icon="el-icon-view" type="text" @click="showJson">
                    查看json
                </el-button>
                <el-button
                    icon="el-icon-download"
                    type="text"
                    @click="download"
                >
                    导出vue文件
                </el-button>
                <el-button
                    class="copy-btn-main"
                    icon="el-icon-document-copy"
                    type="text"
                    @click="copy"
                >
                    复制代码
                </el-button>
                <el-button
                    class="delete-btn"
                    icon="el-icon-delete"
                    type="text"
                    @click="empty"
                >
                    清空
                </el-button>
            </div>
            <!-- <el-scrollbar class="center-scrollbar">
                <el-row class="center-board-row" :gutter="formConf.gutter">
                    <el-form
                        :size="formConf.size"
                        :label-position="formConf.labelPosition"
                        :disabled="formConf.disabled"
                        :label-width="formConf.labelWidth + 'px'"
                    >
                        <draggable
                            class="drawing-board"
                            :list="drawingList"
                            :animation="340"
                            group="componentsGroup"
                        >
                            <draggable-item
                                v-for="(item, index) in drawingList"
                                :key="item.renderKey"
                                :drawing-list="drawingList"
                                :current-item="item"
                                :index="index"
                                :active-id="activeId"
                                :form-conf="formConf"
                                @activeItem="activeFormItem"
                                @copyItem="drawingItemCopy"
                                @deleteItem="drawingItemDelete"
                            />
                        </draggable>
                        <div v-show="!drawingList.length" class="empty-info">
                            从左侧拖入或点选组件进行表单设计
                        </div>
                    </el-form>
                </el-row>
            </el-scrollbar> -->
        </div>

        <!-- 右侧 -->
        <rightPanel
            :active-data="activeData"
            :form-conf="formConf"
            :show-field="!!drawingList.length"
            @tag-change="tagChange"
            @fetch-data="fetchData"
        />
    </div>
</template>

<script>
import logo from '@/assets/logo.png';
import { inputComponents, selectComponents, layoutComponents, formConf } from './components/generator/config';
import RightPanel from './components/RightPanel';
import drawingDefalut from './components/generator/drawingDefalut'

export default ({
    components: {
        RightPanel
    },
    data () {
        return {
            logo,
            // 输入选择性组件
            leftComponents: [
                {
                    title: '输入型组件',
                    list: inputComponents
                },
                {
                    title: '选择型组件',
                    list: selectComponents
                },
                {
                    title: '布局型组件',
                    list: layoutComponents
                }
            ],
            activeData: drawingDefalut[0],
            formConf,
            drawingList: drawingDefalut,


        }
    },
    methods: {
        // 拖拽后生产json数据
        cloneComponent (origin) {
            console.log(origin)
            const clone = deepClone(origin)
            const config = clone.__config__
            config.span = this.formConf.span // 生成代码时，会根据span做精简判断
            this.createIdAndKey(clone)
            clone.placeholder !== undefined && (clone.placeholder += config.label)
            tempActiveData = clone
            return tempActiveData
        },
        onEnd (obj) {
            console.log(obj)
            if (obj.from !== obj.to) {
                this.fetchData(tempActiveData)
                this.activeData = tempActiveData
                this.activeId = this.idGlobal
            }
        },
    }
})



</script>

<style lang='scss'>
@import "@/styles/home";
</style>