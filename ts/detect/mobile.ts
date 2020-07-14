//Determine if mobile device
export default function mobile(): boolean {
  const regex: RegExp = new RegExp(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/,
    'i'
  )
  return regex.test(navigator.userAgent)
}
