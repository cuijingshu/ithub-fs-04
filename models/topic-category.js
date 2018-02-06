const {query} = require('../utilities/db-helper')

exports.findAll = callback => {
  query('SELECT * FROM `topic_categories`', callback)
}
