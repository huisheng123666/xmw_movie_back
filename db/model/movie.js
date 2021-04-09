/**
 * @description 电影模型
 * @author xmw
 */

const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('sequelize')

const Movie = seq.define('movie', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  movieId: {
    type: STRING
  },
  typeId: {
    type: STRING
  },
  rate: {
    type: STRING
  },
  title: {
    type: STRING
  },
  cover: {
    type: STRING
  },
  directory: {
    type: STRING
  },
  writer: {
    type: STRING
  },
  type: {
    type: STRING
  },
  country: {
    type: STRING
  },
  language: {
    type: STRING
  },
  open_time: {
    type: STRING
  },
  description: {
    type: TEXT('long')
  },
  actors: {
    type: STRING
  },
  video_url: {
    type: STRING
  }
})

module.exports = Movie
