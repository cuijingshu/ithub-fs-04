const Comment = require('../models/comment')

exports.list = (req, res, next) => {
  const {topicId} = req.params
  console.log(topicId)
  Comment.findByTopicId(topicId, (err, comments) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      code: 0,
      data: comments
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
