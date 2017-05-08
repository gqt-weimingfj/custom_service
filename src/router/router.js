
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/vuex/vuex'
import rootVue from '../main';
Vue.use(Router)

let router = new Router({routes});
// let noFilter = ['hello', 'orderAdd'] 
router.beforeEach((to, from, next) => {
 	if (to.matched.some(record => record.meta.openRight)) {
 		//不需要登录页面
 		next();
 	} else {
 		// 需要登录页面 判断登陆状态
 		// if (store.state.isLogin) {
			//  console.info('to.name :' + to.name)
			// if (noFilter.indexOf(to.name) != -1) {
			// 	next();
			// 	return ;
			// }
			//  (function initMenu() {
				
			// 	if (!store.state.menuList) {
			// 		setTimeout(function() {
			// 			initMenu();
			// 		}, 500);
			// 		return;
			// 	}
			// 	// console.info(from);
			// 	// Vue.$message('请重新登录');
				
			// 	let valid = false;
				
			// 	for (let i = 0, len = store.state.menuList.length; i < len; i++) {
			// 		validMenu(store.state.menuList[i], to.name);
			// 	}

			// 	function validMenu(curMenu, menuUrl) {
   //                  if (curMenu.menu_url === menuUrl) {
			// 			valid = true;
			// 			return;
			// 		}
			// 		for (let i = 0, len = curMenu.menu_childs.length; i < len; i++) {
			// 			validMenu(curMenu.menu_childs[i], menuUrl);
			// 		}
   //              }
			// 	if (valid) {
			// 		next();
			// 	} else {
			// 		rootVue.$Message.error('暂无权限');
			// 	}

			// })();
 			
 		// } else {
 		// 	next({
 		// 		path: '/login',
 		// 	});
 		// }
 	}
});

export default router;