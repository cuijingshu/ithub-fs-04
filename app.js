const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const topicRouter = require('./routes/topic')

// 开放静态资源
app.use('/node_modules', express.static('./node_modules/'))
app.use('/public', express.static('./public/'))

// 配置模板引擎
// 这里我把 art 改为 html
app.engine('html', require('express-art-template'))

// 配置 body-parser 解析表单请求体
app.use(bodyParser.urlencoded({ extended: true }))

// body-parser
// session
// ...
// 都一定要配置在挂载路由之前

// 该插件会为 req 请求对象添加一个成员：req.session 默认是一个对象
// 这是最简单的配置方式，暂且先不用关心里面参数的含义
app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

// 挂载路由容器到 app 应用程序中使路由生效
app.use(indexRouter)
app.use(userRouter)
app.use('/topic', topicRouter)

app.listen(3000, () => console.log('app listening on port 3000!'))
