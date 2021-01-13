export default function saveCsv(headers, list) {
  function dataProcess(data) {
    let objData = Object.assign({}, data)
    for (let key in objData) {
      if (objData[key] === null || objData[key] === undefined) {
        objData[key] = ''
      }
      if (Object.prototype.hasOwnProperty.call(objData[key], '__toString')) {
        objData[key] = objData[key].__toString
      }
    }
    return objData
  }

  let tHeader,
    listData = ''
  list.forEach(e => {
    //整理要导出的json数据
    const data = dataProcess(e)
    tHeader = ''
    for (let key in headers) {
      //逗号隔开，每一个逗号就是隔开一个单元格
      tHeader += headers[key].translation + ','
      //增加\t为了不让表格显示科学计数法或者其他格式
      listData += `${data[key] + '\t'},`
    }
    listData += '\n'
  })
  const csvData = `${tHeader}\n${listData}`

  //encodeURIComponent解决中文乱码
  let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csvData)
  //通过创建a标签实现
  let link = document.createElement('a')
  link.href = uri
  //对下载的文件命名
  link.download = '表格.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
