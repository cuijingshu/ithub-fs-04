// 路由模块

// 0. 加载 express
const express = require('express')

const topicController = require('../controllers/topic')
const topicMiddleware = require('../middlewares/topic')
const {checkLogin} = require('../middlewares/auth')

// 1. 创建路由创建
const router = express.Router()

// 话题相关
router
  .get('/create', checkLogin, topicController.showCreate)
  .post('/create', checkLogin, topicController.create)
  .get('/:topicId', topicController.showDetail)
  .get('/:topicId/edit', checkLogin, topicController.showEdit)
  .post('/:topicId/edit', checkLogin, topicMiddleware.checkEditAndRemove, topicController.edit)
  .post('/:topicId/delete', checkLogin, topicMiddleware.checkEditAndRemove, topicController.delete)

// 评论相关

// 3. 导出路由容器
// 4. app.js
//    加载路由模块得到路由容器
//    app.use(router)
module.exports = router
