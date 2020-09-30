import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
function demo() {
  const formDate = new Date().toLocaleString()
  let sheetNames = this.areas.map(e => e.name)
  let data = []
  sheetNames.forEach(e => {
    data.push(formatJson(e))
  })
  //last sheet
  sheetNames.push('统计')
  // format the header
  let header = this.formHeaders.map(e => e.cn)
  const headerIndex = header.findIndex(e => e === '楼号')
  if (headerIndex !== -1) {
    header.splice(headerIndex, 1)
  }
  // multiHeader need merges to merge cells
  const multiHeader = [['导出时间:', formDate, '', '', '', '', '', '', '', '']]
  // sample 'A1:A2'
  const merges = ['B1:J1']
  // define the last sheet
  const lastSheet = []
  this.brands.forEach(e => {
    let barrel = this.amountList
      .filter(i => i.brand.id === e.id)
      .reduce((acc, cur) => acc + cur.barrel, 0)
    let returned_barrel = this.amountList
      .filter(i => i.brand.id === e.id)
      .reduce((acc, cur) => acc + cur.returned_barrel, 0)
    lastSheet.push([e.name, '送水量', barrel, '回水量', returned_barrel])
  })

  const filterVal = [
    'brand',
    'room',
    'total_remains',
    'barrel',
    'returned_barrel',
    'total_owes',
    'created_time',
    'comment',
    'status',
    'staff',
  ]

  const formatJson = sheetName => {
    let tempData = this.amountList
    if (sheetName) {
      tempData = tempData.filter(
        e => this.getProperty(e, 'area.__metadata.parent.__toString') === sheetName
      )
    }
    return tempData.map(item =>
      filterVal.map(key => {
        if (key === 'status') {
          return this.orderStatus[item[key]]
        } else if (key === 'created_time') {
          return this.parseTime(item[key])
        } else if (key === 'total_remains') {
          return item.dormitory.__metadata.stock.total_remains
        } else if (key === 'total_owes') {
          return item.dormitory.__metadata.stock.total_owes
        } else if (!item[key]) {
          return ''
        } else if (item[key].hasOwnProperty('__toString')) {
          return item[key].__toString
        }
        return item[key]
      })
    )
  }
  export_json_to_excel({
    multiHeader,
    data,
    header,
    lastSheet,
    merges,
    sheetNames,
    filename: formDate,
  })
}

//below is Export2Excel,all functions for export
function datenum(v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {}
  var range = {
    s: {
      c: 10000000,
      r: 10000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  }
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = {
        v: data[R][C],
      }
      if (cell.v == null) continue
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R,
      })

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

export function export_json_to_excel({
  multiHeader = [],
  data,
  header,
  lastSheet,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx',
  sheetNames = [],
} = {}) {
  let workbook = {
    SheetNames: [],
    Sheets: {},
  }
  let lastSheetName
  if (lastSheet) {
    lastSheetName = sheetNames[sheetNames.length - 1]
  }
  /* add worksheet to workbook */
  sheetNames.forEach((e, index) => {
    filename = filename || 'excel-list'
    let tempData
    if (e === lastSheetName) {
      tempData = lastSheet
    } else {
      tempData = data[index]
      tempData.unshift(header)
    }
    for (let i = multiHeader.length - 1; i > -1; i--) {
      tempData.unshift(multiHeader[i])
    }

    let ws = sheet_from_array_of_arrays(tempData)
    if (merges.length > 0) {
      if (!ws['!merges']) ws['!merges'] = []
      merges.forEach(item => {
        ws['!merges'].push(XLSX.utils.decode_range(item))
      })
    }
    if (autoWidth) {
      /*设置worksheet每列的最大宽度*/
      const colWidth = tempData.map(row =>
        row.map(val => {
          /*先判断是否为null/undefined*/
          if (val == null) {
            return {
              wch: 10,
            }
          } else if (val.toString().charCodeAt(0) > 255) {
            /*再判断是否为中文*/
            return {
              wch: val.toString().length * 2,
            }
          } else {
            return {
              wch: val.toString().length,
            }
          }
        })
      )
      /*以第二行为初始值*/
      let result = colWidth[1] || colWidth[0]
      for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
          if (result[j]['wch'] < colWidth[i][j]['wch']) {
            result[j]['wch'] = colWidth[i][j]['wch']
          }
        }
      }
      ws['!cols'] = result
    }

    workbook.SheetNames.push(e)
    workbook.Sheets[e] = ws
  })

  var wbout = XLSX.write(workbook, {
    bookType: bookType,
    bookSST: false,
    type: 'binary',
  })
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    }),
    `${filename}.${bookType}`
  )
}
