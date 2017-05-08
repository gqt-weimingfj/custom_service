<template>
    <div class="layout-menu">
        <!-- <Menu active-key="1-2" width="auto" :open-keys="['1']">
            <Submenu key="1" name="1">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    导航一
                </template>
                <Menu-item key="1-1" name="1-1"><router-link to="/" exact>page index</router-link></Menu-item>
                <Menu-item key="1-1" name="1-1"><router-link to="/priceSet" exact>priceSet</router-link></Menu-item>
                <Menu-item key="1-1" name="1-1"><router-link to="/orderList" exact>运单管理</router-link></Menu-item>
            </Submenu>
        </Menu>
        <Menu active-key="1-2" width="auto" :open-keys="['1']">
            <Submenu key="1" name="1">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    导航二
                </template>
                <Menu-item key="1-2" name="1-2"><router-link to="/product" exact>product</router-link></Menu-item>
                <Menu-item key="1-3" name="1-2"><router-link to="/product-list" exact>product</router-link></Menu-item>
            </Submenu>
        </Menu> -->
        <Menu  @on-select="selectMenu"
            :open-names = "openedMenu" 
            width="auto" ref="layoutmenu">
            <Submenu key="1" :name="item.menu_id" v-for="item in menuList">
                <template slot="title">
                    <Icon :type="item.icon" size="20" style="width:20px;vertical-align:middle;    margin-bottom: 2px;"></Icon>
                    <span style="line-height:25px;">{{item.menu_name}}</span>
                </template>
                <Menu-item 
                    v-for="child in item.menu_childs" 
                    :name="child.menu_url"
                    :key="child">
                    <router-link :to="child.menu_url" exact>
                    <Icon style="width:10px;"></Icon>
                    {{child.menu_name}}
                    </router-link>
                </Menu-item>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
    export default {
        name: 'layoutMenu',
        data: function() {
            return {
                menuList: [],
                serverHost: (process.env.NODE_ENV === 'development' ? '/dev' : ''),
                successResult: 1,
                openedMenu: [],
            }
        },
        created:function(){
            this.initdata();
        },
        methods: {
            initdata: function() {
                let vm = this;
                httpServer.GET("/menu/listForCache", {
                }, function(data) {
                    if (data.result == vm.successResult) {
                        vm.menuList = data.resultObj;
                        vm.$store.state.menuList = vm.menuList;
                      
                        //alert(sessionStorage.getItem("routerName"));
                        for (let menu of vm.menuList) {
                            for (let child of menu.menu_childs) {
                                if (child.menu_url === (vm.$store.state.routerName || sessionStorage.getItem("routerName")) && vm.$route.name!='hello') {
                                    vm.openedMenu = [child.parent_menu_id];
                                }
                            }
                        }

                        vm.$nextTick(function() {
                            // vm.$refs.layoutmenu.updateActiveName()
                            vm.$refs.layoutmenu.updateOpened()
                        })
                    } else {
                        vm.$Message.error(data.resultInfo);
                    }

                });
            },
            selectMenu:function(name){
                let vm = this;
                sessionStorage.setItem("routerName",name);
                vm.$store.state.routerName=name;
            }
        }
    }


</script>
<style scoped lang="scss">
    @import "../customer/sass/helper/_variable.scss";
   .layout-menu{
        float: left;
        position: absolute;
        left: 0;
        top: $headerHeight;
        width: $menuWidth;
        height: 100%;
        overflow-y: auto;
        .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
            padding: 0;
            a{
                display: block;
                padding: 14px 24px 14px 43px;
                color: #333;
            }
        }
        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
            border-right: none;
        }
        .router-link-active,.ivu-menu-item-selected a{
            background-color: $default;
            color: #fff!important;
            border-right: 2px solid #39f;
        }
   }
</style>