let pwd = process.cwd();
let core = require(`${pwd}/3rd_party/script/core.js`);
let {name, version, files, dependencies} = require(`${pwd}/${core.PackageInfile}`);


let exec = (cmd) => {
  return require('child_process').execSync(cmd).toString().trim()
};

let checkVersion = () => {
  const flag = "nothing to commit, working tree clean";
  if (exec("git status").indexOf(flag)<0) {
    throw new Error(`有未上传的代码或者没有pull为最新代码，请使用git status查看`)
  }
};

let checkHEADDetached = () => {
  let flag = "HEAD detached at";
  let result = exec("git status");
  if(result.indexOf(flag)>=0) {
    throw new Error(`3rd_party分支指向异常 ${result}，请处理`);
  }
};

module.exports = {
  checkVersion:checkVersion,
  checkHEADDetached:checkHEADDetached,
};