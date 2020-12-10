let pwd = process.cwd();
let fs = require("fs");
let md5 = require(`${pwd}/3rd_party/script/md5.js`);
let core = require(`${pwd}/3rd_party/script/core.js`);
if (!fs.existsSync(core.PackageSign)) {
  console.log("not found " + core.PackageSign);
  process.exit(1)
}

let md5str = fs.readFileSync(core.PackageSign).toString();
let md5str2 = fs.readFileSync(core.PackageOutfile).toString();
md5str2 = md5.hex_md5(md5str2);
if (md5str !== md5str2) {
  console.log("npm install");
  process.exit(1)
}
