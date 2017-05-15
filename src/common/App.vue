<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
// import Layout from '@/common/layout/Layout';

export default {
	  name: 'app',
	  data: function () {
	  	return {
	  	}
	  },
	  computed: {
	  	// isLogin() {
	  	// 	return this.$store.state.isLogin;
	  	// }
	  },
	  // components: {Layout}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
