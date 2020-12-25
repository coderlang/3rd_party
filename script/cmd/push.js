let pwd = process.cwd();
let fs = require("fs");
let core = require(`${pwd}/3rd_party/script/core.js`);
let Repo = core.RepoUrl;

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

class Package {
  static run() {
    let PushRepositoryUrl = `${Repo}/${name}/${version}`;
    rmdir(PushRepositoryUrl);
    mkdir(PushRepositoryUrl);
    //dist和tsconfig配置相关
    files.forEach((file) => {
      if (file === "index.ts") {
        file = "index.js";
      }
      copy(`dist/${file}`, `${PushRepositoryUrl}/${file}`);
    });

    let json = require(pwd + "/" + core.PackageInfile);
    let jsonobj = new Converter(core.Env.push);
    jsonobj.Convert(json);
    /**
     * 整理发布的package.json，去掉preinstall
     */
    delete json.scripts["preinstall"];
    delete json.private;
    json.files = json.files.filter((value => value!=="index.ts"));
    json.files.push("index.js");

    fs.writeFileSync(PushRepositoryUrl + '/' + core.PackageOutfile, JSON.stringify(json, null, '\t'));
    copy("./package-lock.json", `${PushRepositoryUrl}/package-lock.json`);
  }
}

checkTsConfig();
Package.run();
