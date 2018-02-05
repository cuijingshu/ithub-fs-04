const topic = require('../models/topic')
const moment = require('moment')

exports.showCreate = (req, res, next) => {
  topic.findAll((err, topics) => {
    if (err) {
      return next(err)
    }
    res.render('topic/create.html', {
      topics
    })
  })
}

exports.create = (req, res, next) => {
  // 1. 获取表单提交的数据
  // 2. 数据验证
  // 3. 操作数据库
  // 4. 发送响应
  const topicData = {
    ...req.body,
    createdAt: moment().format('YYYY-MM-DD HH:m:ss'),
    userId: req.session.user.id
  }

  topic.save(topicData, (err, results) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      code: 0,
      message: 'success'
    })
  })
}

exports.showDetail = (req, res, next) => {
  res.send('get showDetail')
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
