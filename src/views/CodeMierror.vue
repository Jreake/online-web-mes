<template>
	<div class="fill-narrow">
		<el-card class="fill-card">
			<div class="card-top">
				<div class="top-view">
					<div class="set-list">
						<span>文字大小：</span>
						<el-input-number
							v-model="fontSize"
							:min="12"
							:max="16"
							size="small"
						/>
					</div>
					<div class="set-list">
						<span>只读：</span>
						<el-switch v-model="readonly" />
					</div>
					<div class="set-list">
						<span>皮肤：</span>
						<el-select v-model="theme" placeholder="请选择">
							<el-option
								v-for="(item, index) in themeList"
								:key="index"
								:label="item"
								:value="item"
							>
							</el-option>
						</el-select>
					</div>
					<div class="set-list">
						<span>语言：</span>
						<el-select v-model="jsonLangue" placeholder="请选择">
							<el-option
								v-for="(langItem, langIndex) in jsonLangueList"
								:key="langIndex"
								:label="langItem"
								:value="langItem"
							>
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="btom-view">
					<!-- <el-button type="primary" @click="modal = true">弹窗编辑</el-button> -->
					<el-button type="primary" @click="handleZip">压缩</el-button>
					<el-button type="primary" @click="handleFormat">格式化</el-button>
					<!-- <el-modal
								v-model="modal"
								title="弹窗编辑"
								transition-name="fade-down"
							>
								<b-ace-editor v-model="jsonStr" height="400"></b-ace-editor>
							</el-modal> -->
				</div>
			</div>
			<div class="card-btom">
				<b-ace-editor
					v-model="jsonStr"
					:lang="jsonLangue"
					width="100%"
					height="300"
					:theme="theme"
					:readonly="readonly"
					:font-size="fontSize"
				/>
			</div>
		</el-card>
	</div>
</template>

<script>
const jsonData = {
	title: "测试json数据",
	child: [
		{
			title: "子项名称1",
			desc: "子项描述1"
		},
		{
			title: "子项名称2",
			desc: "子项描述2"
		}
	]
};
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
export default defineComponent({
	setup() {
		const jsonStr = ref(JSON.stringify(jsonData, null, 2));
		let theme = ref("cobalt");
		const fontSize = ref(12);
		const themeList = ref([
			"chrome",
			"xcode",
			"clouds",
			"crimson_editor",
			"sqlserver",
			"github",
			"textmate",
			"tomorrow",
			"solarized_light",
			"cobalt",
			"dracula",
			"monokai",
			"solarized_dark",
			"terminal",
			"vibrant_ink"
		]);
		let readonly = ref(false);
		let jsonLangue = ref("yaml");
		let jsonLangueList = ref([
			"json",
			"javascript",
			"markdown",
			"sql",
			"java",
			"elixir",
			"html",
			"css",
			"stylus"
		]);

		const handleZip = () => {
			jsonStr.value = JSON.stringify(JSON.parse(jsonStr.value), null, 0);
		};

		const handleFormat = () => {
			jsonStr.value = JSON.stringify(JSON.parse(jsonStr.value), null, 2);
		};

		return {
			jsonStr,
			theme,
			fontSize,
			themeList,
			readonly,
			jsonLangue,
			jsonLangueList,
			handleZip,
			handleFormat
		};
	}
});
</script>

<style lang="scss" scoped>
.fill-narrow,
.fill-narrow > div {
	height: 100%;
	width: 100%;
	.fill-card {
		height: 100%;
		.card-top {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			.top-view {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10px;
				padding-left: 0px;
				.set-list {
					margin-left: 20px;
					&:first-child {
						margin-left: 0px;
					}
				}
			}
			.btom-view {
				padding-bottom: 10px;
			}
		}
	}
}
</style>
