// 根据环境引入不同配置 process.env.NODE_ENV
const config = process.env.VUE_APP_ENV ? require("./env." + process.env.VUE_APP_ENV) : require("./env.development");
module.exports = config;
