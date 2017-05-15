import store from '@/store';
import Layout from '@/common/layout/Layout';//布局
import Test1 from '@/components/test/Test1';//测试
import Login from '@/components/login_register/login';//登陆

import RouterView from '@/components/router_view';//路由嵌套层
import CustomServieList from '@/components/custom_servie/list';
import CustomServieEdit from '@/components/custom_servie/edit';
import CustomServieDetail from '@/components/custom_servie/detail';

export default [
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
    	meta: { requiresAuth: true },
        children: [
        	{
	        	path: '',
	        	name: 'test1',
	        	component: Test1,
	        },
        	{
	        	path: 'custom_servie',
	        	name: 'custom_servie',
                component: RouterView,
                children: [
                    {
                        path: '',
                        name: 'custom_servie',
                        redirect: 'list'
                    },
                    {
                        path: 'list',
                        name: 'custom_servie',
                        component: CustomServieList,
                    },
                    {
                        path: 'edit/:id',
                        name: 'custom_servie_edit',
                        component: CustomServieEdit,
                    },
                    {
                        path: 'detail/:id',
                        name: 'custom_servie_detail',
                        component: CustomServieDetail,
                    }
                ]
	        },



        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
]
