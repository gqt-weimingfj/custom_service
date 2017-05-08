<template>
	<div class="layout">
		<Table :columns="columns" :data="list"></Table>
		<i-button @click="console">dd</i-button>
		


		<div class="column is-12">
		    <label class="label" for="email">Email</label>
		    <p :class="{ 'control': true }">
		        <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
		        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
		    </p>
		</div>

	</div>
</template>
<script>
	const dataList = [
		{name: 'list1',price: 22},
		{name: 'list2',price: 22},
	];
	console.log(dataList)
	export default {
		data (){
			return {
				self: this,
				list: dataList,
				thirdObj: {
					price: 222,
					d1: '',
					d1: '',
					d1: '',
					d1: '',
					d1: '',
				},
				columns: [
					{
						title: 'name',
						key: 'name',
					},
					{
						title: 'price',
						key: 'price',
						render (row,col,i){
							return `<Input v-model="thirdObj.price" placeholder="请输入..." style="width: 200px"></Input>`;
						}
					},
					{
						title: '操作',
						key: 'op',
						render (row,col,i){
							var d = row.name;
							return `<Button type="primary" @click="add(${i})">添加</Button><Button @click="del(${i})">删除</Button>`

						}
					},
				]
			}
		},
		methods: {
			add(i){
				var vm = this;
				list[i]
				thirdObj.d1 = list[i].d1;
				thirdObj.d2 = list[i].d2;
				thirdObj.d1 = list[i].d1;
				thirdObj.d1 = list[i].d1;
				console.log(i)
				
			},
			console: function () {
				console.log(this.dd)
			},
			del(i){
				console.log(i)
			},
		}
	}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        min-height: 600px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>