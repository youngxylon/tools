const request = require('request')
const fs = require('fs')

class Download {
  image(url = '', path = '') {
    path += getFileName()
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .on("response", response => {
          console.log("img type:", response.headers["content-type"]);
        })
        .pipe(fs.createWriteStream(path))
        .on("error", e => {
          console.log("pipe error", e);
          resolve("");
        })
        .on("finish", () => {
          console.log("finish");
          resolve("ok");
        });
    });
    function getFileName() {
      const result = url.match(/[^/]+\.(jpg|png))/)
      return result ? result[1] : ''
    }
  }
}

module.exports = new Download()
