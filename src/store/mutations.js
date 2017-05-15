import * as types from './constant'
import Vue from 'vue'
import store from '@/store'

const mutations = {
	[types.APP_SET_TAB]: (state,tab) => {
		let _hasTab = false;
		state.tabCache.forEach(function (tabItem,i) {
			if (tabItem.path == tab.path) {
				Vue.set(tabItem,'info',tab.info)
				state.curTab = tabItem;
				_hasTab = true
				return
			}
		})
		if (!_hasTab) {
			state.tabCache.push(tab);
			state.curTab = tab;
		}
	},
	[types.APP_DEL_TAB]: (state,i) => {
		let _l,
			_i = i;
		state.tabCache.splice(_i,1);
		_l = state.tabCache.length;
		//获取当前tab
		state.curTab = _i < _l ? state.tabCache[_i] : state.tabCache[--_i] || {path: '/layout'};
	},
	[types.APP_SET_CUR_TAB]: (state,i) => {
		state.curTab = state.tabCache[i];
	},
	[types.APP_UPDATE_CUR_TAB]: (state,newTab) => {
		Vue.set(curTab,'info',tab.info)
	},
}
export default mutations;