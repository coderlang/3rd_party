let pwd = process.cwd();
let fs = require("fs");

function findTsConfig(filename, keys) {
  if (keys == null || keys.length === 0) {
    return true
  }

  let json = fs.readFileSync(filename);
  json = JSON.parse(json);
  let found = true;
  let next = json;
  for (let i = 0; i < keys.length; i++) {
    next = next[keys[i]];
    if (next == null) {
      found = false;
      break
    }
  }
  if (found) {
    return true
  }

  let extend = json["extends"];
  if (extend != null) {
    return findTsConfig(`${pwd}/` + extend, keys)
  }

  return false
}

function checkTsConfig() {
  if (!findTsConfig(`${pwd}/tsconfig.json`, ["compilerOptions", "outDir"])) {
    throw  new Error(`tsconfig's compilerOptions must config outDir, eg:outDir=dist`);
  }
}

let exec = (cmd) => {
  return require('child_process').execSync(cmd).toString().trim()
};

class Package {
  static run() {
    let commitId = exec("git rev-parse HEAD");
    console.log(`commitId ${commitId}`);
  }
}

checkTsConfig();
Package.run();
