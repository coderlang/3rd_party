let pwd = process.cwd();
let fs = require("fs");
let core = require(`${pwd}/3rd_party/script/core.js`);
let Converter = core.PackageJsConverter;
let {name, version, files} = require(`${pwd}/${core.PackageInfile}`);
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

function mkdir(filepath) {
  let path = require("path");
  if (!fs.existsSync(path.dirname(filepath))) {
    mkdir(path.dirname(filepath))
  }
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath)
  }
}

function rmdir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        rmdir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function copy(from, to) {
  if (!fs.statSync(from).isDirectory()) {
    fs.copyFileSync(from, to);
    return;
  }

  if (!fs.existsSync(from)) {
    throw  new Error(`目录${from}不存在`);
  }

  if (!fs.existsSync(to)) {
    fs.mkdirSync(to);
  }
  let files = fs.readdirSync(from) || [];
  files.forEach((file, index) => {
    let targetPath = from + "/" + file;
    let toPath = to + '/' + file;
    if (fs.statSync(targetPath).isDirectory()) {
      copy(targetPath, toPath);
    } else {
      fs.copyFileSync(targetPath, toPath);
    }
  });
}


class Package {
  static run() {
    let PushRepositoryUrl = `${Repo}/${name}/${version}`;
    rmdir(PushRepositoryUrl);
    mkdir(PushRepositoryUrl);
    files.forEach((file) => {
      copy(file, `${PushRepositoryUrl}/${file}`);
    });

    let json = require(pwd + "/" + core.PackageInfile);
    let jsonobj = new Converter(core.Env.push);
    jsonobj.Convert(json);
    /**
     * 整理发布的package.json，去掉preinstall
     */
    delete json.scripts["preinstall"];
    delete json.private;

    fs.writeFileSync(PushRepositoryUrl + '/' + core.PackageOutfile, JSON.stringify(json, null, '\t'));
    copy("./package-lock.json", `${PushRepositoryUrl}/package-lock.json`);
  }
}

checkTsConfig();
Package.run();
