<template>
  <div class="alloc-resource">
    <el-card>
      <div slot="header">
        <span>分配资源</span>
      </div>
      <el-tree
        ref="tree"
        :data="resources"
        node-key="id"
        :props="defaultProps"
        show-checkbox
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultCheckedKeys"
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
import {
  getAllResources,
  allocateRoleResources,
  getRoleResources
} from '@/api/resource'
import { getResourceCategories } from '@/api/resource-category'
import { Tree } from 'element-ui'

@Component
export default class AllocResource extends Vue {
  @Prop({ required: true })
  private roleId: any

  private resources: any[] = []
  private defaultProps: any = {
    children: 'children',
    label: 'name'
  }

  private defaultCheckedKeys: any[] = []

  private created () {
    this.loadResources()
    this.loadRoleResources()
  }

  private async loadResources () {
    const ret = await Promise.all([getAllResources(), getResourceCategories()])
    const resources = ret[0].data.data
    const resourceCategories = ret[1].data.data

    resources.forEach((r: any) => {
      const category = resourceCategories.find(
        (c: any) => c.id === r.categoryId
      )
      if (category) {
        category.children = category.children || []
        category.children.push(r)
      }
    })
    // 修改顶层分类 ID：因为分类 ID 和资源 ID 冲突
    resourceCategories.forEach((item: any) => {
      item.id = Math.random()
    })

    this.resources = resourceCategories
  }

  private async loadRoleResources () {
    const { data } = await getRoleResources(this.roleId)
    this.getCheckedResources(data.data)
  }

  private getCheckedResources (resources: any) {
    resources.forEach((r: any) => {
      r.resourceList &&
        r.resourceList.forEach((c: any) => {
          if (c.selected) {
            this.defaultCheckedKeys = [...this.defaultCheckedKeys, c.id] as any
          }
        })
    })
  }

  private async onSave () {
    const checkedNodes = (this.$refs.tree as Tree).getCheckedNodes()
    const resourceIdList: number[] = []
    checkedNodes.forEach(item => {
      if (!item.children) {
        resourceIdList.push(item.id)
      }
    })
    await allocateRoleResources({
      roleId: this.roleId,
      resourceIdList
    })
    this.$message.success('保存成功')
    this.$router.back()
  }

  private resetChecked () {
    (this.$refs.tree as Tree).setCheckedKeys([])
  }
}
</script>

<style scoped></style>
