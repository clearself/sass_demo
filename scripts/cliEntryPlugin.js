/* eslint-disable no-console */
const chalk = require("chalk");
const projects = require("../projects");
const { info, done, warn, error,log } = require("./utils");
//const log = console.log;
module.exports = (api, projectOptions) => {
  const { serve, build } = api.service.commands;

  const serveFn = serve.fn;
  const buildFn = build.fn;
  const logTemplate = (name) => {
    const projectConfig = require("../config");
    log(chalk.bgGreen.black(" 开启模式 "), `${process.env.VUE_APP_MODEL}: ${process.env.VUE_APP_ENV}`);
    log(chalk.bgGreen.black(" 启动项目 "), `${name == projects[name].describe ? name : projects[name].describe + ": " + name}`);
    log(chalk` ---------请确认相关默认配置--------------`);
    log(chalk` {green baseUrl:} {cyan ${projectConfig.baseUrl}}`);
    log(chalk` {green baseApi:} {cyan ${projectConfig.baseApi}}`);
    if (projectConfig[name]) {
      let prKeys = Object.keys(projectConfig[name]) || [];
      prKeys.forEach((item) => {
        log(chalk` {green ${item}:} {cyan ${projectConfig[name][item]}}`);
      });
    }
    log(chalk`-----------------------------------------`);
  };

  serve.fn = (...args) => {
    let temp = [...args];
    const _projectName = temp[0]._[0];
    if (!_projectName) return error(`请输入模块名称`);
    if (!projects[_projectName]) return error(`${_projectName} 模块不存在，请确认模块名称，或使用 npm run create ${_projectName} 创建模块`);
    temp[0]._ = [];
    return serveFn(...temp).then((res) => {
      logTemplate(_projectName);
    });
  };

  build.fn = (...args) => {
    let temp = [...args];
    const _projectName = temp[0]._[0];
    if (!_projectName) return error(`请输入模块名称`);
    if (!projects[_projectName]) return error(`${_projectName} 模块不存在，请确认模块名称，或使用 npm run create ${_projectName} 创建模块`);
    temp[0]._ = [];
    return buildFn(...temp).then((res) => {
      logTemplate(_projectName);
    });
  };
};
