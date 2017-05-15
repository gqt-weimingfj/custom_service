<template>
    <div class="layout" id="app">
        <!-- layoutheader -->
        <layoutheader :userInfo="userInfo"></layoutheader>
        <tab-menu :tabs="tabCache"></tab-menu>
        <!-- layout-menu -->
        <div class="layout-menu">
            <div class="logo"><img src="../../assets/logo.png" height="71" width="202" alt=""></div>
            <Menu :active-name="curTab.path" theme="dark" width="auto">
                <li class="ivu-menu-item">
                    <i class="ivu-icon ivu-icon-ios-navigate"></i>
                    <span class="layout-text">旧版客服</span>
                </li>

                <li class="ivu-menu-item"
                    v-for="(menu,i) in menus"
                    @click="changeMenu(menu)"
                    :class="{'cur' : menu.path == curTab.path}"
                    :name="menu.path">
                    <i class="ivu-icon" :class="menu.icon"></i>
                    <span class="layout-text">{{menu.name}}</span>
                </li>
            </Menu>
        </div>

        <!-- tab-menu -->
      <!--   <div class="tab-menu">
            <ul>
                <li v-for="(tab,i) in tabCache" 
                    @click="changeTab(i)" 
                    :class="{'cur' : curTab.path == tab.path}">
                    {{tab.path}} 
                    <button @click.stop="closeTab(i)">x</button>
                </li>
            </ul>
        </div> -->

        <div class="layout-content">
            <keep-alive>
                <router-view ref="now"></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import layoutheader from './LayoutHeader';
    import tabMenu from './tabMenu';
    import {mapState} from 'vuex';
    import router from '@/router';
    import * as types from '@/store/constant';

    import logo from '@/assets/logo.png';



    export default {
        name: 'layout',
        data: function () {
            return {
                userInfo: {
                    name: 'Claire.J',
                    avatar: logo
                },
                menus: [
                    {
                        path: '/layout/custom_servie/list',
                        name: 'VIP认证',
                        icon: 'ivu-icon-ios-keypad'
                    },
                    {
                        path: '/layout/test1',
                        name: 'VIP认证',
                        icon: 'ios-keypad'
                    },
                ]
            }  
        },
        components: {
            layoutheader,
            tabMenu
        },
        methods: {
            addTab: function (){
                console.log('addTab')
            },
            changeMenu (menu){
                let _vm = this;
                let _router = this.$route;
                let _newRoute;
                let aTab 
                router.push(menu.path,function(rt){
                    console.log(rt)
                    _newRoute = rt;
                    aTab = {
                        path: _newRoute.path,
                        info: {
                            title: _newRoute.name || '未命名',
                            route: _newRoute
                        }
                    }
                    _vm.$store.commit(types.APP_SET_TAB,aTab);
                })
            
            },
            
            // header methods
            logout (){
                console.log('logout');
            }
        },
        computed: {
            ...mapState(['tabCache','curTab'])
        }
    }
</script>
<style scoped lang="scss">
    @import "../../scss/helper/_variable.scss";
    .layout{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-width: 600px;
        padding-top: $headerHeight + $tabHeight;
        padding-left: $menuWidth;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        overflow: hidden;
        .layout-content{
            height: 100%;
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #fff;
            overflow: auto;
        }
       
        .layout-menu{
            float: left;
            position: absolute;
            top: 0;
            left: 0;
            width: $menuWidth;
            height: 100%;
            background-color: #464c5b;
            overflow-y: auto;
        }
    }

    .layout-menu{
        .logo{
            width: $menuWidth;
            height: $headerHeight;
            background-color: $primary;
            img{
                width: $menuWidth;
                height: $headerHeight;

            }
        }
        li{
            position: relative;
            &::after{
                content: '';
                position: absolute;
                top: 0;
                right: 0px;
                width: 3px;
                height: 100%;
            }
            &.cur{
                background-color: #313540;
                color: #fff;
                &::after{
                    background-color: $primary;
                   
                }
            }
        }
    }

</style>