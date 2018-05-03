# 移动端Vue模板 #



### 安装依赖

`$ npm install` - 安装依赖

### npm scripts

`$ npm run dll` - 打包第三方模块

`$ npm run dev` - 建立本地开发模式并启动应用程序在 http://localhost:8888/home

`$ npm run beta` - 打包开发环境 ./dist 目录下
`$ npm run test` - 打包测试环境 ./dist 目录下
`$ npm run prod` - 打包生产环境 ./dist 目录下

### 开发要求/原则

**src开发环境**

```
--- ./src
    |--- ./assets (静态资源)
    |--- ./bus (全局通讯)
    |--- ./components (组件目录)
    |--- ./config (配置)
    |--- ./http (网络配置请求)
    |--- ./less(css预编译)
    |--- ./lib(外部库文件)
    |--- ./modules(模块)
    |--- ./router(路由)
    |--- ./utils(工具)
    |--- ./views(视图)
    |--- ./vuex(状态管理)
    |--- ./App.vue(root挂载点)
    |--- ./main.js(入口)
```

### 相关链接

[mcx-ui: <https://www.npmjs.com/package/mcx-ui>]

[webpack: <http://www.css88.com/doc/webpack/guides/output-management>]

[vue: <https://cn.vuejs.org/>]
