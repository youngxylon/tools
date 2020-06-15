import wx from 'weixin-js-sdk';
// npm install weixin-js-sdk
request({
    url: 'wechat/build-jssdk-config',
    method: 'get',
    params: {
        url: location.href.split('#')[0],
        apis: 'updateAppMessageShareData,updateTimelineShareData',
    },
}).then(res => {
    let data = res.data;
    data.link = data.url + '?sharedId=' + id;
    data.title = '生成我的安全专属清单';
    data.desc = '生成专属安全清单还能抽奖赢好礼';
    data.imgUrl = location.origin + '/index/static/share.jpg';
    wxShare(data);
});

function wxShare(data) {
    //获取后台传入的数据
    let appId = data.appId;
    let timestamp = data.timestamp;
    let nonceStr = data.nonceStr;
    let signature = data.signature;
    let title = data.title;
    let desc = data.desc;
    let link = data.link;
    let imgUrl = data.imgUrl;
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            },
        });
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            },
        });
    });
}
