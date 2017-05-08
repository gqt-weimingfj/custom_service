<template>
	<Lyout v-if="isLogin">
		<router-view slot="layout-content"></router-view>
	</Lyout>

	<router-view v-else="!isLogin"></router-view>
</template>

<script>
import Lyout from '@/components/Layout.vue';

export default {
	  name: 'app',
	  data: function () {
	  	return {
	  	}
	  },
	  computed: {
	  	isLogin() {
	  		return this.$store.state.isLogin;
	  	}
	  },
	  components: {Lyout}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
