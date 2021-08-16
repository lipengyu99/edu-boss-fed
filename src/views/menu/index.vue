<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ path: '/menu/create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="menus" style="width: 100%">
        <el-table-column label="编号" min-width="150" type="index">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" min-width="150">
        </el-table-column>
        <el-table-column prop="level" label="菜单级数" min-width="150">
        </el-table-column>
        <el-table-column prop="icon" label="前端图标" min-width="150">
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" min-width="150">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAllMenus, deleteMenu } from '@/api/menu'

@Component
export default class Menu extends Vue {
  private menus: any[] = []

  private created () {
    this.loadAllMenus()
  }

  private async loadAllMenus () {
    const { data } = await getAllMenus()
    if (data.code === '000000') {
      this.menus = data.data
    }
  }

  private handleEdit (item: any) {
    this.$router.push({
      name: 'menu-edit',
      params: {
        id: item.id
      }
    })
  }

  private handleDelete (item: any) {
    this.$confirm('确认删除吗？', '删除提示', {})
      .then(async () => {
        const { data } = await deleteMenu(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenus() // 更新数据列表
        }
      })
      .catch(err => {
        console.log(err)
        this.$message.info('已取消删除')
      })
  }
}
</script>

<style scoped></style>
