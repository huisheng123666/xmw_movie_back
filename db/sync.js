/**
 * @description sequelize 同步数据库
 * @author xmw
 */

const seq = require('./seq')
require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('db ok')
}).catch(() => {
  console.log('db err')
})

// 执行同步,(同步数据库模型数据)
// force 删除已有表建立新表
// alter 修改同名数据表结构，以适用模型。
// 不传 只有当数据库中不存在与模型同名的数据表时，才会同步
seq.sync({ alter: true }).then(() => {
  console.log('db sync ok')
  process.exit()
})