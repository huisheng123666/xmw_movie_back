/**
 * @description sequelize实例
 * @author xmw
 */

const Sequelize = require('sequelize')

const conf = {
  host: '127.0.0.1',
  dialect: 'mysql'
}

// test不要打印日志
if (process.env.NODE_ENV === 'production') {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (process.env.NODE_ENV === 'production') {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000 // 如果一个链接池10s之内没有被使用，则释放
  }
}


const seq = new Sequelize('xmw_movie', 'root', '817102', conf)

module.exports = seq
