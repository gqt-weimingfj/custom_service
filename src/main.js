// css
import '@/scss/base.scss'; //布局body html 修改
import 'iview/dist/styles/iview.css'

// base
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import iView from 'iview'
import App from '@/common/App'

Vue.use(iView)

/* eslint-disable no-new */
const appVue = new Vue({
    el: '#app',
    store,
    router,
    template: '<App></App>',
    components: { App },
    mounted() {}
})

export default appVue;
