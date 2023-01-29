###
Cyf123456

### 管理界面设置其他语言
1. 新建/src/admin/app.js
```js
const config = {
  locales: ['ar', 'fr', 'cs', 'de', 'dk', 'es', 'he', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no', 'pl', 'pt-BR', 'pt', 'ru', 'sk', 'sv', 'th', 'tr', 'uk', 'vi', 'zh-Hans', 'zh'],
}

const bootstrap = app => {
  console.log(app)
}

export default {
  config,
  bootstrap,
}
```
2. 重新构建
```
npm run build
```
3. 重启服务，刷新页面后就可以在个人中心的语言设置看到其他语言选项了
4. 内容国际化和这个是不相关的

### 接入七牛云
1. 自定义provider
   1. 创建provider/strapi-provider-qiniu-cyf/main.js
   2. npm init -y
   3. 创建config/plugins.js
   4. 在项目packages.json 添加依赖 `"strapi-provider-qiniu-cyf": "file:providers/strapi-provider-qiniu-cyf"`
   5. 在项目根目录npm install 安装你本地的provider
   6. 重启服务
   7. 使用npm link的方式也可以，那样不用在packages.json中指定`"strapi-provider-qiniu-cyf": "file:providers/strapi-provider-qiniu-cyf"`
2. 在provider/strapi-provider-qiniu-cyf/main.js中完善上传逻辑，接入七牛云的nodejs SDK


### 数据库
1. SQLite安装
`https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/databases/sqlite.html`
2. npm install 时也同时就安装了sqlite，上面的是单独安装
3. 项目的数据存储于.tmp/data.db文件，部署时如果没有该文件，则会根据模型的schema重新创建数据库，所以，数据模型需要现在本地开发好后部署上去，而是不是在正式环境去建立数据模型，因为这样本地开发的仓库中就没有数据模型的schema，需要通过git同步
4. 数据导出与导入
5. 原则上同步了项目shcema就行，然后再去考虑迁移数据的问题
6. [数据迁移](https://docs.strapi.io/developer-docs/latest/developer-resources/database-migrations.html)


### 部署

需要先准备好数据库

1. 配置
```
./config/server.js
```
2. 构建
```
NODE_ENV=production npm run build
```
3. 启动
```
NODE_ENV=production npm start
```

4. 可以使用pm2管理进程，并配合nginx进行反向代理

[pm2](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/optional-software/process-manager.html)


5. centos 7.6
g++: error: unrecognized command line option ‘-std=c++14’，gcc版本过低导致sqlite安装时编译失败

https://zhuanlan.zhihu.com/p/600011675
安装完后重启终端
