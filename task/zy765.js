const cp = require('child_process');
const { resolve } = require('path');
const { Movie } = require('../db/model')

const movieTask = (type) => {
  const script = resolve(__dirname, '../reptile/zy765.js')

  return new Promise((resolve, reject) => {
    const child = cp.fork(script, [type])
    let invoke = false

    child.on('error', err => {
      if (invoke) return

      invoke = true

      console.log('error', err)

      reject(err)
    })

    child.on('exit', code => {
      if (invoke) return

      invoke = false

      let err = code === 0 ? null : new Error('exit code' + code)
      console.log(err)
      resolve()
    })

    child.on('message', async data => {
      let result = data.result
      for (let i = 0; i < result.length; i++) {
        let movie = await Movie.findOne({
          where: { movieId: result[i].movieId }
        })
        if (!movie) {
          result[i].create_time = Date.now()
          movie = await Movie.create(result[i])
        } else {
          await Movie.update(result[i], {
            where: { movieId: result[i].movieId }
          })
        }
      }

      resolve()
    })
  })
}

module.exports = movieTask
