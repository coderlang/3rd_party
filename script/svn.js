let pwd = process.cwd();
let core = require(`${pwd}/3rd_party/script/core.js`);
let {name, version, files, dependencies} = require(`${pwd}/${core.PackageInfile}`);


let exec = (cmd) => {
  return require('child_process').execSync(cmd).toString().trim()
};

let isReleaseVersion = () => {
  return version !== core.TrunkVersion;
};

let getSvnRelPath = () => {
  try {
    return exec("svn info --show-item relative-url");
  } catch (err) {
    console.warn("获取svn路径异常，查查这里的代码");
    return pwd;
  }
};

let SvnType = {
  SVN_TRUNK: 0,
  SVN_RELEASE: 1,
  SVN_UNKNOWN: 2,
};

let checkReleaseDependencies = () => {
  dependencies.forEach((dep) => {
    const sep = "/";
    let version = dep.getVersion();
    version = version.substr(version.lastIndexOf(sep) + sep.length);
    if (version === core.TrunkVersion) {
      throw new Error("发布releases不允许依赖trunk版本，请检查依赖" + dep.getName())
    }
  });
};

let getSvnType = () => {
  if (getSvnRelPath().indexOf("trunk") !== -1) {
    return SvnType.SVN_TRUNK;
  } else if (getSvnRelPath().indexOf("release") !== -1) {
    return SvnType.SVN_RELEASE;
  }

  return SvnType.SVN_UNKNOWN;
};

let checkVersion = () => {
  if (!/^[0-9]*$/.test(exec("svnversion"))) {
    throw new Error(`有未上传的代码或者没有up为最新代码，请使用svnversion查看`)
  }
};

let checkSvn = () => {
  if (getSvnType() === SvnType.SVN_RELEASE && !isReleaseVersion()) {
    throw new Error(`在svn releases 路径下使用了trunk的版本号(${core.TrunkVersion})`);
  } else if (getSvnType() === SvnType.SVN_TRUNK && isReleaseVersion()) {
    throw new Error(`在svn trunk 路径下使用了非trunk的版本号(${version})` +
      `，version 必须是版本${core.TrunkVersion}`);
  }

  if (getSvnType() === SvnType.SVN_RELEASE) {
    checkReleaseDependencies();
  }

  checkVersion()
};

module.exports = {
  checkSvn: checkSvn,
  // isReleaseVersion: isReleaseVersion,
};
