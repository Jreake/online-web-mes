/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent, ComponentInternalInstance } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

}
declare interface Window {
  Logger: any
  DocumentTouch: any
}
// declare module "json2yaml"
// declare module "js-yaml"
// declare module "lodash"
