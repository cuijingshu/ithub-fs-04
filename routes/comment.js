const express = require('express')

const commentController = require('../controllers/comment')
const {checkLogin} = require('../middlewares/auth')

const router = express.Router()

router
  .get('/:topicId/comment', commentController.list) // 获取话题评论列表
  .post('/:topicId/comment', checkLogin, commentController.create) // 发表评论
  .get('/:topicId/comment/:commentId/edit', commentController.showEdit) // 获取编辑评论
  .post('/:topicId/comment/:commentId/edit', commentController.edit) // 处理编辑评论
  .post('/:topicId/comment/:commentId/delete', commentController.delete) // 删除评论

module.exports = router
