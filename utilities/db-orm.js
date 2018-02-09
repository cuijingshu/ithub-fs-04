const Sequelize = require('sequelize')

const sequelize = new Sequelize('ithub', 'root', '123456', {
  host: 'localhost',
  // dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize
