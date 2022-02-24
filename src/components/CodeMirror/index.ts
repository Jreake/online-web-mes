require("brace/ext/emmet")
require("brace/ext/language_tools") // language extension
const language = [
  "json",
  "javascript",
  "markdown",
  "sql",
  "java",
  "elixir",
  "html",
  "css",
  "stylus",
  "yaml",
]
const theme = [
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
  "vibrant_ink",
]

language.forEach((lang) => {
  require("brace/mode/" + lang)
  require("brace/snippets/" + lang)
})

theme.forEach((item) => {
  require("brace/theme/" + item)
})

// 按需引入需要的语言包皮肤等资源
require("brace/ext/emmet") // 如果是lang=html时需引入
require("brace/ext/language_tools") // language extension

require("brace/mode/json")
require("brace/snippets/json")
require("brace/theme/chrome")
