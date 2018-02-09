const {asyncQuery} = require('../utilities/db-helper')
const moment = require('moment')

module.exports = class User {
  constructor ({
    nickname,
    password,
    email,
    createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
  }) {
    this.nickname = nickname
    this.password = password
    this.email = email
    this.createdAt = createdAt
  }

  static async findByNickname (nickname) {
    return asyncQuery('SELECT * FROM `users` WHERE `nickname`=?', [nickname])
  }

  static async findByEmail (email) {
    return asyncQuery('SELECT * FROM `users` WHERE `email`=?', [email])
  }

  async save () {
    return asyncQuery('INSERT INTO `users` SET ?', this)
  }
}
