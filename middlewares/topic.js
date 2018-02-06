const topic = require('../models/topic')

exports.checkEditAndRemove = (req, res, next) => {
  const {topicId} = req.params
  topic.findById(topicId, (err, ret) => {
    if (err) {
      return next(err)
    }
    
    if (!ret) {
      return res.status(200).json({
        code: 1,
        message: '该资源已不存在'
      })
    }

    if (ret.userId !== req.session.user.id) {
      return res.status(200).json({
        code: 2,
        message: '你个坏孩子，别玩儿了（话题不是当前登陆用户的）'
      })
    }

    // 验证通过，将执行权交给下一个中间件
    next()
  })
}
