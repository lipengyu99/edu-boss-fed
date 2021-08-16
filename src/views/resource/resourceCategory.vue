<template>
  <div>
    <el-card shadow="always">
      <div slot="header">
        <el-button type="primary" size="default" @click="add">添加</el-button>
      </div>
      <el-table :data="tableArr">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          v-for="col in columns"
          :prop="col.prop"
          :key="col.id"
          :label="col.label"
          :width="col.width"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="primary" size="small" @click="edit(row)"
              >编辑</el-button
            >
            <el-button type="primary" size="small" @click="remove(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="title" :visible.sync="modalBool" width="30%">
        <el-form
          :model="modalData"
          label-width="80px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="名称">
            <el-input v-model="modalData.name"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="modalData.sort"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onOK">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  getResourceCategories,
  saveOrderUpdate,
  deleteResource
} from '@/api/resource-category'
@Component
export default class ResourceCategory extends Vue {
  private add () {
    this.title = '新增资源'
    Object.keys(this.modalData).forEach(k => {
      this.modalData[k] = ''
    })
    this.modalBool = true
    this.loadResource()
  }

  private title = ''
  private modalData: any = {
    id: '',
    name: '',
    sort: ''
  }

  private modalBool = false
  private tableArr: any[] = []

  private columns: any[] = [
    {
      prop: 'name',
      label: '名称'
    },
    { prop: 'createdTime', label: '创建时间' },
    { prop: 'id', label: '排序' }
  ]

  private created () {
    this.loadResource()
  }

  private loadResource () {
    getResourceCategories().then(res => {
      this.tableArr = res.data.data
    })
  }

  private edit (row: any) {
    this.title = '编辑资源'
    this.modalBool = true
    const { id, name, sort } = row
    this.modalData = { id, name, sort }
  }

  private remove (row: any) {
    this.$confirm('是否删除该资源', '删除提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        deleteResource(row.id).then(() => {
          this.$message.success('删除成功')
          this.loadResource()
        })
      })
      .catch(() => {
        this.$message.info('取消删除')
      })
  }

  private onCancel () {
    this.modalBool = false
  }

  private onOK () {
    saveOrderUpdate(this.modalData).then(res => {
      console.log(res)

      this.modalBool = false
      this.$message.success(
        `${this.title === '编辑资源' ? '编辑' : '新增'}成功`
      )
      this.loadResource()
    })
  }
}
</script>

<style scoped></style>
