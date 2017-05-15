<template>
	<div class="tab-menu">
	    <ul>
	        <li v-for="(tab,i) in tabCache" 
	            @click="change(i)" 
	            :class="{'cur' : curTab.path == tab.path}">
	            {{tab.path}} 
	            <button @click.stop="close(i)">x</button>
	        </li>
	    </ul>
	</div>
</template>
<script>
	import router from '@/router';
	import * as types from '@/store/constant';
	import {mapState} from 'vuex';
	export default {
		props: {},
		data() {
			return {}
		},
		computed: {
			...mapState([ 'tabCache','curTab'])
		},
		methods: {
			change (i){
				let _vm = this;
				_vm.$store.commit(types.APP_SET_CUR_TAB,i);
				router.push(_vm.curTab.path);
			},
			close (i){
				let _vm = this;
				_vm.$refs.now.$destroy()
				_vm.$store.commit(types.APP_DEL_TAB,i);
				router.push(_vm.curTab.path);
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "../../scss/helper/_variable.scss";
	.tab-menu{
	    position: absolute;
	    top: $headerHeight;
	    left: $menuWidth;
	    right: 0;
	    overflow-y: hidden;
	    li{
	        float: left;
	        display: inline-block;
	        padding: 0 10px;
	        margin-right: 10px;
	        border: 1px solid #000;
	        &.cur{
	            background-color: #313540;
	            color: #fff;

	        }
	    }
	}
</style>