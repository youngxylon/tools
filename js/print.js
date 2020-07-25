export default function print(printDom) {
  //获取要打印的Dom内容
  let newDomHtml = this.$refs[printDom].innerHTML
  //将要打印的html赋给本页面
  window.document.body.innerHTML = newDomHtml
  //调用windos的打印接口
  window.print()
  window.location.reload() //解决打印之后按钮失效的问题，刷新页面
  return false
}