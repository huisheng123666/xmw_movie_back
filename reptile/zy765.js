const superagent = require('superagent')
const cheerio = require('cheerio')

const random = Math.floor(Math.random() * 3) + 1

console.log(random)

const listUrl = (type) => `http://www.765zy.com/?m=vod-type-id-${type}-pg-${random}.html`

const type = process.argv[process.argv.length - 1]

let listIndex = 0

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

async function getList() {
  console.log(listUrl(type))
  const res = await superagent.get(listUrl(type))
  const $ = cheerio.load(res.text)
  const movieLinks = []
  $('.xing_vb ul').map((index, ele) => {
    if ($(ele).find('.xing_vb4').length) {
      movieLinks.push($(ele).find('.xing_vb4 a').attr('href'))
    }
  })
  return movieLinks
}

async function getHtml(url) {
  const res = await superagent.get(url)
  return res.text
}

async function getDetail(html, id) {
  const $ = cheerio.load(html)
  const movie = {
    movieId: id,
    typeId: type,
    writer: ''
  }
  movie.rate = $('.vodh label').text()
  if (Number(movie.rate) < 6) {
    return null
  }
  movie.title = $('.vodh h2').text()
  movie.cover = $('.vodImg img').attr('src').split(' ')[0]
  if (!movie.cover.startsWith('http')) {
    movie.cover = 'http://www.765zy.com' + movie.cover
  }
  movie.directory = $('.vodinfobox ul li').eq(1).find('span').text()
  movie.type = $('.vodinfobox ul li').eq(4).find('span').text()
  movie.country = $('.vodinfobox ul li').eq(5).find('span').text()
  movie.language = $('.vodinfobox ul li').eq(6).find('span').text()
  movie.open_time = $('.vodinfobox ul li').eq(7).find('span').text()
  movie.description = $('.vodplayinfo').text()
  $('input[name=copy_sel]').map((index, ele) => {
    if ($(ele).attr('value').indexOf('m3u8') >= 0) {
      movie.video_url = $(ele).attr('value')
    }
  })
  movie.actors = $('.vodinfobox ul li').eq(2).find('span').text()
  return movie
}

;(async () => {
  const list = await getList()
  const result = []
  for (let i = 0; i < list.length; i++) {
    const html = await getHtml('http://www.765zy.com' + list[i])
    const detail = await getDetail(html, list[i].split('-')[3].split('.')[0])
    if (detail) {
      result.push(detail)
      console.log(detail.title, detail.video_url)
    }
    await sleep(1500)
  }

  process.send({ result })
  await sleep(1000)
  process.exit(0)
})()
