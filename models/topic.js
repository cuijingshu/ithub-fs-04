const {query} = require('../utilities/db-helper')

exports.findAll = callback => {
  query('SELECT * FROM `topic_categories`', callback)
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

exports.save = (topic, callback) => {
  const sqlStr = 'INSERT INTO `topics` SET ?'
  query(sqlStr, topic, callback)
}

