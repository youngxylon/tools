import wx from "weixin-js-sdk";
export function wxConfig(data){
	let appId = data.appId;
	let timestamp = data.timestamp;
	let nonceStr = data.nonceStr;
	let signature = data.signature;
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appId, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature, // 必填，签名，见附录1
		jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
}
export function wxPay(data) {
	//获取后台传入的数据
	// let appId = data.appId;
	let timestamp = data.timestamp;
	let nonceStr = data.nonceStr;
	// let signature = data.signature;
	let package1 = data.package;
	let paySign = data.paySign;
	let signType = data.signType;
	console.log("发起微信支付");
	//下面要发起微信支付了
	// wx.config({
	// 	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 	appId: appId, // 必填，公众号的唯一标识
	// 	timestamp: timestamp, // 必填，生成签名的时间戳
	// 	nonceStr: nonceStr, // 必填，生成签名的随机串
	// 	signature: signature, // 必填，签名，见附录1
	// 	jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	// });
	wx.ready(function() {
		wx.chooseWXPay({
			timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
			package: package1, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			paySign: paySign, // 支付签名
			success: function(res) {
				// 支付成功后的回调函数
				uni.showToast({
				    title: '支付成功',
					icon:'success'
				});
			},
			fail: function(res) {
				//失败回调函数
				uni.showToast({
				    title: '支付失败',
					icon:'none'
				});
			}
		});
	});
	wx.error(function(res) {
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		/*alert("config信息验证失败");*/
	});
}
export function wxShare(data) {
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
		jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function() {
		//需在用户可能点击分享按钮前就先调用
		wx.updateAppMessageShareData({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: imgUrl, // 分享图标
			success: function() {
				// 设置成功
			}
		});
		wx.updateTimelineShareData({
			title: title, // 分享标题
			link: desc, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: imgUrl, // 分享图标
			success: function() {
				// 设置成功
			}
		});
	});
}
