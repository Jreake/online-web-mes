import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/assets/css/common.less";
import locale from "element-plus/lib/locale/lang/zh-cn";
import axios from "@/utils/request";
import CodeEditor from "bin-code-editor";
import "@/utils/lib/styles/index.css";
import Editor from "@/components/bin-ace-editor";
import "@/components/CodeMirror/index";
import lodash from "lodash";
import "./styles/index.scss";

import FreeForm from "@/components/FreeForm/index.vue";
import TextForm from "@/components/TextForm/index.vue";

// 测试
import "@/utils/Promise/Promise";

import "@/utils/methods/algorithm.js";

const app = createApp(App);
app.config.performance = true;
app.use(ElementPlus, { size: "small", locale });

app.config.globalProperties.$http = axios;
app.config.globalProperties.$lodash = lodash;

app.use(store);
app.use(router);
app.use(CodeEditor);
app.component(Editor.name, Editor);
app.component(FreeForm.name, FreeForm);
app.component(TextForm.name, TextForm);
app.mount("#app");
