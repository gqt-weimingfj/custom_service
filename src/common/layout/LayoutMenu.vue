<script>
import { Menu, MenuItem, Submenu, Icon } from 'iview'
import { find } from 'lodash'

export default {
  name: 'sidebar',
  data() {
    return {
      leaf: Object.freeze(null),
      path: Object.freeze([])
    }
  },
  // 树形菜单及数组型菜单（后续可以在sidebar组件内生成树形菜单，这样参数只需传递一个）
  props: {
    menusTree: {
      required: true,
      type: Array
    },
    menus: {
      required: true,
      type: Array
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  watch: {
    // 路由变化重新渲染菜单
    '$route': function (v) {
      this.initLeaf(v.path)
      // 手动更新openItems（iview这好坑。。。）
      this.$nextTick(() => {
        if (this.$refs.sidebarMenu) {
          this.$refs.sidebarMenu.updateOpened()
        }
      })
    },
    // 检测menus，确保可以获取到leaf
    menus(v) {
      if (v.length) {
        this.initLeaf(this.$route.path)
      }
    }
  },
  methods: {
    // 获取选中叶子节点（默认第一个叶子结点）
    initLeaf(path) {
      let matchLeaf = null
      // 查看菜单中是否有匹配项
      for (let menu of this.menus) {
        if (menu.menu_path === path) {
          matchLeaf = menu
          break
        }
      }
      // 未找到匹配项，默认取菜单第一个叶子结点并跳转该路由
      if (!matchLeaf) {
        for (let menu of this.menus) {
          if (menu.menu_path) {
            this.$router.replace(menu.menu_path)
            return
          }
        }
      }
      // 获取选中节点及其祖先节点
      let _leaf = matchLeaf
      let _paths = []
      while (_leaf) {
        _paths.unshift(_leaf)
        _leaf = find(this.menus, r => {
          return r.menu_id === _leaf.parent_menu_id
        })
      }
      // 数据整理及回传（layout接收）
      this.$emit('menu-click', { paths: _paths, leaf: matchLeaf })
      this.path = Object.freeze(_paths)
      this.leaf = Object.freeze(matchLeaf)
    },
    // sidebar菜单点击事件
    leafClick(menu) {
      this.$router.push(menu.menu_path)
    },
    // 生成菜单JSX语法树
    generator(menus) {
      return menus.map(menu => {
        if (menu.children && menu.children.length) {
          return (<Submenu name={menu.menu_id}>
            <template slot="title">
              <Icon class="mr10" type="ios-navigate"></Icon>
              {menu.menu_name}
            </template>
            {this.generator(menu.children)}
          </Submenu>)
        }
        // 节点属性及事件定义
        const data = {
          nativeOn: {
            click: this.leafClick.bind(this, menu)
          },
          props: {
            name: menu.menu_id
          }
        }
        return (<Menu-item {...data}>
          {menu.menu_name}
        </Menu-item>)
      })
    }
  },
  // 第一次点击sidebar菜单会触发三次render，待查
  render(h) {
    if (!this.leaf) {
      return <div>菜单准备中。。。刷新页面！</div>
    }
    console.log(this.$route)
    let menusJSX = this.generator(this.menusTree, true)
    // 取出当前选中菜单，并展开其父节点
    let activeName = this.leaf.menu_id
    let openNames = this.path.slice(1).map(r => r.parent_menu_id)
    let data = {
      props: {
        activeName,
        openNames,
        theme: this.theme,
        width: 'auto'
      },
      ref: 'sidebarMenu'
    }
    return (
      <Menu {...data}>
        {menusJSX}
      </Menu>
    )
  }
}
</script>
<style lang="scss" scoped>
// @import '../../../scss/_variable';
.ivu-menu-item:not(.ivu-menu-item-selected) {
  &:hover {
    color: $primary !important;
  }
}
</style>
