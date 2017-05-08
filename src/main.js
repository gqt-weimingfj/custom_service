// css
import './customer/sass/base.scss';//布局body html 修改
import 'iview/dist/styles/iview.css'

// base
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import store from './vuex/vuex'
import iView from 'iview'
import App from './App'
import AMap from 'vue-amap';
import VueResouse from 'vue-resource'
import VeeValidate  from 'vee-validate';
// customer

import messagesCN from '@/customer/js/validate/zh_CN.js';
//import messagesCN from 'vee-validate/dist/locale/zh_CN.js';
import validation from '@/customer/js/validate/validation.js';
import httpServer from '@/customer/js/httpServer';
import '@/customer/js/imgUpload.js';
import '@/customer/js/md5.js';
import '@/customer/lib/jquery.dragsort-0.5.2.js';

// vee validate config
const veeConfig = {
    errorBagName: 'errors', 
    delay: 0,       
    locale: 'cn',    
    messages: null,     
    strict: true,      
    dictionary:{      
        cn: { messages: messagesCN.messages }       
    }     
 }; 

Vue.config.productionTip = false;
Vue.use(iView)
Vue.use(AMap);
Vue.use(VueResouse);
// use vee-validate
Vue.use(VeeValidate,veeConfig);

AMap.initAMapApiLoader({
  key: 'e8b89eec99fc35548f74387a0a2b3ccd', //08a5f5ad200e8743d05eeaf24990cfc9  e8b89eec99fc35548f74387a0a2b3ccd
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.DistrictSearch', 'AMap.LngLat']
});

/* eslint-disable no-new */
const rootVue = new Vue({
  // data () {
  //   return {
  //     b : '1',
  //     o : {},
  //     message: ''
  //   }
  // },
  el: '#app',
  store,
  router,
  template: '<App></App>',
  components: {App},
  mounted() {
    // this.$set(this.o,'c',2)
    // this.o.d = 3;
    // console.info(this.o)
  }
})

export default rootVue;

// console.info('aa:' + vm.$b)
// vm.message = 'new message' // 更改数据
// vm.$Message.success('删除成功');
// console.info(vm.$el.textContent === 'new message') // false
// Vue.nextTick(function () {
//   console.info(arguments.length)
//   console.info(arguments) // true
// })
