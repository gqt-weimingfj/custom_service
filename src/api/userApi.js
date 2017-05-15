import axios from '@/utils/fetch';
import * as API from './constant.js';

// 登陆接口
export function login (data) {
    return axios(API.API_LOGIN,{
    	data: data
    });
}

// export default {
// 	login
// };