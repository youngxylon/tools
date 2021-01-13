import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'

export function saveImage(domData, name = '图片') {
  html2canvas(domData).then(canvas => {
    // use Canvas API HTMLCanvasElement.toBlob()
    canvas.toBlob(function(blob) {
      saveAs(blob, `${name}.jpg`)
    })
  })
}
