import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import action from './action'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
	state,
	mutations,
	action,
	getters
})
export default store