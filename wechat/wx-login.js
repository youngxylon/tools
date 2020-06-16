import request from './request';
export default function login() {
    //get the code and state
    if (location.search.includes('code') && location.search.includes('state')) {
        let obj = {};
        let arr = location.search.slice(1).split('&');
        arr.forEach(val => {
            let arr1 = val.split('=');
            obj[arr1[0]] = arr1[1];
        });
        //wechat login
        request({
            url: '/wechat/official/api-login',
            method: 'get',
            params: obj,
        }).then(res => {
            //save the token
            localStorage.setItem('token', res.data);
            location.replace(location.origin + location.pathname);
            //   location.reload();
        });
    } else {
        //need the authorized
        request({
            url: '/wechat/generate-auth-url',
            method: 'get',
            params: { redirect_url: location.href },
        }).then(res => {
            location.replace(res.data);
        });
    }
}
