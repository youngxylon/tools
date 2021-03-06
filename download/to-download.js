const download = require('./download')
const fs = require('fs')
const path = require('path') //解析需要遍历的文件夹
const filePath = path.resolve('C:/Users/xylon/Downloads/json/')

toDownload(fileDisplay(filePath))

function toDownload(files) {
  files.forEach(e => {
    const urls = JSON.stringify(e).match(/[^"|^']+\.(jpg|png)/g)
    if (urls) {
      urls.forEach(i => {
        if (i.includes('http'))
          download.image(i, `C:/Users/xylon/Downloads/json/`)
      })
    }
  })
}
function fileDisplay(filePath) {
  const result = []
  const files = fs.readdirSync(filePath)
  files.forEach(filename => {
    const fileDir = path.join(filePath, filename)
    const content = fs.readFileSync(fileDir, 'utf-8')
    result.push(content)
  })
  return result
}
