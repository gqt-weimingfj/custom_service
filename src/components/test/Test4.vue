<template>
	<div>
		<div><input type="text" name="" v-model="test"></div>
		<button @click="rm"></button>
	</div>
</template>
<script>
	import * as types from '@/store/constant';
	export default {
		data (){
			return {
				test: ''
			}
		},
		mounted: function () {
			let _vm = this;
			let _router = _vm.$route
			let _routerPath = _vm.$route.path
			let _store = _vm.$store
			let sdt,key

			// _vm.$store.commit(types.APP_ADD_TAB,_router)
			// console.log('d')
			// _vm.$store.commit(types.APP_ADD_TAB,{
			// 	name: 'test4',
			// 	title: 'test4 tab',
			// 	data: this.$data,
			// 	router: _router,
			// })

		},
		computed: {
			data(){

			}
		},
		methods: {
			rm(){
				console.log()
			}
		},
		created: function (){
			

			// console.dir(ddd);

			// if (_store.state.tabCache[_routerPath]) {
			// 	sdt = _store.state.tabCache[_routerPath].data;
			// }else{

			// 	_store.state.tabCache[_routerPath] ={
			// 		name: 'test4',
			// 		data: data,
			// 		router: _router
			// 	}
			// 	sdt =  data;
			// }
			// for(key in sdt){
			// 	_vm.$data[key] = sdt[key]
			// }

			// console.dir(_store.state.tabCache)
		
		}

	}
</script>
<style scoped>
    
</style>