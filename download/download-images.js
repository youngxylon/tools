const fs = require('fs')
const path = require('path')
const request = require('request')

class DownloadImages {
  constructor(folderPath) {
    this.filepath = path.resolve(folderPath)
    this.downloadPath = folderPath
  }
  checkDownloadFolder() {
    fs.access(this.downloadPath, function (err) {
      if (err) {
        fs.mkdir(this.downloadPath)
      }
    })
  }
  download() {
    this.checkDownloadFolder()
    const files = this.getJsonData(this.filepath)
    const waitPromise = []
    files.forEach((e) => {
      const urls = JSON.stringify(e).match(/[^"|^']+\.(jpg|png)/g)
      if (urls) {
        urls.forEach((i) => {
          if (i.includes('http')) {
            waitPromise.push(this.downloadImage(i, this.downloadPath))
          }
        })
      }
    })
    Promise.all(waitPromise).then(() => {
      console.log('finished')
    })
  }
  getJsonData(filepath) {
    const result = []
    const files = fs.readdirSync(filepath)
    files.forEach((filename) => {
      const fileDir = path.join(filepath, filename)
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
        .on('error', (e) => {
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
images = new DownloadImages('C:/Users/xylon/Downloads/images/')
images.download()
