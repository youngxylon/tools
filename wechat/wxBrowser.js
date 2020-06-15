export default function wxBrowser() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return new Promise(res=>res(true));
    } else {
        return new Promise(res=>res(false));
    }
}
