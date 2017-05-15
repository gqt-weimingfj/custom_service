<template>
	<div>
		<div>{{test}}</div>
		<input type="text" v-model="test">
	</div>
</template>
<script>
	export default {
		data (){
			return {
				test: 'test1'
			}
		},
	}
</script>
<style scoped>
    
</style>