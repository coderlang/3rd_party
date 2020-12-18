let git = require(`${pwd}/3rd_party/script/git.js`);
git.checkHEADDetached();

let pwd=process.cwd();
require(`${pwd}/3rd_party/script/cmd/preinstall.js`);
console.log("然后执行 npm install");

