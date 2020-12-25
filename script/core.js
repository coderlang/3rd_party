const Package = {
  dependencies: "dependencies",
  devDependencies: "devDependencies",
  scripts: "scripts",
  name: "name",
  version: "version",
  files: "files",
};

const RepoUrl = "3rd_party/repo";
const JsRepoUrl = "3rd_party/js-repo";
const TrunkVersion = "0.996.0";
const PackageOutfile = "package.json";
const PackageInfile = "package.js";
const PackageSign = ".package.sign";

class Script {
  constructor(name, cmd, pre = null, post = null) {
    this.name = name;
    this.cmd = cmd;
    this.pre = pre;
    this.post = post;
  }
}

const Env = {
  push: 0,
  build: 1
};

class Dependency {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }

  getName() {
    return this.name;
  }

  getVersion(env) {
    return this.version;
  }
}

class ThirdDependency extends Dependency {
}

class LocalDependency extends Dependency {
  constructor(name, repo) {
    super(name, repo);
  }

  getVersion(env) {
    return this.version;
  }
}

class PackageJsConverter {
  constructor(env = Env.build) {
    this.env = env;
  }

  convertDependencies(arrin, out) {
    out = out ? out : {};
    for (let i = 0; i < arrin.length; i++) {
      if (arrin[i] === undefined) continue;

      if (Array.isArray(arrin[i])) {
        this.convertDependencies(arrin[i], out);
        continue;
      }

      out[arrin[i].name] = arrin[i].getVersion(this.env);
    }

    return out
  }

  Convert(obj) {
    let dependencies = obj[Package.dependencies] ? obj[Package.dependencies] : [];
    if (!Array.isArray(dependencies)) {
      throw new Error(Package.dependencies + " must be Array.")
    }
    obj[Package.dependencies] = this.convertDependencies(dependencies);

    dependencies = obj[Package.devDependencies] ? obj[Package.devDependencies] : [];
    if (!Array.isArray(dependencies)) {
      throw new Error(Package.devDependencies + " must be Array.")
    }
    obj[Package.devDependencies] = this.convertDependencies(dependencies);

    /**
     *
     * 所有生成的package.json 中都需要加入这个命令，在npm run install 时都需要重新生成package.json
     * 防止直接修改了package.json 而不是通过修改 工程下的  package.js 添加的依赖
     *
     * preinstall 在 install 时会自动执行，而preinstall的命令就是 执行本转换。
     *
     * 执行自己，然后把自己加在要执行的命令中，防止漏执行了，就是一个鸡生蛋，蛋生鸡的问题。
     * 所以 需要另写一个 init之类的脚本 来初始化
     *
     */
    let scripts = obj[Package.scripts] ? obj[Package.scripts] : [];
    if (!Array.isArray(scripts)) {
      throw new Error(`${Package.scripts} must be Array`);
    }
    // initpro 命令是每一个项目必须实现的命名，命令的实际执行内容无规定，但一般都是初始化为pro的服务器
    scripts = [
      new Script("checksign", "node ./3rd_party/script/cmd/checksign.js || "
        + " npm install && node ./3rd_party/script/cmd/checksign.js ")
      , new Script("init", "node ./3rd_party/script/cmd/init.js")
      , new Script("push", "node ./3rd_party/script/cmd/push.js"
        , "npm run build")
      , new Script("pushjs", "node ./3rd_party/script/cmd/pushjs.js"
        , "npm run build")
      , new Script("build" , "tsc", "npm run checksign")
    ].concat(scripts);

    let scripts2 = {};
    for (let i = 0; i < scripts.length; i++) {
      scripts2[scripts[i].name] = scripts[i].cmd;
      if (scripts[i].pre) scripts2["pre" + scripts[i].name] = scripts[i].pre;
      if (scripts[i].post) scripts2["post" + scripts[i].name] = scripts[i].post;
    }
    obj[Package.scripts] = scripts2;
    obj["private"] = true;
  }
}

module.exports = {
  Script: Script,
  PackageJsConverter: PackageJsConverter,
  LocalDependency: LocalDependency,
  ThirdDependency: ThirdDependency,
  RepoUrl: RepoUrl,
  JsRepoUrl: JsRepoUrl,
  TrunkVersion: TrunkVersion,
  PackageInfile: PackageInfile,
  PackageOutfile: PackageOutfile,
  PackageSign: PackageSign,
  Env: Env
};
