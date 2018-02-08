const Comment = require('../models/comment')

exports.list = (req, res, next) => {
  // /topic/168/comment?page=2&limit=1
  // 默认每页 10 条评论
  // 默认返回第 1 页
  // 一共分多少页？
  //    向上取整(总条数 / 每页大小)
  const {page = 1, limit = 10} = req.query
  const {topicId} = req.params

  Comment.getCountByTopicId(187, (err, count) => {
    if (err) {
      return next(err)
    }
    Comment.findByTopicId({
      page, // 页码
      limit, // 每页大小
      topicId
    }, (err, comments) => {
      if (err) {
        return next(err)
      }
      res.status(200).json({
        code: 0,
        data: comments,
        count
      })
    })
  })
}

exports.create = (req, res, next) => {
  const {topicId} = req.params // 话题 id
  const {content} = req.body // 评论内容
  const userId = req.session.user.id // 评论作者

  new Comment({
    topicId,
    content,
    userId
  }).save((err, results) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      code: 0,
      message: 'success'
    })
  })
}

exports.showEdit = (req, res, next) => {
  res.send('get showEdit')
}

exports.edit = (req, res, next) => {
  res.send('post edit')
}

exports.delete = (req, res, next) => {
  res.send('post delete')
}
