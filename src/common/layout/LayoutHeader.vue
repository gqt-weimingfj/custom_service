<template>
    <div id="layoutHeader" class="layout-header">
        <div class="user-info">
            <img class="avatar" :src="userInfo.avatar"></img>
            欢迎你,
            <b>{{userInfo.name}}</b>
        </div>
        <span class="fr">
            登出<button class="btn-logout" @click="logout()">退出</button>
        </span>
    </div>
</template>
<script>
    export default {
        name: 'layoutHeader',
        props: {
            userInfo: {
                require: true,
                type: Object
            },
            logout: {
                require: true
            }
        },
		data(){
		    return{
			}
		},
		 
    }
</script>
<style scoped lang="scss">
    @import "../../scss/helper/_variable.scss";
    .layout-header{
        position: absolute;
        top: 0;
        left: $menuWidth;
        right: 0;
        height: $headerHeight;
        padding: 17px 25px 0 50px;
        background: #fff;
        color: #333;
        .user-info{
            float: left;
            display: inline-block;
            font-size: 14px;
            color: #363b49;
            .avatar{
                width: 38px;
                height: 38px;
                border-radius: 50%;
                margin-right: 5px;
                vertical-align: middle;
            }
            span{
                display: inline-block;
                color: $default;
                font-size: 14px;
                font-weight: bold;
            }
        }
        .fr{
            font-size: 14px;
            button{
                height: 34px;
                border: 1px solid $default;
                border-radius: 20px;
                background-color: #fff;
                cursor: pointer;
                &:focus{
                    box-shadow: none;
                    -webkit-box-shadow: none;
                    outline: none;
                }
                &.btn-logout{
                    width: 38px;
                    height: 38px;
                    margin-left: 5px;
                }
            }
        }
    }
</style>