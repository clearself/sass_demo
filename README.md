# Vue多项目脚手架

## 相关命令

### 创建项目

```sh
npm create 项目名称
```

项目创建成功后会在根目录下 `projects.json` 添加项目配置，可查找以生成的相关项目名称和配置

ps:npm run create 项目名称 项目描述【可为中文描述】
不可用 yarn create 创建项目 因 crate 命令 yarn 有自实现

### 运行开发环境

```sh
npm run serve 项目名称
//or
yarn serve 项目名称
```

开发环境下默认会自动注入 vconsole 调试工具

### 开发环境打包

```sh
npm run build:test 项目名称
//or
yarn build:test 项目名称
```

#### 开发环境打包并唤起 `webpack-bundle-analyzer`
```sh
npm run build:test 项目名称 report
//or
yarn build:test 项目名称 report
```

### 线上环境打包

```sh
npm run build 项目名称
//or
yarn build 项目名称
```

#### 线上环境打包并唤起 `webpack-bundle-analyzer`
```sh
npm run build 项目名称 report
//or
yarn build 项目名称 report
```

<block>

### 项目打包优化拓展

如需使用 cdn 加速，可在`project.json`中如下配置

```json
{
  "projectName": {
    "describe": "项目描述",
    "cdn": {
      "externals": {
        "vue": "Vue",
        "vue-router": "VueRouter",
        "axios": "axios",
        "vuex": "Vuex"
      },
      "js": [
        "https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js",
        "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
        "https://cdn.bootcss.com/axios/0.19.0/axios.min.js",
        "https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js"
      ],
      "css": []
    }
  }
}
```
