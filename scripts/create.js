const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const { log, info, done, warn, error } = require("./utils");

let projects = require("../projects");
const { api, route, mian, page, image } = require("../template");

const args = process.argv.splice(2);
const defaultModule = [
  {
    name: "api",
    func: api,
    file: "index.js"
  },
  {
    name: "router",
    func: route,
    file: "index.js"
  },
  {
    name: "views",
    func: mian,
    file: "index.js"
  },
  {
    name: "views",
    func: page,
    file: "index.vue"
  },
  {
    name: "assets/images",
    func: image,
    file: "index.svg"
  }
];

if (args && args.length < 1) return error("请输入需要新增的模块");

const _projectName = args[0]; //工程名称
if (projects[_projectName]) return error("模块重复，请重新确认模块名称");

const paths = `../projects.json`;
projects[_projectName] = {};
projects[_projectName]["describe"] = args[1] || _projectName;

fs.writeFile(resolve(__dirname, paths), JSON.stringify(projects, null, 2), (err) => {
  if (err) error("文件写入失败");
});
fs.readFile(resolve(__dirname, paths), "utf8", (err) => {
  if (err) return error(err);
});
const writeFileRecursive = function ({ name, func, file, type }, callback) {
  let path = resolve(__dirname, `../src/${name}/${_projectName}/${file}`);
  const buffer = func && func(_projectName);
  const tempPath = path.replace(/\\/g, "/");
  let lastPath = type != "file" ? tempPath.substring(0, tempPath.lastIndexOf("/")) : path;
  const isExists = fs.existsSync(lastPath);
  if (!isExists) {
    const err = fs.mkdirSync(lastPath);
    if (err) return callback(err);
  }

  if (type != "file") {
    const err2 = fs.writeFileSync(path, buffer);
    if (err2) return callback(err2);
    return callback(null);
  } else {
    return callback(null);
  }
};

const createTemplate = () => {
  return new Promise((reslove, reject) => {
    let succes = true;
    defaultModule.forEach(({ name, func, file, type }, index) => {
      writeFileRecursive({ name, func, file, type }, (err) => {
        if (err) {
          reject(err);
          succes = false;
        } else {
          log(`create file :src/${name}/${_projectName}/${file}  ` + chalk.green("success ✔"));
        }
      });
      if (index == defaultModule.length - 1 && succes) reslove();
    });
  });
};

createTemplate()
  .then(() => {
    done(`${_projectName} 服务创建成功`);
    log(chalk`

    ---------可使用启动命令运行---------

   npm run serve ${_projectName}
   yarn serve ${_projectName}

`);
  })
  .catch((err) => {
    error(err);
  });
