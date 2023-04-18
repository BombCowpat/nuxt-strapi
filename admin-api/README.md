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
3. 项目的数据存储于.tmp/data.db文件，部署时如果没有该文件，则会根据模型的schema重新创建数据库，所以，数据模型需要现在本地开发好后部署上去，而是不是在正式环境去建立数据模型（正式环境本身也限制了改功能），因为这样本地开发的仓库中就没有数据模型的schema，需要通过git同步
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

### 前端项目管理插件
1. [掘金博客](https://juejin.cn/post/7127660343408459812)
2. [插件创建](https://docs.strapi.io/developer-docs/latest/development/plugins-development.html#create-a-plugin)
3. [插件接口](https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/server.html)
4. [组件库](https://design-system.strapi.io/)
5. 去github参考已经开源的官方插件进行开发
6. 插件项目分为admin和server，分别是管理界面和接口部分，管理界面基于react，server基于koa
7. server开发流程：service->controller->route
8. axiosInstance的请求路径要以`/`开头，不然部署后请求路径会多出/admin/plugins



### 账号
2016534791@qq.com
Cyf123456

## 内容管理
### 基本使用流程
1. 创建模型
2. 去内容管理选择模型创建内容条目
3. 修改模型权限为公共角色可访问
4. 去内容管理发布内容条目
5. 访问接口/api/模型绑定路径

### 官网模型
1. 页面数据模型(使用单一类型模型)，每个页面有自己的数据模型
2. 新闻模型（使用集合类型模型）

### 问题
1. 部署，接入公司业务数据库
2. 图片和文字的国际化处理？
   1. 使用json结合前端本地国际化框架
   2. 分别使用三个字段
   3. 使用关联模型
   4. 使用框架自带国际化，REST API 支持国际化查询（推荐）
   5. 前端框架如何接入？nuxt.js(https://github.com/nuxt-modules/i18n/tree/main)(https://i18n.nuxtjs.org/)
3. 图片视频资源管理，接入腾讯云存储
   1. 自定义provider
   2. 链接本地provider
   3. 修改config/plugins配置
4. 内容管理模块使用
5. 融合业务，定制接口，参考后端定制部分
6. 接口关联查询，查询出关联的字段/媒体文件 ?populate=*，获取国际化内容?locale=en/zh
7. 如何查询组件关联的图片字段
8. 预览？ 静态页面生成
   1. 使用nuxt服务端渲染中间件提供API接口
   2. https://www.nuxtjs.cn/api/configuration-servermiddleware
   3. 提供一个执行 npm run generate 的服务，子线程执行生成指令

9. npm run develop --watch-admin 无法实时更新,查githubissue 发现使用 yarn develop --watch-admin 才有效
10. 组件，媒体文件字段属于关联字段，使用?populate=*只能查询第一层的关联字段，对于第二层的关联字段需要单独查询，比如?populate[0]=activity.activityImage&populate[1]=venue.venueImage，可以分别查询两个组件内的媒体文件
11. 普通字段可以使用fields进行筛选，重复数据尽量使用模型构造器去构造类型，而不是使用可重复组件，因为组件没有对应的api接口
