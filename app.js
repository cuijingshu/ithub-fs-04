const express = require('express')
const app = express()

const router = require('./router')

// 开放静态资源
app.use('/node_modules', express.static('./node_modules/'))
app.use('/public', express.static('./public/'))

// 配置模板引擎
// 这里我把 art 改为 html
app.engine('html', require('express-art-template'))

// 挂载路由容器到 app 应用程序中使路由生效
app.use(router)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
