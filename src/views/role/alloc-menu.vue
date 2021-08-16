<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配菜单</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="menus"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/api/menu'
// import { getRoleById } from '@/api/role'
import { Tree } from 'element-ui'

@Component
export default class AllocMenu extends Vue {
  @Prop({ required: true })
  private roleId: any

  private menus: any[] = []

  private defaultProps: any = {
    children: 'subMenuList',
    label: 'name'
  }

  private checkedKeys: any[] = []

  private async created () {
    await this.loadMenus()
    this.loadRoleMenus()
  }

  private async loadMenus () {
    const { data } = await getMenuNodeList()
    this.menus = data.data
  }

  private async loadRoleMenus () {
    const { data } = await getRoleMenus(this.roleId)
    this.getCheckedKeys(data.data)
  }

  private getCheckedKeys (menus: any) {
    menus.forEach((menu: any) => {
      if (menu.selected) {
        this.checkedKeys = [...this.checkedKeys, menu.id] as any
      }
      if (menu.subMenuList) {
        this.getCheckedKeys(menu.subMenuList)
      }
    })
  }

  private async onSave () {
    const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
    // 拿到选中节点的数据 id 列表
    // 请求提交保存
    await allocateRoleMenus({
      roleId: this.roleId,
      menuIdList
    })
    this.$message.success('操作成功')
    this.$router.back()
  }

  private resetChecked () {
    (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
  }
}
</script>

<style scoped></style>
