const mysql = require('mysql')
const {dbConfig} = require('../config')
const util = require('util')

const pool = mysql.createPool(dbConfig)

// 提示：只要你原来的函数是 Error First 风格的 API 都可以使用 util.promisify 来转换为 promise APi
// const getConnection = util.promisify(pool.getConnection)

exports.query = (...args) => {
  // 从数组中弹出最后一个元素 callback 回调函数
  const callback = args.pop()

  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err)
    }

    connection.query(...args, function (err, results) { // ...results => [err, results, fields]
      // 释放回连接池
      connection.release()
      // 把 ...results => [err, results, fields] 展开调用 callback 继续往外抛
      if (err) {
        return callback(err)
      }
      callback(null, results)
    })
  })
}

function getConnection () {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err ? reject(err) : resolve(connection)
    })
  })
}

exports.asyncQuery = async (...args) => {
  const connection = await getConnection()
  return new Promise((resolve, reject) => {
    connection.query(...args, (err, results) => {
      // 释放回连接池
      connection.release()
      err ? reject(err) : resolve(results)
    })
  })
}

// 将一个对象转换成 SQL where 字符串语句
exports.parseToWhereStr = (whereObj = {}) => {
  let whereSql = 'WHERE 1=1'
  for (let key in whereObj) {
    let item = whereObj[key]

    // 判断如果有对象的属性值是有效的，才进行条件语句拼接
    if (item) {
      if (typeof item === 'string') {
        item = `'${item}'`
      }
      whereSql += ` AND ${key}=${item} `
    }
  }
  return whereSql
}
