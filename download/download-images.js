const fs = require('fs')
const path = require('path')
const request = require('request')
const download = require('./download')

class DownloadImages {
  constructor() {
    this.filePath = path.resolve('C:/Users/xylon/Downloads/url/')
  }
  download() {
    const files = this.getJsonData(this.filePath)
    const waitPromise = []
    files.forEach(e => {
      const urls = JSON.stringify(e).match(/[^"|^']+\.(jpg|png)/g)
      if (urls) {
        urls.forEach(i => {
          if (i.includes('http')) {
            waitPromise.push(
              this.downloadImage(i, `C:/Users/xylon/Downloads/url/`)
            )
          }
        })
      }
    })
    Promise.all(waitPromise).then(() => {
      console.log('👌👌👌')
    })
  }
  getJsonData(filePath) {
    const result = []
    const files = fs.readdirSync(filePath)
    files.forEach(filename => {
      const fileDir = path.join(filePath, filename)
      const stat = fs.statSync(fileDir)
      if (stat.isFile()) {
        const content = fs.readFileSync(fileDir, 'utf-8')
        result.push(content)
      }
      // if (stat.isDirectory()) {
      //   fileDisplay(fileDir)
      // }
    })
    return result
  }
  downloadImage(url = '', path = '') {
    path += this.getImageName(url)
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .pipe(fs.createWriteStream(path))
        .on('error', e => {
          console.log('pipe error', e)
          resolve('')
        })
        .on('finish', () => {
          resolve('ok')
        })
    })
  }
  getImageName(url) {
    const result = url.match(/[^/]+\.(jpg|png)/)
    return result ? result[0] : ''
  }
}
images = new DownloadImages()
images.download()
