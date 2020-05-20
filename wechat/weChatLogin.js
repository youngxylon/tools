import request from './request';
import store from '@/store';
export default function login() {
    //get the code and state
    if (location.search.indexOf('code') != -1) {
        let obj = {};
        let arr = location.search.slice(1).split('&');
        arr.forEach(val => {
            let arr1 = val.split('=');
            obj[arr1[0]] = arr1[1];
        });
        //wechat login
        request({
            url: '/wechat/login',
            method: 'get',
            params: obj,
        }).then(res => {
            //save the token
            store.commit('$setToken', res.data);
            location.reload()
        });
    } else {
        //need the authorized
        request({
            url: '/wechat/generate-auth-url',
            method: 'get',
            params: { redirect_url: location.href },
        }).then(res => (location.href = res.data));
    }
}
