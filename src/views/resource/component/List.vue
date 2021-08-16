<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="btnGroup">
          <el-button type="primary" size="default" @click="add">添加</el-button>
          <el-button
            type="primary"
            size="default"
            @click="$router.push('/resourceCategory')"
            >资源分类</el-button
          >
        </div>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="url" width="180" label="资源路径">
        </el-table-column>
        <el-table-column prop="description" width="180" label="描述">
        </el-table-column>
        <el-table-column width="180" prop="createdTime" label="添加时间">
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      />
      <el-dialog :title="title" :visible.sync="modalBool" width="40%">
        <el-form
          :model="modalData"
          ref="modal"
          label-width="80px"
          :inline="true"
          size="normal"
        >
          <el-form-item label="资源名称">
            <el-input v-model="modalData.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="modalData.url"></el-input>
          </el-form-item>

          <el-form-item label="资源分类">
            <el-select
              v-model="modalData.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="modalData.description"></el-input>
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
import { getResourcePages, saveOrUpdate, deleteResource } from '@/api/resource'
import { getResourceCategories } from '@/api/resource-category'
import { Form } from 'element-ui'

@Component
export default class ResourceList extends Vue {
  private resources: any[] = []
  private title = ''
  private row = null
  private options: any[] = []
  private modalBool = false
  private modalData: any = {
    id: '',
    name: '',
    categoryId: '',
    url: '',
    description: ''
  }

  private form: any = {
    name: '',
    url: '',
    current: 1, // 默认查询第1页数据
    size: 5, // 每页大小
    categoryId: null // 资源分类
  }

  private totalCount = 0
  private resourceCategories: any[] = []
  private isLoading = true

  private created () {
    this.loadResources()
    this.loadResourceCategories()
  }

  private async loadResources () {
    this.isLoading = true // 展示加载中状态
    const { data } = await getResourcePages(this.form)
    this.resources = data.data.records
    this.totalCount = data.data.total
    this.isLoading = false // 关闭加载中状态
  }

  private async loadResourceCategories () {
    const { data } = await getResourceCategories()
    this.resourceCategories = data.data
  }

  private onSubmit () {
    this.form.current = 1
    this.loadResources()
  }

  private handleEdit (item: any) {
    this.title = '编辑资源'
    this.modalBool = true
    const { id, name, categoryId, url, description } = item
    this.modalData = { id, name, categoryId, url, description }
  }

  private handleDelete (item: any) {
    this.$confirm('是否删除该资源', '删除提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        deleteResource(item.id).then(() => {
          this.$message.success('删除成功')
          this.loadResources()
        })
      })
      .catch(() => {
        this.$message.info('取消删除')
      })
  }

  private handleSizeChange (val: any) {
    this.form.size = val
    this.form.current = 1
    this.loadResources()
  }

  private handleCurrentChange (val: any) {
    this.form.current = val
    this.loadResources()
  }

  private onReset () {
    (this.$refs.form as Form).resetFields()
    this.form.current = 1
    this.loadResources()
  }

  private onOK () {
    saveOrUpdate(this.modalData).then(res => {
      this.$message.success(
        `${this.title === '新增资源' ? '新增' : '编辑'}成功`
      )
      this.modalBool = false
      this.loadResources()
    })
  }

  private onCancel () {
    this.modalBool = false
  }

  // 添加
  private add () {
    this.title = '新增资源'
    this.modalBool = true
    Object.keys(this.modalData).forEach(k => {
      this.modalData[k] = ''
    })
  }
}
</script>

<style scoped></style>
