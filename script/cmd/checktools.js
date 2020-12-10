'use strict'
const chalk = require('chalk');
const semver = require('semver');
let {ThirdParty} = require("../config.js");

// 此命令因为有其他依赖，暂未使用，后续再思考怎么处理。

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: exec('node --version').substring("v".length),
    versionRequirement: ">=" + ThirdParty.node.getVersion()
  }
  ,{
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: ">=" + ThirdParty.npm.getVersion()
  }
  ,{
    name: 'tsc',
    currentVersion: exec('tsc --version').substring("Version ".length),
    versionRequirement: ">=" + ThirdParty.typescript.getVersion()
  }
];

function check () {
  const warnings = [];
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    console.log();
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log('  ' + warning)
    }
    console.log()
  }
}

check();
