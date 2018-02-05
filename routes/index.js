// 路由模块

// 0. 加载 express
const express = require('express')

const indexController = require('../controllers/index')

// 1. 创建路由创建
const router = express.Router()

// 2. 配置路由表
router
  .get('/', indexController.showIndex)

// 3. 导出路由容器
// 4. app.js
//    加载路由模块得到路由容器
//    app.use(router)
module.exports = router
