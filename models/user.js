const Sequelize = require('sequelize')
const db = require('../utilities/db-orm')

module.exports = db.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  nickname: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.BOOLEAN
  },
  birthday: {
    type: Sequelize.DATE
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

// const {asyncQuery} = require('../utilities/db-helper')
// const moment = require('moment')

// module.exports = class User {
//   constructor ({
//     nickname,
//     password,
//     email,
//     createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
//   }) {
//     this.nickname = nickname
//     this.password = password
//     this.email = email
//     this.createdAt = createdAt
//   }

//   static async findByNickname (nickname) {
//     return asyncQuery('SELECT * FROM `users` WHERE `nickname`=?', [nickname])
//   }

//   static async findByEmail (email) {
//     return asyncQuery('SELECT * FROM `users` WHERE `email`=?', [email])
//   }

//   async save () {
//     return asyncQuery('INSERT INTO `users` SET ?', this)
//   }
// }
