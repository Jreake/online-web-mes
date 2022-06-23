import { createApp } from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import elementEnLocale from "element-plus/lib/locale/lang/en"; // element-plus lang
import elementZhLocale from "element-plus/lib/locale/lang/zh-CN"; // element-plus lang
import zhLocale from "./zh.js";
import enLocale from "./en.js";

const app = createApp(App);
app.use(VueI18n);

const messages = {
	en: {
		...enLocale,
		...elementEnLocale
	},
	zh: {
		...zhLocale,
		...elementZhLocale
	}
};
export function getLanguage() {
	const chooseLanguage = Cookies.get("language");
	if (chooseLanguage) return chooseLanguage;

	// if has not choose language
	const language = (
		navigator.language || navigator.browserLanguage
	).toLowerCase();
	const locales = Object.keys(messages);
	for (const locale of locales) {
		if (language.indexOf(locale) > -1) {
			return locale;
		}
	}
	return "en";
}
const i18n = new VueI18n({
	// set locale
	// options: en | zh | es
	locale: getLanguage(),
	// set locale messages
	messages
});

export default i18n;
