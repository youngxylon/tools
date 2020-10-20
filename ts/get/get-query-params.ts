export function getQueryParams() :object{
  let url = document.location.toString()
  // 如果url中有特殊字符则需要进行一下解码
  url = decodeURI(url)
  let arr1 = url.split('?')
  let obj = {}
  if (arr1.length > 1) {
    let arr2 = arr1[1].split('&')
    for (let i = 0; i < arr2.length; i++) {
      let curArr = arr2[i].split('=')
      obj[curArr[0]] = decodeURIComponent(curArr[1])
    }
  }
  return obj
}
