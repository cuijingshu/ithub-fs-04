const {query} = require('../utilities/db-helper')
const moment = require('moment')

module.exports = class Comment {
  // 类的构造函数
  // 当你 new Comment 的时候，会自动调用 constructor 构造函数
  constructor ({
    content,
    userId, // 所属用户
    topicId, // 所属话题
    createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
  }) {
    this.content = content
    this.userId = userId
    this.topicId = topicId
    this.createdAt = createdAt
  }

  // 实例方法
  // 必须听过 new 出来的 Comment 实例才能调用 save 方法
  // save () {} 只是简写而已，完全等价于 save: function () {}
  save (callback) {
    query('INSERT INTO `topic_comments` SET ?', this, callback)
  }

  static findAll (callback) {
    query('SELECT * FROM `topic_comments`', callback)
  }

  static findByTopicId (options, callback) {
    let {page, limit, topicId} = options
    page = page - 0
    limit = limit - 0

    // 限制最大为 100
    if (limit > 100) {
      limit = 100
    }

    const start = (page - 1) * limit
    console.log(start, page, limit)
    query('SELECT * FROM `topic_comments` WHERE `topicId`=? LIMIT ?,?', [topicId, start, limit], callback)
  }

  static findById (id, callback) {
    query('SELECT * FROM `topic_comments` WHERE `id`=?', [id], (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results[0])
    })
  }

  static findByIdAndUpdate (id, comment, callback) {
    query('UPDATE `topic_comments` SET `content`=? WHERE `id`=?', [comment.content, id], callback)
  }

  static findByIdAndRemove (id, callback) {
    query('DELETE FROM `topic_comments` WHERE `id`=?', [id], callback)
  }
}
