const {query, parseToWhereStr} = require('../utilities/db-helper')

exports.findAll = (...args) => {
  let callback
  let conditionObj = {}

  if (args.length === 1) {
    callback = args[0]
  } else if (args.length === 2) {
    conditionObj = args[0]
    callback = args[1]
  }

  const whereSql = parseToWhereStr(conditionObj)

  query('SELECT * FROM `topics`' + whereSql, callback)
}

exports.findByCategoryId = (categoryId, callback) => {
  query('SELECT * FROM `topics` WHERE categoryId=?', [categoryId], callback)
}

exports.findById = (id, callback) => {
  const sqlStr = 'SELECT * FROM `topics` WHERE `id`=?'
  query(sqlStr, [id], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results[0])
  })
}

exports.findByIdAndRemove = (id, callback) => {
  const sqlStr = 'DELETE FROM `topics` WHERE `id`=?'
  query(sqlStr, [id], callback)
}

exports.save = (topic, callback) => {
  const sqlStr = 'INSERT INTO `topics` SET ?'
  query(sqlStr, topic, callback)
}

exports.findByIdAndUpdate = (id, topic, callback) => {
  const sqlStr = 'UPDATE `topics` SET `title`=?, `content`=?, `categoryId`=? WHERE `id`=?'
  query(sqlStr, [topic.title, topic.content, topic.categoryId, id], callback)
}

// class Topic {
//   static findAll () {

//   }

//   static findByIdAndRemove () {

//   }
// }
