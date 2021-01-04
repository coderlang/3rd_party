let pwd = process.cwd();
let core = require(`${pwd}/3rd_party/script/core.js`);
let LocalDependency = core.LocalDependency;
let ThirdDependency = core.ThirdDependency;

let ThirdParty = {
  tsmd5: new ThirdDependency("ts-md5", "1.2.4"),
  axios: new ThirdDependency("axios", "0.19.0"),
};

let LocalParty = {
  Utils: {
    Master: new LocalDependency("utils", "git+https://github.com/coderlang/utils.git#a52669ef798d54fe900b1458e7cd33f10fc9a3e0"),
  },
  Foundation: {
    Master: new LocalDependency("foundation", "git+https://github.com/coderlang/foundation.git#60d1086bb3ac9fc6a2c74225a5b7ffad97758d2b")
  },
  WebWrapper: {
    Master: new LocalDependency("webwrapper", "git+https://github.com/coderlang/webwrapper.git#ecb44998d1fafdaf313cd3f33b077849e40aa5ff")
  }
};

let DevDependencies = [
];

let WxAppDevDependencies = DevDependencies.concat([
]);

let VueDevDependencies = DevDependencies.concat([
]);

module.exports = {
  ThirdParty: ThirdParty,
  VueDevDependencies: VueDevDependencies,
  WxAppDevDependencies: WxAppDevDependencies,
  LocalParty: LocalParty,
};
