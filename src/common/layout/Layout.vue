<template>
    <div class="layout" id="app">
        <LayoutHeader></LayoutHeader>
        <LayoutMenu></LayoutMenu>
        <div class="layout-content">
            <slot name="layout-content"></slot>
        </div>
    </div>
</template>
<script>
    import LayoutHeader from './LayoutHeader';
    import LayoutMenu from './LayoutMenu';
    import {login} from '../store/api';
    export default {
        name: 'layout',
        components: {
            LayoutHeader,
            LayoutMenu
        }
    }
</script>
<style scoped lang="scss">
    @import "../customer/sass/helper/_variable.scss";
    .layout{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-width: 600px;
        padding-top: $headerHeight;
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
    }

</style>