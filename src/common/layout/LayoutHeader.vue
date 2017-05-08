<template>
    <div id="layoutHeader" class="layout-header">
        <img src="../assets/logo.png" height="40" width="242" class="logo">
        <div class="user-info">
            <h5>浙江未名揽配</h5>
            <span>{{user.user_name}}</span> | <span>cds-揽配管理员</span>
        </div>
        <div class="right-box">
           <router-link :to="{name: 'orderAdd'}"> <button class="btn-order">开单</button></router-link>
            <button class="btn-logout" @click="logout()">退出</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'layoutHeader',
		data(){
		    return{
			     user: {}
			}
		 },
		 created() {
		     this.user = JSON.parse(sessionStorage.getItem("user") || '{}');
	     },
        methods: {
            logout: function () {
                let vm = this;
				//退出清除session
				httpServer.GET("/user/logout",{},function(data){});
				localStorage.removeItem('user');
                let isLogin = vm.$store.state.isLogin;
                console.log(this.$store.state.isLogin)
                vm.$store.commit('setIsLogin',false);
                vm.$router.replace('/login')
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../customer/sass/helper/_variable.scss";
    .layout-header{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: $headerHeight;
        border-bottom: 3px solid $default;
        .logo{
            margin: 8px 15px 0 10px;
            vertical-align: bottom; 
        }
        .user-info{
            display: inline-block;
            h5{
                font-size: 14px;
                font-weight: normal;
            }
            span{
                display: inline-block;
                color: $default;
                font-size: 14px;
                font-weight: bold;
            }
        }
        .right-box{
            float: right;
            margin-top: 11px;
            button{
                min-width: 80px;
                background-color: #fff;
                height: 34px;
                border: 1px solid $default;
                border-radius: 20px;
                cursor: pointer;
                &:focus{
                    box-shadow: none;
                    -webkit-box-shadow: none;
                    outline: none;
                }
                &.btn-order{
                    border: 1px solid $default;
                    border-radius: 20px;

                }
                &.btn-logout{

                }
            }
        }
    }
</style>