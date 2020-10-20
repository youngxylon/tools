export function getQueryParamByKey(paramName: string): string {
  let url = document.location.toString()
  // 如果url中有特殊字符则需要进行一下解码
  url = decodeURI(url)
  let arrObj = url.split('?')
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&')
    for (let i = 0; i < arrPara.length; i++) {
      let arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paramName) {
        return decodeURIComponent(arr[1])
      }
    }
  }
  return ''
}
