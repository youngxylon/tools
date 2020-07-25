export default function downloadCsv(headers, list) {
  //整理要导出的json数据
  list.forEach(e => {
    let item = Object.assign({}, e)
    for (let key in item) {
      if (item[key] === null || item[key] === undefined) {
        item[key] = ''
      } else if (item[key].hasOwnProperty('__toString')) {
        item[key] = item[key].__toString
      }
    }
    return item
  })
  let tHeader,
    listData = ''
  //逗号隔开，每一个逗号就是隔开一个单元格
  //增加\t为了不让表格显示科学计数法或者其他格式
  list.forEach(e => {
    tHeader = ''
    for (let key in headers) {
      tHeader += headers[key].translation + ','
      listData += `${e[key] + '\t'},`
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
