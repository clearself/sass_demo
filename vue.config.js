const path = require("path");
const vConsolePlugin = require("vconsole-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const projects = require("./projects");
const isProd = process.env.NODE_ENV === "production";

const args = process.argv.splice(2);
let _projectName = args[2]; //工程名称

const isUseCDN = projects[_projectName] && projects[_projectName].cdn;
process.env.VUE_APP_TITLE = _projectName;

//设置别名
const createWebpackConfig = () => {
  return {
    alias: {
      images: `@/assets/images/${_projectName}`
    },
    outputDir: `dist/${_projectName}`,
    entry: `src/views/${_projectName}/index.js`
  };
};
let data = createWebpackConfig() || {};

let pulgins = [
  new vConsolePlugin({
    filter: [], // 需要过滤的入口文件
    enable: process.env.VUE_APP_ENV !== "production" // 是否自动注入vconsole
  })
];
if (isProd) {
  pulgins = [
    ...pulgins,
    ...[
      new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css$/,
        // 超过4kb压缩
        threshold: 4096
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: args[3] === 'report' ? 'server' : 'disabled',
        generateStatsFile: args[3] === 'report',
        statsOptions: { source: true }
      })
    ]
  ];
  if (process.env.VUE_APP_ENV == "production") {
    pulgins = [
      ...pulgins,
      ...[
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] // 移除console
            }
          }
        })
      ]
    ];
  }
}
//configureWebpack 配置模版
let webpackConfig = {
  resolve: {
    alias: data.alias
  },
  plugins: pulgins
};

if (isUseCDN) {
  //是否使用cdn配置
  const proWebpackCDN = projects[_projectName].cdn;
  webpackConfig.externals = proWebpackCDN.externals;
}

module.exports = {
  publicPath: isProd ? "././" : "/",
  productionSourceMap: !isProd,
  outputDir: data.outputDir,
  lintOnSave: false,
  css: {
    extract: isProd
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: webpackConfig,
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true); // 修复热更新失效
    config.plugins.delete("prefetch");
    config.optimization.minimize(true);
    if (isUseCDN) {
      config.plugin("html-index").tap((args = []) => {
        args[0].cdn = projects[_projectName].cdn;
        return args;
      });
    }
  },
  devServer: {
	  
  },
  pages: {
    index: {
      entry: data.entry,
      template: "public/index.html"
    }
  }
};
