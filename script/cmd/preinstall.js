let pwd = process.cwd();
let fs = require("fs");
let md5 = require(`${pwd}/3rd_party/script/md5.js`);
let core = require(`${pwd}/3rd_party/script/core.js`);
let Converter = core.PackageJsConverter;

const packageInT = `
let {core} = require("./3rd_party/script/core.js");
let {ThirdParty, VueDevDependencies, WxAppDevDependencies, LocalParty} = require("./3rd_party/script/config.js");

module.exports = {
  name: "xxx",
  version: '0.0.0',
  scripts: [
  ],
  files: ["src", "index.ts"],
  dependencies: [
  ],
  devDependencies: [
    WxAppDevDependencies
  ],
  "miniprogram": "."
};
`;

class Package {
  static run() {
    let packageIn = pwd + "/" + core.PackageInfile;
    if (!fs.existsSync(packageIn)) {
      fs.writeFileSync(core.PackageInfile, packageInT);
      console.log("please complete " + core.PackageInfile + ", 然后再次执行init");
      process.exit(1);
    }
    let obj = require(packageIn);
    let converter = new Converter();
    converter.Convert(obj);
    fs.writeFileSync(core.PackageOutfile, JSON.stringify(obj, null, '\t') + "\n");
    let md5str = md5.hex_md5(fs.readFileSync(core.PackageOutfile).toString());
    fs.writeFileSync(core.PackageSign, md5str);
    console.log("构建package.json成功");
  }
}

Package.run();