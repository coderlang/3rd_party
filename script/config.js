let pwd = process.cwd();
let core = require(`${pwd}/3rd_party/script/core.js`);
let Script = core.Script;
let LocalDependency = core.LocalDependency;
let ThirdDependency = core.ThirdDependency;

let ThirdParty = {
  ali_oss: new ThirdDependency("ali-oss", "6.1.1"),
  axios: new ThirdDependency("axios", "0.19.0"),
  babel_polyfill: new ThirdDependency("@babel/polyfill", "7.4.4"),
  echarts: new ThirdDependency("echarts", "4.2.1"),
  echarts_liquidfill: new ThirdDependency("echarts-liquidfill", "2.0.2"),
  element_ui: new ThirdDependency("element-ui", "2.4.11"),
  install: new ThirdDependency("install", "1.10.0"),
  less: new ThirdDependency("less", "3.9.0"),
  less_loader: new ThirdDependency("less-loader", "5.0.0"),
  tslib: new ThirdDependency("tslib", "1.10.0"),
  vue: new ThirdDependency("vue", "2.6.10"),
  vue_property_decorator: new ThirdDependency("vue-property-decorator", "8.1.1"),
  vue_router: new ThirdDependency("vue-router", "3.0.6"),
  connect_history_api_fallback: new ThirdDependency("connect-history-api-fallback", "1.6.0"),
  babel_eslint: new ThirdDependency("babel-eslint", "10.0.1"),
  express: new ThirdDependency("express", "4.16.2"),
  http_proxy_middleware: new ThirdDependency("http-proxy-middleware", "0.19.1"),
  types_node: new ThirdDependency("@types/node", "12.0.8"),
  babel_core: new ThirdDependency("@babel/core", "7.1.6"),
  babel_plugin_transform_runtime: new ThirdDependency("@babel/plugin-transform-runtime", "7.1.0"),
  babel_preset_env: new ThirdDependency("@babel/preset-env", "7.1.6"),
  babel_runtime: new ThirdDependency("@babel/runtime", "7.1.2"),
  babel_loader: new ThirdDependency("babel-loader", "8.0.4"),
  babel_plugin_component: new ThirdDependency("babel-plugin-component", "1.1.1"),
  css_loader: new ThirdDependency("css-loader", "1.0.0"),
  extract_text_webpack_plugin: new ThirdDependency("extract-text-webpack-plugin", "4.0.0-beta.0"),
  file_loader: new ThirdDependency("file-loader", "2.0.0"),
  html_loader: new ThirdDependency("html-loader", "0.5.5"),
  html_webpack_plugin: new ThirdDependency("html-webpack-plugin", "3.2.0"),
  optimize_css_assets_webpack_plugin: new ThirdDependency("optimize-css-assets-webpack-plugin", "5.0.1"),
  style_loader: new ThirdDependency("style-loader", "0.23.0"),
  ts_loader: new ThirdDependency("ts-loader", "6.0.2"),
  typescript: new ThirdDependency("typescript", "3.8.3"),
  uglifyjs_webpack_plugin: new ThirdDependency("uglifyjs-webpack-plugin", "2.0.1"),
  url_loader: new ThirdDependency("url-loader", "1.1.1"),
  vue_jest: new ThirdDependency("vue-jest", "3.0.4"),
  vue_loader: new ThirdDependency("vue-loader", "15.4.2"),
  vue_template_compiler: new ThirdDependency("vue-template-compiler", "2.6.10"),
  webpack: new ThirdDependency("webpack", "4.20.2"),
  webpack_cli: new ThirdDependency("webpack-cli", "3.1.2"),
  webpack_dev_middleware: new ThirdDependency("webpack-dev-middleware", "3.4.0"),
  webpack_dev_server: new ThirdDependency("webpack-dev-server", "3.5.1"),
  webpack_hot_middleware: new ThirdDependency("webpack-hot-middleware", "2.24.2"),
  copy_webpack_plugin: new ThirdDependency("copy-webpack-plugin", "5.0.3"),
  clean_webpack_plugin: new ThirdDependency("clean-webpack-plugin", "3.0.0"),
  npm: new ThirdDependency("npm", "6.13.4"),
  node: new ThirdDependency("node", "12.16.1"),
  shelljs: new ThirdDependency("shelljs", "0.8.3"),
  chalk: new ThirdDependency("chalk", "2.4.2"),
  semver: new ThirdDependency("semver", "6.1.1"),
  json_loader: new ThirdDependency("json-loader", "0.5.7"),
  webpack_manifest_plugin: new ThirdDependency("webpack-manifest-plugin", "2.0.4"),
  qrcodejs2: new ThirdDependency("qrcodejs2", "0.0.2"),
  miniprogram_api_typings: new ThirdDependency("miniprogram-api-typings", "2.9.1"),
  crypto_js: new ThirdDependency("crypto-js", "3.1.9-1"),
  d3: new ThirdDependency("d3", "4.13.0"),
  cross_env: new ThirdDependency("cross-env", "5.1.4"),
  babel_plugin_transform_vue_jsx: new ThirdDependency("babel-plugin-transform-vue-jsx", "3.5.0"),
  vuex: new ThirdDependency("vuex", "3.1.0"),
  html2canvas: new ThirdDependency("html2canvas", "1.0.0-rc.3"),
  jspdf: new ThirdDependency("jspdf", "1.5.3"),
  jszip: new ThirdDependency("jszip", "3.2.2"),
  vue_awesome_swiper: new ThirdDependency("vue-awesome-swiper", "3.1.3"),
  vue_cropper: new ThirdDependency("vue-cropper", "0.2.9"),
  xlsx: new ThirdDependency("xlsx", "0.12.13"),
  script_loader: new ThirdDependency("script-loader", "0.7.2"),
  tsmd5: new ThirdDependency("ts-md5", "1.2.4"),
  file_saver: new ThirdDependency("file-saver", "2.0.2"),
  jsmd5: new ThirdDependency("js-md5", "0.7.3"),
  moment: new ThirdDependency("moment", "2.23.0"),
  vant_weapp: new ThirdDependency("vant-weapp", "0.5.0"),
  binary_search_tree: new ThirdDependency("binary-search-tree", "0.2.6"),
};

let LocalParty = {
  Utils: {
    Trunk: new LocalDependency("utils", core.TrunkVersion),
  },
  WxWrapper:{
    V0_1: new LocalDependency("wxwrapper", "0.1.0"),
  },
  Stream: {
    Trunk: new LocalDependency("stream", core.TrunkVersion),
    V0_1: new LocalDependency("stream", "0.1.0"),
  },
  Foundation: {
    Trunk: new LocalDependency("foundation", core.TrunkVersion)
  },
  ThirdService: {
    Trunk: new LocalDependency("thirdservice", core.TrunkVersion)
  }
};

let DevDependencies = [
  ThirdParty.miniprogram_api_typings
  // , ThirdParty.typescript
  // , ThirdParty.jsmd5
  // , ThirdParty.semver
  // , ThirdParty.chalk
];

let WxAppDevDependencies = DevDependencies.concat([
]);

let VueDevDependencies = DevDependencies.concat([
  ThirdParty.babel_core
  , ThirdParty.babel_plugin_transform_runtime
  , ThirdParty.babel_polyfill
  , ThirdParty.babel_preset_env
  , ThirdParty.babel_runtime
  , ThirdParty.types_node
  , ThirdParty.babel_loader
  , ThirdParty.babel_plugin_component
  , ThirdParty.css_loader
  , ThirdParty.extract_text_webpack_plugin
  , ThirdParty.file_loader
  , ThirdParty.html_loader
  , ThirdParty.html_webpack_plugin
  , ThirdParty.optimize_css_assets_webpack_plugin
  , ThirdParty.style_loader
  , ThirdParty.ts_loader
  , ThirdParty.typescript
  , ThirdParty.uglifyjs_webpack_plugin
  , ThirdParty.url_loader
  , ThirdParty.vue_jest
  , ThirdParty.vue_loader
  , ThirdParty.vue_template_compiler
  , ThirdParty.webpack
  , ThirdParty.webpack_cli
  , ThirdParty.webpack_dev_middleware
  , ThirdParty.webpack_dev_server
  , ThirdParty.webpack_hot_middleware
  , ThirdParty.vue_property_decorator
  , ThirdParty.copy_webpack_plugin
  , ThirdParty.file_loader
  , ThirdParty.clean_webpack_plugin
  , ThirdParty.shelljs
  , ThirdParty.json_loader
  , ThirdParty.webpack_manifest_plugin
  , ThirdParty.moment
  , ThirdParty.vant_weapp
]);

module.exports = {
  ThirdParty: ThirdParty,
  VueDevDependencies: VueDevDependencies,
  WxAppDevDependencies: WxAppDevDependencies,
  LocalParty: LocalParty,
};
