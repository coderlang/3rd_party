let pwd = process.cwd();
let core = require(`${pwd}/3rd_party/script/core.js`);
let LocalDependency = core.LocalDependency;
let ThirdDependency = core.ThirdDependency;

let ThirdParty = {
  tsmd5: new ThirdDependency("ts-md5", "1.2.4"),
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
];

let WxAppDevDependencies = DevDependencies.concat([
  ThirdParty.miniprogram_api_typings
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
