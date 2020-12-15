let pwd = process.cwd();
let core = require(`${pwd}/3rd_party/script/core.js`);
let LocalDependency = core.LocalDependency;
let ThirdDependency = core.ThirdDependency;

let ThirdParty = {
  tsmd5: new ThirdDependency("ts-md5", "1.2.4"),
};

let LocalParty = {
  Utils: {
    Master: new LocalDependency("utils", "git+https://github.com/coderlang/utils.git"),
  },
  Foundation: {
    Master: new LocalDependency("foundation", "git+https://github.com/coderlang/foundation.git")
  },
  WebWrapper: {
    Master: new LocalDependency("webwrapper", "git+https://github.com/coderlang/webwrapper.git")
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
