const router = require('koa-router')()
const { Movie } = require('../db/model')

router.prefix('/api')

router.get('/movies/:type', async (ctx, next) => {
  const { type } = ctx.params
  const { page } = ctx.query
  const list = await Movie.findAndCountAll({
    where: {
      typeId: type
    },
    order: [
      ['updatedAt', 'DESC']
    ],
    limit: 10,
    offset: (page - 1) * 10,
  })
  // list.reverse()
  // list = list.slice((page - 1) * 10, page * 10)
  ctx.body = {
    code: 0,
    list: list.rows,
    total_page: Math.floor(list.count / 10)
  }
})

module.exports = router
