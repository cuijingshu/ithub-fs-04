// 路由模块

// 0. 加载 express
const express = require('express')

// 1. 创建路由创建
const router = express.Router()

// 2. 配置路由表
router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/signin', (req, res) => {
  res.send('signin')
})

router.get('/signup', (req, res) => {
  res.send('signup')
})

router.get('/signout', (req, res) => {
  res.send('signout')
})

// 3. 导出路由容器
// 4. app.js
//    加载路由模块得到路由容器
//    app.use(router)
module.exports = router
