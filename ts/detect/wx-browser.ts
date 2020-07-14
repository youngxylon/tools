//Determine if weixin browser
export default function wxBrowser(): boolean {
  const regex: RegExp = new RegExp('MicroMessenger', 'i')
  return regex.test(navigator.userAgent)
}
