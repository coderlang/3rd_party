let pwd=process.cwd();
require(`${pwd}/3rd_party/script/cmd/preinstall.js`);

let exec = (cmd) => {
  return require('child_process').execSync(cmd).toString().trim()
};

let checkIsHEADDetached = function () {
  let flag = "HEAD detached at";
  let result = exec("git branch");
  if(result.indexOf(flag)<0) {
    throw new Error(`3rd_party分支指向异常 ${result}，请处理`);
  }
};

checkIsHEADDetached();

console.log("然后执行 npm install");

