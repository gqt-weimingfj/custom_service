import * as types from './constant.js';
import api from '@/api';

export default {
	login: ({commit},userData) => {
		return api.login(userData).then((user) => {
			commit(types.APP_LOGIN,user)
		})
	},
	logout: ({commit}) => {
		return api.logout().then(() => {
			commit(types.APP_LOGOUT)
		})
	}
}